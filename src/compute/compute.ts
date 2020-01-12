import { Hub } from '../state/hub'
import { Store } from '../state/store'
import { autox } from '../util/autox'
import { Pair } from '../util/RectType'

export interface Computer {
   getCell(pos: Pair): number
}

export let createComputer = (store: Store, hub: Hub) => {
   let cache: Record<number, Uint8Array> = {}
   let currentTime: number
   let rule: number

   let initialize = () => {
      currentTime = 0
      cache = {}
      rule = store.rule

      let firstLine = new Uint8Array(store.size).map(() =>
         Math.floor(2 * Math.random()),
      )

      cache[0] = firstLine
      currentTime++
   }

   hub.reroll.register(initialize)

   autox.computer_initialisation(initialize)

   let computeRule = (a: number = 0, b: number = 0, c: number = 0) => {
      let k = (a << 2) | (b << 1) | c
      return (rule & (1 << k)) >> k
   }

   let computeLine = (line: Uint8Array) => {
      return Uint8Array.from({ length: line.length }, (_b, k) => {
         return computeRule(line[k - 1], line[k], line[k + 1])
      })
   }

   let request = (targetTime: number) => {
      while (currentTime < targetTime) {
         cache[currentTime] = computeLine(cache[currentTime - 1])
         currentTime++
      }
   }

   return {
      getCell(pos: Pair) {
         pos.y >= currentTime && request(pos.y + 1)
         try {
            return cache[pos.y][pos.x]
         } catch (e) {
            console.error(e, e.stack, pos)
            throw e
         }
      },
   }
}
