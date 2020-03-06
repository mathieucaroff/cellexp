import { AirCell, GroundCell, Atom, Cell } from './cellType'

export interface HashlifeBaseAutomaton<TIC, TRC, TLV> {
   fuse: (aa: TIC, bb: TIC) => TRC
   level: TLV
   size: number
}

export interface AirAutomaton
   extends HashlifeBaseAutomaton<Cell, AirCell, number> {}

export interface GroundAutomaton
   extends HashlifeBaseAutomaton<Atom, GroundCell, 0> {}

export type Automaton = AirAutomaton | GroundAutomaton

export interface ArbitraryAutomaton {
   stateCount: number
   neigboorhoodSize: number
   localRule: (arr: number[]) => number
}
