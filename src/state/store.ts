import { createPosition, OxPosition } from '../display/position'
import { Size } from '../util/RectType'
import { ThemeString } from '../www/theme'
import { Rule } from '../compute/Rule'
import { Topology, TopologyFinite } from '../compute/topology'

/**
 * @param postS Spatial position
 * @param postT Temporal position
 */
export interface Store {
   theme: ThemeString
   displayTheme: ThemeString | 'unset'

   rule: Rule

   speed: number
   posS: OxPosition
   posT: OxPosition
   play: boolean
   zoom: number
   topology: TopologyFinite
   seed: string

   canvasSize: Size
}

export let createStore = (): Store => {
   let random7 = {
      cumulativeMap: [6, 7],
      total: 7,
   }

   return {
      // MCompute + ui
      rule: {
         dimension: 1,
         stateCount: 2,
         neighborhoodSize: 3,
         number: 73,
      },

      // MDisplay + ui
      theme: 'darkCream',
      displayTheme: 'unset',

      speed: 4,
      posS: createPosition(30),
      posT: createPosition(30),
      play: false,
      zoom: 30,
      topology: {
         finitness: 'finite',
         kind: 'loop',
         width: 1320,
         genesis: {
            kind: 'top',
            center: [],
            cycleLeft: [random7],
            cycleRight: [random7],
         },
      },
      seed: '_',

      // MDisplay
      canvasSize: defaultCanvasSize(), // x: 1320 - good for 1366-pixel-width displays
   }
}

let defaultCanvasSize = () => {
   let x = 1320
   let y = 440
   let mx = window.innerWidth * 0.99 - 50
   let my = window.innerHeight * 0.8
   x = Math.ceil(Math.min(x, mx))
   y = Math.ceil(Math.min(y, x, my))
   return { x, y }
}
