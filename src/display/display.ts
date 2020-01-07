import { observable, autorun, action, reaction } from 'mobx'

import { Store } from '../state/store'
import { Hub } from '../state/hub'

import { Computer } from '../compute/compute'
import { emitterLoop } from '../util/emitterLoop'
import { createEventDispatcher } from '../util/eventDispatcher'

import { themeObj } from './theme'

export let createDisplay = (store: Store, computer: Computer, hub: Hub) => {
   let data = observable({
      ctx: undefined as CanvasRenderingContext2D | undefined,
      get pixT() {
         let { microFactor, microPos } = store.posT
         return Math.floor((microPos * store.zoom) / microFactor)
      },
   })

   let discardLoop: (() => void) | undefined
   let clockTick = createEventDispatcher()

   let me = {
      data,
      renderDisplay: (root: HTMLElement) => {
         let document = root.ownerDocument!
         let canvas = document.createElement('canvas')
         let h2 = document.createElement('h2')

         autorun(
            () => {
               canvas.width = store.canvasSize.x
               canvas.height = store.canvasSize.y
            },
            { name: 'display canvas.width&height' },
         )

         autorun(() => {
            h2.textContent = `Display (rule ${store.rule})`
         })

         h2.style.marginLeft = '10px'
         root.appendChild(h2)
         root.appendChild(canvas)

         action(() => {
            me.data.ctx = canvas.getContext('2d')!
         })()
      },
      start: () => {
         discardLoop?.()
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

   clockTick.register(
      action(() => {
         let { microPos } = store.posT
         let newMPos = microPos + 2 * store.speed
         store.posT.microPos = newMPos
      }),
   )

   // Update canvasSize.x
   autorun(
      () => {
         store.canvasSize.x = store.size * store.zoom
      },
      { name: 'display canvasSize.x' },
   )

   // Trigger clock start / stop
   autorun(() => {
      if (store.play) {
         me.start()
      } else {
         me.stop()
      }
   })

   // Render cellular automaton
   reaction(
      () => store.rule,
      () => {
         store.posT.wholePos = 0
         store.posT.microPos = 0
         store.posS.wholePos = 0
         store.posS.microPos = 0
      },
   )

   // Render cellular automaton
   let renderCanvas = () => {
      store.rule
      let { ctx } = me.data
      if (!ctx) return

      let drawArea = {
         pos: {
            x: store.posS.wholePos,
            y: store.posT.wholePos,
         },
         size: {
            x: Math.floor(store.canvasSize.x / store.zoom),
            y: Math.floor(store.canvasSize.y / store.zoom),
         },
      }

      let marginY = 2

      let requestArea = {
         pos: drawArea.pos,
         size: {
            x: drawArea.size.x,
            y: drawArea.size.y + marginY,
         },
      }

      computer.request(requestArea)

      let { cache } = computer.data

      let { alive, dead } = themeObj[store.theme]

      if (drawArea.size.x * drawArea.size.y === 0) return

      let imageData = new ImageData(requestArea.size.x, requestArea.size.y)
      let { data } = imageData

      let requestAreaSizeX = requestArea.size.x

      Array.from({ length: requestArea.size.y }, (_, k) => {
         let posY = requestArea.pos.y + k
         let dataK0 = k * requestAreaSizeX * 4
         cache[posY].forEach((v, m) => {
            let dataK = dataK0 + m * 4
            ;[data[dataK], data[dataK + 1], data[dataK + 2]] = v ? alive : dead
            data[dataK + 3] = 255
         })
      })

      let { pixT } = me.data
      let w = store.canvasSize.x
      let h = requestArea.size.y * store.zoom
      createImageBitmap(imageData).then((bitmap) => {
         ctx!.imageSmoothingEnabled = false
         ctx!.drawImage(bitmap, 0, -pixT, w, h)
      })
   }

   autorun(renderCanvas, { name: 'display rendering' })

   hub.reroll.register(renderCanvas)

   return me
}

export type Display = ReturnType<typeof createDisplay>
