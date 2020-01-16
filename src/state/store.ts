import { createPosition, OxPosition } from '../display/position'
import { Size } from '../util/RectType'
import { ThemeString } from '../www/theme'

export type State = {
   proba1: number
}

export interface BorderPattern {
   kind: 'pattern'
   initial: State[]
   repeat: State[]
}

export interface BorderLoop {
   kind: 'loop'
}

export type Border = BorderLoop | BorderPattern

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
   border: {
      left: { kind: 'loop' }
      right: { kind: 'loop' }
   }

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
      border: {
         left: { kind: 'loop' },
         right: { kind: 'loop' },
      },

      // MDisplay
      canvasSize: { x: 1320, y: 440 }, // x: 1320 - good for 1366-pixel-width displays
   }
}
