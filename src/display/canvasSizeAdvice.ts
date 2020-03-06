import { Pair } from '../util/RectType'

export interface WindowSizeLike {
   innerWidth: number
   innerHeight: number
}

/**
 * Return a pair {x, y} that may be used to set the size of the canvas
 * @param w window object
 */
export let canvasSizeAdvice = (w: WindowSizeLike): Pair => {
   // let mx = 1320
   // let my = 440
   // let x = Math.ceil(Math.min(mx, fx))
   // let y = Math.ceil(Math.min(my, x, fy))
   let fx = w.innerWidth * 0.99 - 50
   let fy = Math.max(w.innerHeight * 0.8 - 100, 60)
   let x = Math.ceil(fx)
   let y = Math.ceil(Math.min(x, fy))
   return { x, y }
}
