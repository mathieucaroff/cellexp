import { Size } from '../util/RectType'

import { createPosition, OxPosition } from '../display/position'
import { ThemeString } from '../display/theme'

/**
 * @param postS Spatial position
 * @param postT Temporal position
 */
export interface Store {
   rule: number
   size: number

   speed: number
   theme: ThemeString
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
      speed: 2,
      theme: 'blackCyan',
      posS: createPosition(30),
      posT: createPosition(30),
      play: false,
      zoom: 4,

      // MDisplay
      canvasSize: { x: 0, y: 200 }, // (0, 16387)
   }
}
