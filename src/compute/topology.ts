import {
   TopBorderDescriptor,
   SideBorderDescriptor,
   BorderDescriptor,
} from './borderType'

export type Side = 'left' | 'right'

interface __TopologyBase {
   genesis: TopBorderDescriptor
}

interface __TopologyFiniteBase extends __TopologyBase {
   finitness: 'finite'
   width: number
}

export interface TopologyFiniteBorder extends __TopologyFiniteBase {
   kind: 'border'
   borderLeft: SideBorderDescriptor
   borderRight: SideBorderDescriptor
}

export interface TopologyFiniteLoop extends __TopologyFiniteBase {
   kind: 'loop'
}

export interface TopologyFinitePorous extends __TopologyFiniteBase {
   kind: 'porous'
   porousness: Side
   borderOther: SideBorderDescriptor
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
   borderOther: BorderDescriptor
}

export type TopologyInfinite = TopologyInfiniteBoth | TopologyInfiniteSemi

export type Topology = TopologyFinite | TopologyInfinite
