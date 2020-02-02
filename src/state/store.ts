import { createPosition, OxPosition } from '../display/position'
import { Size } from '../util/RectType'
import { ThemeString } from '../www/theme'
import { Rule } from '../compute/Rule'

/**
 * @param postS Spatial position
 * @param postT Temporal position
 */
export interface Store {
   theme: ThemeString
   displayTheme: ThemeString | 'unset'

   rule: Rule
   size: number

   speed: number
   posS: OxPosition
   posT: OxPosition
   play: boolean
   zoom: number
   border: {
      left: { kind: 'loop' }
      right: { kind: 'loop' }
   }
   seed: string

   canvasSize: Size
}

export let createStore = (): Store => {
   return {
      // MCompute + ui
      rule: {
         dimension: 1,
         stateCount: 2,
         neighborhoodSize: 3,
         number: 73,
      },
      size: 1320,

      // MDisplay + ui
      theme: 'darkCream',
      displayTheme: 'unset',

      speed: 4,
      posS: createPosition(30),
      posT: createPosition(30),
      play: false,
      zoom: 6,
      border: {
         left: { kind: 'loop' },
         right: { kind: 'loop' },
      },
      seed: '',

      // MDisplay
      canvasSize: defaultCanvasSize(), // x: 1320 - good for 1366-pixel-width displays
   }
}

let defaultCanvasSize = () => {
   let x = 1320
   let y = 440
   let mx = window.innerWidth * 0.8
   let my = window.innerHeight * 0.8
   let m = Math.min(mx, my)
   x = Math.ceil(Math.min(x, m))
   y = Math.ceil(Math.min(y, x))
   return { x, y }
}
