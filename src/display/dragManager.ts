import { Pair } from '../util/RectType'

export interface DragManagerProp {
   element: HTMLElement
   getDisplayInit: () => Pair
}

export let createDragManager = (prop: DragManagerProp) => {
   let { element, getDisplayInit } = prop

   let html = element.ownerDocument!.documentElement

   let displayInit: Pair

   let init = {
      x: 0,
      y: 0,
   }

   let onMoveCallback: (xy: Pair, di: Pair) => void = () => {}

   let handleMove = (ev: MouseEvent) => {
      let x = init.x - ev.pageX
      let y = init.y - ev.pageY
      onMoveCallback({ x, y }, displayInit)
   }

   let handleDown = (ev: MouseEvent) => {
      let { x, y } = getDisplayInit()

      init = {
         x: x + ev.pageX,
         y: y + ev.pageY,
      }

      html.removeEventListener('mousemove', handleMove, true)
      html.addEventListener('mousemove', handleMove, true)
      html.addEventListener('mouseup', handleUp, true)
   }

   let handleUp = () => {
      html.removeEventListener('mousemove', handleMove, true)
      html.removeEventListener('mouseup', handleUp, true)
   }

   element.addEventListener('mousedown', handleDown, true)

   return {
      onMove: (f: (xy: Pair, di: Pair) => void) => {
         onMoveCallback = f
      },
      remove: () => {
         element.removeEventListener('mousedown', handleDown, true)
      },
   }
}
