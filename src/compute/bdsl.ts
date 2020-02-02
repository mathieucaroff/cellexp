import {
   BorderPattern,
   StochasticState,
   BasePattern,
   TopBorderPattern,
   SideBorderPattern,
} from './topology'

/**
 * BDSL
 * Border DSL (Domain Specific Language)
 */

/**
 * convert an isolated base pattern to a bdsl string
 * @param pattern the pattern of stochastic elements to convert to string
 */
export let patternToBdsl = (pattern: BasePattern): string => {
   let list = pattern.map((stochastic) => {
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

   return list.join('')
}

/**
 * convert a side border or top border to a bdsl string
 *
 * note the bdsl string does not contain any specific indication of
 * whether it's from a side or top border pattern
 *
 * @param border the border pattern to convert to bdsl
 */
export let borderToBdsl = (border: BorderPattern): string => {
   if (border.kind === 'side') {
      let init = patternToBdsl(border.init)
      let cycle = patternToBdsl(border.cycle)
      let bdsl = `${init}(${cycle})`
      return bdsl
   } else if (border.kind === 'top') {
      let init = patternToBdsl(border.center)
      let cycleLeft = patternToBdsl(border.cycleLeft)
      let cycleRight = patternToBdsl(border.cycleRight)
      let bdsl = `(${cycleLeft})${init}(${cycleRight})`
      return bdsl
   } else throw {}
}

export interface BdslResultSuccess<T> {
   success: true
   result: T
}

export interface BdslResultFailure {
   success: false
   info: string
}

export type BdslResult<T> = BdslResultSuccess<T> | BdslResultFailure

/**
 * parse a bdsl base pattern expression into a BasePattern
 * @param bdsl a bdsl string represting a base pattern
 */
export let bdslParsePattern = (bdsl: string): BdslResult<BasePattern> => {
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

   let pattern: StochasticState[] = []

   let cumulativeMap: number[] = []

   let parserState: 'out' | 'in' = 'out'

   bdsl.split('').forEach((c, k) => {
      if (parserState === 'out') {
         if (c === ']') {
            return [false]
         } else if (c === '0') {
            pattern.push(dead)
         } else if (c === '1') {
            pattern.push(alive)
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
            pattern.push(current)
            parserState = 'out'
         }
      }
   })

   return {
      success: true,
      result: pattern,
   }
}

export let bdslParseTopBorder = (
   bdsl: string,
): BdslResult<TopBorderPattern> => {
   let center, cycleLeft, cycleRight: BasePattern

   let m: RegExpMatchArray | null
   if ((m = bdsl.match(/^\(([^()]*)\)$/))) {
      let outcome = bdslParsePattern(m[1])
      if (outcome.success) {
         center = []
         cycleRight = outcome.result
         cycleLeft = [...outcome.result].reverse()
         if (cycleRight.length === 0) {
            return {
               success: false,
               info: `(): forbidden empty cycle`,
            }
         }
      } else {
         return {
            success: false,
            info: `(): ${outcome.info}`,
         }
      }
   } else if ((m = bdsl.match(/^\(([^()]*)\)([^()]*)\(([^()]*)\)$/))) {
      let [g0, gleft, gcenter, gright] = m
      let outcomeList = [gleft, gcenter, gright].map(bdslParsePattern)

      if (outcomeList.every(({ success }) => success)) {
         let resultList = outcomeList as BdslResultSuccess<BasePattern>[]
         cycleLeft = resultList[0].result
         center = resultList[1].result
         cycleRight = resultList[2].result
         let rr = cycleRight.length === 0
         let ll = cycleLeft.length === 0
         if (rr || ll) {
            let list: string[] = []
            if (ll) list.push('left')
            if (rr) list.push('right')
            let designation = list.join(' & ')
            return {
               success: false,
               info: `(): forbidden empty ${designation} cycle`,
            }
         }
      } else {
         let infoList = outcomeList as BdslResultFailure[]
         let list = infoList.map(({ info }) => info || '')
         return {
            success: false,
            info: `(${list[0]})${list[1]}(${list[2]})`,
         }
      }
   } else {
      return {
         success: false,
         info: `(): bad pattern`,
      }
   }

   let border: TopBorderPattern = {
      kind: 'top',
      center,
      cycleLeft,
      cycleRight,
   }

   return {
      success: true,
      result: border,
   }
}

export let bdslParseSideBorder = (
   bdsl: string,
): BdslResult<SideBorderPattern> => {
   let init, cycle: BasePattern

   let m: RegExpMatchArray | null
   if ((m = bdsl.match(/^([^()]*)\(([^()]*)\)$/))) {
      let [g0, ginit, gcycle] = m
      let outcomeList = [ginit, gcycle].map(bdslParsePattern)

      if (outcomeList.every(({ success }) => success)) {
         let resultList = outcomeList as BdslResultSuccess<BasePattern>[]
         init = resultList[0].result
         cycle = resultList[1].result
         if (cycle.length === 0) {
            return {
               success: false,
               info: `(): forbidden empty cycle`,
            }
         }
      } else {
         let infoList = outcomeList as BdslResultFailure[]
         let list = infoList.map(({ info }) => info || '')
         return {
            success: false,
            info: `(): ${list[0]}(${list[1]})`,
         }
      }
   } else {
      return {
         success: false,
         info: `(): bad pattern`,
      }
   }

   let border: SideBorderPattern = {
      kind: 'side',
      init,
      cycle,
   }

   return {
      success: true,
      result: border,
   }
}
