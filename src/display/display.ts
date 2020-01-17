import { action, observable, reaction } from 'mobx'
import { Computer } from '../compute/compute'
import { Hub } from '../state/hub'
import { Store } from '../state/store'
import { autox } from '../util/autox'
import { emitterLoop } from '../util/emitterLoop'
import { createEventDispatcher } from '../util/eventDispatcher'
import { displayThemeFromCellexp, themeSet } from '../www/theme'
import { createImageData } from './util/createImageData'
import { getInfo } from './info'
import { getAct } from './act'
import { keyboardBinding } from './keyboardBinding'
import { createKeyboardManager } from './keyboardManager'

export let createDisplay = (store: Store, computer: Computer, hub: Hub) => {
   let local = observable({
      ctx: undefined as CanvasRenderingContext2D | undefined,
      get displayTheme() {
         let theme =
            store.displayTheme !== 'unset' ? store.displayTheme : store.theme
         return displayThemeFromCellexp(themeSet[theme])
      },
      get pixT() {
         let { microFactor, microPos } = store.posT
         return Math.floor((microPos * local.zoom) / microFactor)
      },
      get zoom() {
         return store.zoom / 6
      },
   })

   let discardLoop: (() => void) | undefined
   let clockTick = createEventDispatcher()

   let tick = () => {
      clockTick.dispatch()
   }

   let start = () => {
      discardLoop?.()
      let ref = emitterLoop(requestAnimationFrame).link(tick)
      discardLoop = ref.discard
   }

   let stop = () => {
      discardLoop?.()
      discardLoop = undefined
   }

   clockTick.register(
      action(() => {
         let { microPos } = store.posT
         let newMPos = microPos + store.speed
         store.posT.microPos = newMPos
      }),
   )

   // Trigger clock start / stop
   autox.clock_start_stop(() => {
      if (store.play) {
         start()
      } else {
         stop()
      }
   })

   // Render cellular automaton
   reaction(
      () => store.rule,
      () => {
         act.gotoCenter()
         act.gotoTop()
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
            x: Math.ceil(store.canvasSize.x / local.zoom),
            y: Math.ceil(store.canvasSize.y / local.zoom),
         },
      }

      let marginY = 2

      let pos = drawArea.pos
      let size = {
         x: drawArea.size.x,
         y: drawArea.size.y + marginY,
      }

      let { alive, dead } = local.displayTheme

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

      let { pixT } = local
      let w = size.x * local.zoom
      let h = size.y * local.zoom
      createImageBitmap(imageData).then((bitmap) => {
         let { ctx } = local
         if (ctx === undefined) return
         ctx.imageSmoothingEnabled = false
         ctx.drawImage(bitmap, 0, -pixT, w, h)
      })
   }

   autox.display_rendering(renderCanvas)

   hub.reroll.register(renderCanvas)

   let info = getInfo(store)

   let act = getAct(store, info)

   let renderDisplay = (prop: {
      rootElement: HTMLElement
      keyboardElement: HTMLElement
   }) => {
      let { rootElement, keyboardElement } = prop
      let document = rootElement.ownerDocument!
      let canvas = document.createElement('canvas')

      let keyboardManager = createKeyboardManager({
         element: keyboardElement,
         evPropName: 'key',
      })
      keyboardBinding(me, keyboardManager)

      autox.canvas_width_height(() => {
         canvas.width = store.canvasSize.x
         canvas.height = store.canvasSize.y
      })

      rootElement.appendChild(canvas)

      action(() => {
         local.ctx = canvas.getContext('2d')!
      })()
   }

   let me = {
      info,
      act,
      renderDisplay,
   }

   return me
}

export type Display = ReturnType<typeof createDisplay>
