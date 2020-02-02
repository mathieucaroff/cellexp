export type State = number

export type Side = 'left' | 'right'

export interface StochasticState {
   cumulativeMap: number[]
   total: number
}

export interface BorderPattern {
   init: StochasticState[]
   cycle: StochasticState[]
}

export interface __TopologyFiniteBase {
   finitness: 'finite'
   width: number
}

export interface TopologyFiniteBorder {
   finitness: 'finite'
   kind: 'border'
   width: number
   borderLeft: BorderPattern
   borderRight: BorderPattern
}

export interface TopologyFiniteLoop {
   finitness: 'finite'
   kind: 'loop'
   width: number
}

export interface TopologyFinitePorous {
   finitness: 'finite'
   kind: 'porous'
   width: number
   porousness: Side
   borderOther: BorderPattern
}

export type TopologyFinite =
   | TopologyFiniteBorder
   | TopologyFiniteLoop
   | TopologyFinitePorous

export interface TopologyInfiniteBoth {
   finitness: 'infinite'
   kind: 'both'
}

export interface TopologyInfiniteSemi {
   finitness: 'infinite'
   kind: 'semi'
   infinite: Side
   borderOther: BorderPattern
}

export type TopologyInfinite = TopologyInfiniteBoth | TopologyInfiniteSemi

export type Topology = TopologyFinite | TopologyInfinite
