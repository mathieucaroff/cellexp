import { Pair } from '../util/RectType'
import { TopologyFinite } from './topology'
import { Rule } from './Rule'

export interface ComputerOpenProp {
   rule: Rule
   seed: string
   topology: TopologyFinite
}

export interface OpenComputer {
   get(pos: Pair): 0 | 1
}

export interface Computer {
   open: (prop: ComputerOpenProp) => OpenComputer
}
