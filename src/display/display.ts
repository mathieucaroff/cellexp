import { observable, action, reaction } from 'mobx'

import { Store } from '../state/store'
import { Hub } from '../state/hub'

import { Computer } from '../compute/compute'
import { emitterLoop } from '../util/emitterLoop'
import { createEventDispatcher } from '../util/eventDispatcher'

import { autox } from '../util/autox'
import { createImageData } from './util/createImageData'
import { displayThemeFromCellexp, themeSet } from '../www/theme'

export let createDisplay = (store: Store, computer: Computer, hub: Hub) => {
   let data = observable({
      ctx: undefined as CanvasRenderingContext2D | undefined,
      get pixT() {
         let { microFactor, microPos } = store.posT
         return Math.floor((microPos * store.zoom) / microFactor)
      },
      get displayTheme() {
         let theme =
            store.displayTheme !== 'unset' ? store.displayTheme : store.theme
         return displayThemeFromCellexp(themeSet[theme])
      },
   })

   let discardLoop: (() => void) | undefined
   let clockTick = createEventDispatcher()

   let me = {
      data,
      renderDisplay: (root: HTMLElement) => {
         let document = root.ownerDocument!
         let canvas = document.createElement('canvas')

         autox.canvas_width_height(() => {
            canvas.width = store.canvasSize.x
            canvas.height = store.canvasSize.y
         })

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
   autox.display_canvasSizeX(() => {
      store.canvasSize.x = store.size * store.zoom
   })

   // Trigger clock start / stop
   autox.clock_start_stop(() => {
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

      let pos = drawArea.pos
      let size = {
         x: drawArea.size.x,
         y: drawArea.size.y + marginY,
      }

      let requestArea = {
         pos,
         size,
      }

      let { alive, dead } = data.displayTheme

      if (drawArea.size.x * drawArea.size.y === 0) return

      let imageData = createImageData({
         size,
         callback: ({ data, y: yy, x: xx, p }) => {
            let y = pos.y + yy
            let x = pos.x + xx
            let color = computer.getCell({ y, x }) ? alive : dead
            ;[data[p], data[p + 1], data[p + 2]] = color
            data[p + 3] = 255
         },
      })

      let { pixT } = me.data
      let w = store.canvasSize.x
      let h = requestArea.size.y * store.zoom
      createImageBitmap(imageData).then((bitmap) => {
         let { ctx } = me.data
         if (ctx === undefined) return
         ctx.imageSmoothingEnabled = false
         ctx.drawImage(bitmap, 0, -pixT, w, h)
      })
   }

   autox.display_rendering(renderCanvas)

   hub.reroll.register(renderCanvas)

   return me
}

export type Display = ReturnType<typeof createDisplay>
