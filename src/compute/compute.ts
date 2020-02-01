import { deepEqual } from '../util/deepEqual'
import { Pair } from '../util/RectType'
import { Computer, ComputerOpenProp } from './ComputerType'
import { randrange } from './randrange'
import { BorderPattern, StochasticState } from './topology'
import { timed, timedExpr } from '../util/timeMeasure'
import { warnOnce } from '../util/warnOnce'

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

      if (topology.finitness === 'infinite') {
         throw new Error('infinte topologies are unimplemented for now')
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

      let otherSideX = width - 1
      let getLeftest = getLeftestOrRightest('left', 'borderLeft', otherSideX, 0)
      let getRightest = getLeftestOrRightest('right', 'borderRight', 0, 1)

      let get = timed('getCell', (pos: Pair): 0 | 1 => {
         if (ruleCache[pos.y] === undefined) {
            ruleCache[pos.y] = new Uint8Array(width)
         }
         if (pos.x < 0 || pos.x > width - 1) {
            warnOnce('getCell() out of topology area', pos)
            return 0
         }
         if (ruleCache[pos.y][pos.x] === 0) {
            timedExpr('ruleSolve', () => {
               if (pos.y <= 0) {
                  let seedInt = pos.x
                  let res = randrange(seedString, seedInt, 2) as 0 | 1
                  ruleCache[pos.y][pos.x] = res
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
