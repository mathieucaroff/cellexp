// ## Exposed

export interface ExactPattern {
   type: 'exact'
   repetition: 'none'
   persistence: 'none'
   pattern: PatternRootGroup
}

export interface TrianglePattern {
   type: 'triangle'
   repetition: 'none'
   persistence: 'persistent'
   pattern: PatternRootGroup
}

export interface CyclicPattern {
   type: 'cyclic'
   repetition: 'cycle'
   persistence: 'none'
   pattern: PatternRootGroup
}

export interface GridPattern {
   type: 'grid'
   repetition: 'cycle'
   persistence: 'persistent'
   pattern: PatternRootGroup
}

export type Pattern =
   | ExactPattern
   | TrianglePattern
   | CyclicPattern
   | GridPattern

export interface FlatPattern {
   original: Pattern
   width: number
   flat: StateSet[]
}

export type StateSet = number[]

// ## Internal

export type PatternVisibility = 'visible' | 'hidden'

export interface PatternBase {
   quantity: number
   width: number
   visibility: PatternVisibility
}

export interface PatternGroup extends PatternBase {
   type: 'group'
   content: PatternElement[]
   capture: PatternVisibility
}

export interface PatternRootGroup extends PatternGroup {
   quantity: 1
}

export interface PatternSet extends PatternBase {
   type: 'set'
   stateSet: StateSet
}

export type PatternElement = PatternGroup | PatternSet
