import { deepEqual } from '../util/deepEqual'
import { Pair } from '../util/RectType'
import { Computer, ComputerOpenProp } from './ComputerType'
import { randrange } from './randrange'
import { BorderPattern, StochasticState } from './topology'

export let createComputer = (): Computer => {
   let ruleCache: Record<number, Record<number, 0 | 1>> = {}

   let lastProp: ComputerOpenProp

   let open = (prop: ComputerOpenProp) => {
      if (!deepEqual(prop, lastProp)) {
         lastProp = prop
         ruleCache = {}
      }

      let { rule, seed: seedString, topology } = prop
      let ruleNumber = rule.number
      if (rule.stateCount !== 2 || rule.neighborhoodSize !== 3) {
         throw new Error('only elementary rules are supported for now')
      }

      if (topology.finitness === 'infinite') {
         throw new Error('infinte topologies are unimplemented for now')
      }

      let computeRule = (
         a: number = 0,
         b: number = 0,
         c: number = 0,
      ): 0 | 1 => {
         let k = (a << 2) | (b << 1) | c
         return ruleNumber & (1 << k) ? 1 : 0
      }

      let getFromBorder = (
         seedInt: number,
         y: number,
         border: BorderPattern,
      ): 0 | 1 => {
         let stochastic: StochasticState
         if (border.init.length > y) {
            stochastic = border.init[y]
         } else {
            stochastic =
               border.cycle[(y - border.init.length) % border.cycle.length]
         }
         if (stochastic.total === 1) {
            return stochastic.cumulativeMap[0] === 1 ? 0 : 1
         } else {
            let randomValue = randrange(seedString, seedInt, stochastic.total)
            return randomValue < stochastic.cumulativeMap[0] ? 0 : 1
         }
      }

      let getLeftestOrRightest = (
         lr: 'left' | 'right',
         blr: 'borderLeft' | 'borderRight',
         otherSideX: number,
         seedBonus: number,
      ) => (y: number): 0 | 1 => {
         if (
            topology.kind === 'loop' ||
            (topology.kind === 'porous' && topology.porousness === lr)
         ) {
            return get({ y, x: otherSideX })
         } else {
            let border: BorderPattern
            if (topology.kind === 'border') {
               border = topology[blr]
            } else if (topology.kind === 'porous') {
               border = topology.borderOther
            } else {
               throw topology
            }
            let seedInt = 2 * y + seedBonus
            return getFromBorder(seedInt, y, border)
         }
      }

      let otherSideX = topology.width - 1
      let getLeftest = getLeftestOrRightest('left', 'borderLeft', otherSideX, 0)
      let getRightest = getLeftestOrRightest('right', 'borderRight', 0, 1)

      let get = (pos: Pair) => {
         // console.log('get', pos)
         if (ruleCache[pos.y] === undefined) {
            ruleCache[pos.y] = {}
         }
         if (ruleCache[pos.y][pos.x] === undefined) {
            if (pos.y <= 0) {
               let seedInt = pos.x
               let res = randrange(seedString, seedInt, 2) as 0 | 1
               ruleCache[pos.y][pos.x] = res
            } else {
               let y = pos.y - 1
               let x = pos.x

               let above = get({ y, x })
               let aboveLeft = get({ y, x: x - 1 })
               let aboveRight = get({ y, x: x + 1 })

               if (topology.finitness === 'infinite') {
                  throw new Error(
                     'infinte topologies are unimplemented for now',
                  )
               }

               if (y === 0) {
                  aboveLeft = getLeftest(y)
               }
               if (y === topology.width - 1) {
                  aboveRight = getRightest(y)
               }
               ruleCache[pos.y][pos.x] = computeRule(
                  aboveLeft,
                  above,
                  aboveRight,
               )
            }
         }
         return ruleCache[pos.y][pos.x]
      }

      return { get }
   }

   return { open }
}
