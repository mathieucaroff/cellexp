import { BorderPattern, StochasticState } from './topology'

/**
 * BDSL
 * Border DSL (Domain Specific Language)
 */
export let borderToBdsl = (border: BorderPattern) => {
   let bdsl = border.cycle.map((stochastic) => {
      let [zero, one] = stochastic.cumulativeMap
      one -= zero
      if (stochastic.total === 1) {
         return zero > 0 ? '0' : '1'
      } else {
         let zz = '0'.repeat(zero)
         let oo = '1'.repeat(one)
         return `[${zz}${oo}]`
      }
   })

   return bdsl.join('')
}

export interface BdslResultSuccess {
   success: true
   border: BorderPattern
}

export interface BdslResultFailure {
   success: false
   info: string
}

export type BdslResult = BdslResultSuccess | BdslResultFailure

export let bdslToBorder = (bdsl: string): BdslResult => {
   if (bdsl.length > 0 && !bdsl.match(/^[01]*(\[[01]+\][01]*)*$/)) {
      return {
         success: false,
         info: '[01]',
      }
   }

   let dead = {
      cumulativeMap: [1, 1],
      total: 1,
   }
   let alive = {
      cumulativeMap: [0, 1],
      total: 1,
   }

   let cycle: StochasticState[] = []

   let cumulativeMap: number[] = []

   let parserState: 'out' | 'in' = 'out'

   bdsl.split('').forEach((c, k) => {
      if (parserState === 'out') {
         if (c === ']') {
            return [false]
         } else if (c === '0') {
            cycle.push(dead)
         } else if (c === '1') {
            cycle.push(alive)
         } else if (c === '[') {
            cumulativeMap = [0, 0]
            parserState = 'in'
         }
      }
      if (parserState === 'in') {
         if (c === '[') {
            return [false]
         } else if (c === '0') {
            cumulativeMap[0]++
            cumulativeMap[1]++
         } else if (c === '1') {
            cumulativeMap[1]++
         } else if (c === ']') {
            let current: StochasticState = {
               cumulativeMap,
               total: cumulativeMap.slice(-1)[0],
            }
            if (current.total === 0) {
               return {
                  success: false,
                  info: '[]',
               }
            }
            cycle.push(current)
            parserState = 'out'
         }
      }
   })

   return {
      success: true,
      border: {
         init: [],
         cycle,
      },
   }
}
