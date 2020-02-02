import { action, observable, toJS, observe } from 'mobx'

import { Computer } from '../compute/ComputerType'
import { Hub } from '../state/hub'
import { Store } from '../state/store'
import { autox } from '../util/autox'
import { emitterLoop } from '../util/emitterLoop'
import { createEventDispatcher } from '../util/eventDispatcher'
import { displayThemeFromCellexp, themeSet } from '../www/theme'
import { getAct } from './act'
import { createDragManager } from './dragManager'
import { getInfo } from './info'
import { keyboardBinding } from './keyboardBinding'
import { createKeyboardManager } from './keyboardManager'
import { createImageData } from './util/createImageData'
import { TopologyFinite } from '../compute/topology'

export let createDisplay = (store: Store, computer: Computer, hub: Hub) => {
   let { posS, posT } = store

   let topology = store.topology as TopologyFinite

   let local_ = {
      ctx: undefined as CanvasRenderingContext2D | undefined,
      get displayTheme() {
         let theme =
            store.displayTheme !== 'unset' ? store.displayTheme : store.theme
         return displayThemeFromCellexp(themeSet[theme])
      },
      get pixT() {
         let { microFactor, microPos } = posT
         return Math.floor((microPos * local.zoom) / microFactor)
      },
      get pixS() {
         let { microFactor, microPos } = posS
         return Math.floor((microPos * local.zoom) / microFactor)
      },
      get zoom() {
         return store.zoom / 6
      },
   }
   let local = observable(local_)

   let info = getInfo(store)

   let act = getAct(store, info)

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
         let { microPos } = posT
         let newMPos = microPos + (store.speed * 36) / store.zoom
         posT.microPos = newMPos
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

   // reinitialize panning position when rule or topology changes
   autox.center_top_new_rule(() => {
      store.rule.number
      store.topology.kind
      act.gotoCenter()
      act.gotoTop()
   })

   /**
    * initialize the display
    * @param prop.rootElement an HTMLElement inside which the canvas will be created
    * @param prop.keyboardElement another HTMLElement to hook for keyboard events
    */
   let initialize = (prop: {
      rootElement: HTMLElement
      keyboardElement: HTMLElement
   }) => {
      let { rootElement, keyboardElement } = prop
      let document = rootElement.ownerDocument!
      let canvas = document.createElement('canvas')

      let keyKeyboardManager = createKeyboardManager({
         element: keyboardElement,
         evPropName: 'key',
      })

      let codeKeyboardManager = createKeyboardManager({
         element: keyboardElement,
         evPropName: 'code',
      })

      keyboardBinding({
         display: me,
         keyKb: keyKeyboardManager,
         codeKb: codeKeyboardManager,
      })

      let isBigEnough = () => info.maxLeft <= info.maxRight
      let maxRight = () => {
         return Math.ceil(
            (store.zoom * topology.width) / 6 - store.canvasSize.x,
         )
      }

      let dragManager = createDragManager({
         element: canvas,
         getDisplayInit: () => {
            return {
               x: posS.toPix(store.zoom),
               y: posT.toPix(store.zoom),
            }
         },
      })

      dragManager.onMove(({ x, y }) => {
         if (x < 0 && isBigEnough()) {
            x = 0
         }
         if (x > maxRight() && isBigEnough()) {
            x = maxRight()
         }
         posS.fromPix(x, store.zoom)
         if (!store.play) {
            if (y < 0) {
               y = 0
            }
            posT.fromPix(y, store.zoom)
         }
      })

      autox.canvas_width_height(() => {
         canvas.width = store.canvasSize.x
         canvas.height = store.canvasSize.y
      })

      rootElement.appendChild(canvas)

      action(() => {
         local.ctx = canvas.getContext('2d')!
      })()

      me.initialize = () => {
         console.error(
            'display.initialized was called several times',
            new Error().stack,
         )
      }
   }

   // Render cellular automaton
   let renderCanvas = () => {
      let drawArea = {
         pos: {
            x: posS.wholePos,
            y: posT.wholePos,
         },
         size: {
            x: Math.ceil(store.canvasSize.x / local.zoom),
            y: Math.ceil(store.canvasSize.y / local.zoom),
         },
      }

      let marginX = 1
      let marginY = 1

      let pos = drawArea.pos
      let size = {
         x: drawArea.size.x + marginX,
         y: drawArea.size.y + marginY,
      }

      let { alive, dead } = local.displayTheme

      if (drawArea.size.x * drawArea.size.y === 0) return

      let openedComputer = computer.open({
         seed: store.seed,
         topology: toJS(topology),
         rule: toJS(store.rule),
      })

      let imageData = createImageData({
         size,
         callback: ({ data, y: yy, x: xx, p }) => {
            let y = pos.y + yy
            let x = pos.x + xx
            let state: 0 | 1
            state = openedComputer.get({ y, x })
            let color = state ? alive : dead
            ;[data[p], data[p + 1], data[p + 2]] = color
            data[p + 3] = 255
         },
      })

      let { pixS, pixT } = local
      let w = size.x * local.zoom
      let h = size.y * local.zoom
      createImageBitmap(imageData).then((bitmap) => {
         let { ctx } = local
         if (ctx === undefined) return
         ctx.imageSmoothingEnabled = false
         ctx.drawImage(bitmap, -pixS, -pixT, w, h)
      })
   }

   autox.display_rendering(renderCanvas)
   observe(topology, renderCanvas)

   let me = {
      info,
      act,
      initialize,
   }

   return me
}

export type Display = ReturnType<typeof createDisplay>
