import { createPosition, OxPosition } from '../display/position'
import { Size } from '../util/RectType'
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
      size: 1320,

      // MDisplay + ui
      theme: 'darkLyra',
      displayTheme: 'unset',

      speed: 4,
      posS: createPosition(30),
      posT: createPosition(30),
      play: false,
      zoom: 24,

      // MDisplay
      canvasSize: { x: 1320, y: 440 }, // x: 1320 - good for 1366-pixel-width displays
   }
}
