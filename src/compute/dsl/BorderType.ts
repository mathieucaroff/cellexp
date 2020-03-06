// ## Exposed

export interface SideBorder {
   init: BorderRootGroup
   cycle: BorderRootGroup
}

export interface TopBorder {
   center: BorderRootGroup
   cycleLeft: BorderRootGroup
   cycleRight: BorderRootGroup
}

// ## Internal

export interface BorderQuantified {
   quantity: number
   width: number
}

export interface BorderGroup extends BorderQuantified {
   type: 'group'
   content: BorderElement[]
}

export interface BorderRootGroup extends BorderGroup {
   quantity: 1
}

export interface BorderState extends BorderQuantified {
   type: 'state'
   cumulativeMap: number[]
   total: number
}

export type BorderElement = BorderState | BorderGroup
