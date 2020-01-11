import { Store } from '../state/store'
import { Hub } from '../state/hub'

import { Rect } from '../util/RectType'
import { autox } from '../util/autox'

export let createComputer = (store: Store, hub: Hub) => {
   let cache: Record<number, Uint8Array> = {}
   let currentTime
   let data = { cache }
   let rule: number

   let initialize = () => {
      currentTime = 0
      cache = data.cache = {}
      // ;({ rule } = store)
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
      let newLine = new Uint8Array(line.length)
      line.map((_b, k) => {
         return (newLine[k] = computeRule(line[k - 1], line[k], line[k + 1]))
      })
      return newLine
   }

   return {
      request(area: Rect) {
         let targetTime = area.pos.y + area.size.y
         while (currentTime < targetTime) {
            cache[currentTime] = computeLine(cache[currentTime - 1])
            currentTime++
         }
      },
      data,
   }
}

export type Computer = ReturnType<typeof createComputer>
