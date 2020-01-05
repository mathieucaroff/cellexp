import { Store } from '../state/store'
import { Computer } from '../compute/compute'
import { observable, autorun, action } from 'mobx'
import { emitterLoop } from '../util/emitterLoop'
import { createEventDispatcher } from '../util/eventDispatcher'
import { themeObj } from './theme'

export let createDisplay = (store: Store, computer: Computer) => {
   let data = observable({
      ctx: undefined as CanvasRenderingContext2D | undefined,
      get pixT() {
         let { microFactor, microPos } = store.posT
         return Math.floor((microPos * store.zoom) / microFactor)
      },
   })

   let discardLoop: (() => void) | undefined
   let clockTick = createEventDispatcher()

   autorun(
      () => {
         store.canvasSize.x = store.size * store.zoom
      },
      { name: 'display canvasSize.x' },
   )

   clockTick.register(
      action(() => {
         store.posT.microPos += store.speed * 2
      }),
   )

   let me = {
      data,
      renderDisplay: (root: HTMLElement) => {
         let document = root.ownerDocument!
         let canvas = document.createElement('canvas')

         autorun(
            () => {
               canvas.width = store.canvasSize.x
               canvas.height = store.canvasSize.y
            },
            { name: 'display canvas.width&height' },
         )

         root.appendChild(canvas)

         action(() => {
            me.data.ctx = canvas.getContext('2d')!
         })()
      },
      start: () => {
         let ref = emitterLoop(requestAnimationFrame).link(me.tick)
         discardLoop = ref.discard
      },
      stop: () => {
         discardLoop?.()
         discardLoop = undefined
      },
      tick: () => {
         clockTick.dispatch()
      },
   }

   // Render cellular automaton
   autorun(
      () => {
         store.rule
         let { ctx } = me.data
         if (!ctx) return

         let area = {
            pos: {
               x: store.posS.wholePos,
               y: store.posT.wholePos,
            },
            size: {
               x: Math.floor(store.canvasSize.x / store.zoom),
               y: Math.floor(store.canvasSize.y / store.zoom),
            },
         }

         computer.request(area)

         let { cache } = computer.data

         let { alive, dead } = themeObj[store.theme]

         if (area.size.x * area.size.y === 0) return

         let imageData = new ImageData(area.size.x, area.size.y)
         let { data } = imageData

         let areaSizeX = area.size.x

         Array.from({ length: area.size.y }, (_, k) => {
            let posY = area.pos.y + k
            let dataK0 = k * areaSizeX * 4
            cache[posY].forEach((v, m) => {
               let dataK = dataK0 + m * 4
               ;[data[dataK], data[dataK + 1], data[dataK + 2]] = v
                  ? alive
                  : dead
               data[dataK + 3] = 255
            })
         })

         createImageBitmap(imageData).then((bitmap) => {
            let { x: w, y: h } = store.canvasSize
            ctx!.imageSmoothingEnabled = false
            ctx!.drawImage(bitmap, 0, 0, w, h)
         })
      },
      { name: 'display rendering' },
   )

   return me
}

export type Display = ReturnType<typeof createDisplay>
