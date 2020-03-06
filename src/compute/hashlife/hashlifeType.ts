import { Topology } from '../topology'
import { RandomMapper } from './randomMapper'
import { Boiler, BoiledContent } from './boilerType'
import { CenteredArea } from './centeredArea'
import { Pair } from '../../util/RectType'

export interface Hashlife {
   request: (prop: HashlifeProp) => void
}

export interface HashlifeProp {
   /**
    * Produce boiled content from content.
    * Can be used to do pattern recognition.
    */
   boiler: Boiler
   /**
    * Write boiled content to an imageData object.
    */
   draw: DrawFunction
   /**
    * Accept an imageData and the location of its center,
    * and put it at the right place in the canvas.
    * (`putImageData`)
    */
   output: OutputFunction
   /**
    * Provide three deterministic seeded random function for top, left and
    * right borders
    */
   random: RandomMapper
   /**
    * The rule to use to brute-force the ground cells
    */
   rule: RuleFunction
   /**
    * Finitness and size of the universe
    */
   topology: Topology
   /**
    * The area that must be covered by the data sent to the output function
    */
   area: CenteredArea
}

export type DrawFunction = (input: BoiledContent) => ImageData

export type OutputFunction = (image: ImageData, center: Pair) => void

export type NeighborhoodFunction = (relativePos: number) => number

export type RuleFunction = (f: NeighborhoodFunction) => number

// About changes
//
// rule() -> invalidate everything
// random, topology -> invalidate the main cell
//   (note: it's possible to do better)
//   (but it's probably not necessary)
// boiler.boil -> invalidate the boiledContent and image
// draw -> invalidate image
// output -> nothing invalidated
// policy.imageLevel -> invalidate nothing
