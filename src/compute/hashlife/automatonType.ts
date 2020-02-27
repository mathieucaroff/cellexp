import { AirCell, GroundCell } from './cellType'

export interface Automaton<TCell> {
   createCell: (aa: TCell, bb: TCell) => TCell
}

// import { ArbitraryAutomaton } from './hashlifeType'

// export interface SimpleAutomaton {
//    /**
//     * Given two ids of cells from the simple automaton, produce the id
//     * of the children
//     */
//    // rule: (lr: [string, string]) => string
//    // open: (id: string) => [string, string]
// }

// export interface GroundAutomaton extends SimpleAutomaton {}

// export interface AirAutomaton extends SimpleAutomaton {}

// export type Automaton = AirAutomaton | GroundAutomaton

// export let arbitrary2ground = (aa: ArbitraryAutomaton): GroundAutomaton => {
//    let table: Record<string, string> = {}

//    let bruteForce = (left: string, right: string): string => {
//       let [p, q] = left.split(':')
//       let [r, s] = right.split(':')
//       let x = aa.localRule([+p, +q, +r])
//       let y = aa.localRule([+q, +r, +s])
//       return `${x}:${y}`
//    }

//    return {
//       rule: ([left, right]) => {
//          let hash = `${left}:${right}`
//          if (!(hash in table)) {
//             table[hash] = bruteForce(left, right)
//          }
//          return table[hash]
//       },
//       open: () => {},
//    }
// }

// export let accelerate = (sa: SimpleAutomaton): AirAutomaton => {
//    let table: Record<string, string> = {}

//    let compute = (left: string, right: string): string => {
//       let [p, q] = sa.open(left)
//       let [r, s] = sa.open(right)

//       let uvwParam: [string, string][] = [
//          [p, q],
//          [q, r],
//          [r, s],
//       ]
//       let [u, v, w] = uvwParam.map(sa.rule)

//       let xyParam: [string, string][] = [
//          [u, v],
//          [v, w],
//       ]
//       let [x, y] = xyParam.map(sa.rule)

//       return sa.fuse([x, y])
//    }

//    return {
//       rule: ([left, right]: [string, string]) => {
//          let hash = `${left}:${right}`
//          if (!(hash in table)) {
//             table[hash] = compute(left, right)
//          }
//       },
//    }
// }
