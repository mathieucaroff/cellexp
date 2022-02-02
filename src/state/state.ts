import { Rule } from '../compute/Rule'
import { TopologyFinite } from '../compute/topology'
import { canvasSizeAdvice } from '../display/canvasSizeAdvice'
import { createPosition, OxPosition } from '../display/position'
import { deepUpdate } from '../util/deepUpdate'
import { Size } from '../util/RectType'
import { ThemeString } from '../www/theme'
import { RuleTrait } from '../data/ruleTraitType'
import { SimpleGenesis } from '../ui/control/components/SimpleGenesisiSelect'

/**
 * @param postS Spatial position
 * @param postT Temporal position
 */
export interface State {
   theme: ThemeString
   displayTheme: ThemeString | 'unset'
   morePanningControl: boolean

   rule: Rule

   ruleTrait: RuleTrait | 'all'

   speed: number
   posS: OxPosition
   posT: OxPosition
   play: boolean
   zoom: number
   selectedSimpleGenesis: SimpleGenesis
   topology: TopologyFinite
   seed: string

   canvasSize: Size
}

export let defaultState = (): State => {
   let random10 = {
      cumulativeMap: [9, 10],
      total: 10,
   }

   return {
      // MCompute + ui
      rule: {
         dimension: 1,
         stateCount: 2,
         neighborhoodSize: 3,
         number: 73,
      },

      ruleTrait: 'all',

      // MDisplay + ui
      theme: 'darkCream',
      displayTheme: 'unset',
      morePanningControl: false,

      speed: 4,
      posS: createPosition(30),
      posT: createPosition(30),
      play: false,
      zoom: 24,
      selectedSimpleGenesis: 'Random 10%',
      topology: {
         finitness: 'finite',
         kind: 'loop',
         width: 260,
         genesis: {
            kind: 'top',
            center: [],
            cycleLeft: [random10],
            cycleRight: [random10],
         },
      },
      seed: '_',

      // MDisplay
      canvasSize: canvasSizeAdvice(window),
   }
}

export let resetState = (state: State) => {
   let replacement = defaultState()
   delete replacement.posS
   delete replacement.posT
   deepUpdate(state, replacement)
   state.posT.wholePos = 0
}
