import { Pair } from '../util/RectType'
import { Topology } from './topology'
import { Rule } from './Rule'

export interface ComputerOpenProp {
   rule: Rule
   seed: string
   topology: Topology
}

export interface OpenComputer {
   get(pos: Pair): 0 | 1
}

export interface Computer {
   open: (prop: ComputerOpenProp) => OpenComputer
}
