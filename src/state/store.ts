import { Size } from '../util/RectType'

import { createPosition, OxPosition } from '../display/position'
import { ThemeString } from '../www/theme'

/**
 * @param postS Spatial position
 * @param postT Temporal position
 */
export interface Store {
   theme: ThemeString
   displayTheme: ThemeString | 'unset'

   rule: number
   size: number

   speed: number
   posS: OxPosition
   posT: OxPosition
   play: boolean
   zoom: number

   canvasSize: Size
}

export let createStore = (): Store => {
   return {
      // MCompute + ui
      rule: 73,
      size: 333, // Good for 1366-pixel-width displays

      // MDisplay + ui
      theme: 'darkLyra',
      displayTheme: 'unset',

      speed: 2,
      posS: createPosition(30),
      posT: createPosition(30),
      play: false,
      zoom: 4,

      // MDisplay
      canvasSize: { x: 0, y: 200 }, // (0, 16387)
   }
}
