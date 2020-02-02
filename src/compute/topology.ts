export type State = number

export type Side = 'left' | 'right'

export interface StochasticState {
   cumulativeMap: number[]
   total: number
}

export type BasePattern = StochasticState[]

export interface SideBorderPattern {
   kind: 'side'
   init: BasePattern
   cycle: BasePattern
}

export interface TopBorderPattern {
   kind: 'top'
   center: BasePattern
   cycleLeft: BasePattern
   cycleRight: BasePattern
}

export type BorderPattern = SideBorderPattern | TopBorderPattern

interface __TopologyBase {
   genesis: TopBorderPattern
}

interface __TopologyFiniteBase extends __TopologyBase {
   finitness: 'finite'
   width: number
}

export interface TopologyFiniteBorder extends __TopologyFiniteBase {
   kind: 'border'
   borderLeft: SideBorderPattern
   borderRight: SideBorderPattern
}

export interface TopologyFiniteLoop extends __TopologyFiniteBase {
   kind: 'loop'
}

export interface TopologyFinitePorous extends __TopologyFiniteBase {
   kind: 'porous'
   porousness: Side
   borderOther: SideBorderPattern
}

export type TopologyFinite =
   | TopologyFiniteBorder
   | TopologyFiniteLoop
   | TopologyFinitePorous

export interface TopologyInfiniteBoth extends __TopologyBase {
   finitness: 'infinite'
   kind: 'both'
}

export interface TopologyInfiniteSemi extends __TopologyBase {
   finitness: 'infinite'
   kind: 'semi'
   infinite: Side
   borderOther: BorderPattern
}

export type TopologyInfinite = TopologyInfiniteBoth | TopologyInfiniteSemi

export type Topology = TopologyFinite | TopologyInfinite
