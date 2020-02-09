import { deepEqual } from '../util/deepEqual'
import { modGet } from '../util/mod'
import { Pair } from '../util/RectType'
import { timed, timedExpr } from '../util/timeMeasure'
import { warnOnce } from '../util/warnOnce'
import { Computer, ComputerOpenProp } from './ComputerType'
import { randrange } from './randrange'
import {
   SideBorderDescriptor,
   StochasticState,
   TopBorderDescriptor,
} from './topology'

export let createComputer = (): Computer => {
   let ruleCache: Uint8Array[] = []

   let lastProp: ComputerOpenProp

   let open = timed('!computer.open', (prop: ComputerOpenProp) => {
      if (!deepEqual(prop, lastProp)) {
         lastProp = prop
         ruleCache = []
         ;(window as any).ruleCache = ruleCache
      }

      let { rule, seed: seedString, topology } = prop
      let ruleNumber = rule.number
      if (
         rule.dimension !== 1 ||
         rule.stateCount !== 2 ||
         rule.neighborhoodSize !== 3
      ) {
         console.error(rule)
         throw new Error('only elementary rules are supported for now')
      }

      let { width } = topology

      let computeRule = (
         a: number = 0,
         b: number = 0,
         c: number = 0,
      ): 0 | 1 => {
         let k = (a << 2) | (b << 1) | c
         return ruleNumber & (1 << k) ? 1 : 0
      }

      let runStochastic = (stochastic: StochasticState, seedInt: number) => {
         if (stochastic.total === 1) {
            return stochastic.cumulativeMap[0] === 1 ? 0 : 1
         } else {
            let randomValue = randrange(seedString, seedInt, stochastic.total)
            return randomValue < stochastic.cumulativeMap[0] ? 0 : 1
         }
      }

      let getFromTopBorder = (
         seedInt: number,
         x: number,
         border: TopBorderDescriptor,
      ): 0 | 1 => {
         let { center, cycleLeft, cycleRight } = border

         let stochastic: StochasticState

         let cx = Math.floor(center.length / 2) + x
         if (0 <= cx && cx < center.length) {
            stochastic = border.center[cx]
         } else if (cx < 0) {
            let xx = -cx - 1
            stochastic = modGet(cycleLeft, xx)
         } else if (cx >= center.length) {
            let xx = cx - center.length
            stochastic = modGet(cycleRight, xx)
         } else throw {}

         return runStochastic(stochastic, seedInt)
      }

      let getFromBorder = (
         seedInt: number,
         y: number,
         border: SideBorderDescriptor,
      ): 0 | 1 => {
         let { init, cycle } = border

         let stochastic: StochasticState
         if (init.length > y) {
            stochastic = init[y]
         } else {
            stochastic = modGet(cycle, y - border.init.length)
         }

         return runStochastic(stochastic, seedInt)
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
            let border: SideBorderDescriptor
            if (topology.kind === 'border') {
               border = topology[blr]
            } else if (topology.kind === 'porous') {
               border = topology.borderOther
            } else {
               throw topology
            }
            let seedInt = 3 * y + seedBonus
            return getFromBorder(seedInt, y, border)
         }
      }

      let otherSideX = width - 1
      let getLeftest = getLeftestOrRightest('left', 'borderLeft', otherSideX, 1)
      let getRightest = getLeftestOrRightest('right', 'borderRight', 0, 2)

      let get = timed('get', (pos: Pair): 0 | 1 => {
         if (ruleCache[pos.y] === undefined) {
            ruleCache[pos.y] = new Uint8Array(width)
         }
         if (pos.x < 0 || pos.x >= width) {
            warnOnce('getCell() out of topology area', pos)
            return 0
         }
         if (ruleCache[pos.y][pos.x] === 0) {
            timedExpr('ruleSolve', () => {
               if (pos.y <= 0) {
                  let seedInt = pos.x * 3
                  let { genesis } = topology
                  let xx = pos.x - Math.floor(topology.width / 2)
                  let res = getFromTopBorder(seedInt, xx, genesis) as 0 | 1
                  ruleCache[pos.y][pos.x] = res + 1
               } else {
                  let y = pos.y - 1
                  let x = pos.x

                  let above = get({ y, x })
                  let aboveLeft, aboveRight: 0 | 1
                  if (x === 0) {
                     aboveLeft = getLeftest(y)
                  } else {
                     aboveLeft = get({ y, x: x - 1 })
                  }

                  if (x === width - 1) {
                     aboveRight = getRightest(y)
                  } else {
                     aboveRight = get({ y, x: x + 1 })
                  }

                  ruleCache[pos.y][pos.x] =
                     computeRule(aboveLeft, above, aboveRight) + 1
               }
            })
         }
         return (ruleCache[pos.y][pos.x] - 1) as 0 | 1
      })

      return { get }
   })

   return { open }
}
