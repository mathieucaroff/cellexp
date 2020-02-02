import { action } from 'mobx'
import { Store } from '../state/store'
import { Info } from './info'

export let getAct = (store: Store, info: Info) => {
   let { posS, posT } = store

   let isBigEnough = () => info.maxLeft <= info.maxRight
   let fixLeft = () => {
      if (info.pockingLeft && isBigEnough()) {
         act.gotoMaxLeft()
      }
   }
   let fixRight = () => {
      if (info.pockingRight && isBigEnough()) {
         act.gotoMaxRight()
      }
   }
   let fixPosition = () => {
      if (isBigEnough()) {
         fixLeft()
         fixRight()
      } else {
         act.gotoCenter()
      }
   }
   let fixTop = () => {
      if (posT.totalPos < 0) {
         posT.totalPos = 0
      }
   }

   let fixZoom = () => {
      if (store.zoom > 300) {
         store.zoom = 300
      } else if (store.zoom < 6) {
         store.zoom = 6
      } else if (store.zoom % 6 != 0) {
         store.zoom += 3
         store.zoom -= store.zoom % 6
      }
   }

   let act = {
      /****************/
      /* Play / Pause */
      /****************/
      togglePlay: action(() => {
         store.play = !store.play
      }),
      singleStep: action(() => {
         if (store.play) {
            store.play = false
            let r = store.posT.microFactor
            store.posT.microPos = r * Math.round(store.posT.microPos / r)
         } else {
            store.posT.wholePos += 1
         }
      }),

      /********************/
      /* Autoscroll speed */
      /********************/
      halfSpeed: action(() => {
         store.speed /= 2
         if (info.passingMinSpeed) {
            act.setToMinSpeed()
         }
      }),
      doubleSpeed: action(() => {
         store.speed *= 2
         if (info.passingMaxSpeed) {
            act.setToMaxSpeed()
         }
      }),
      decreaseSpeed: action(() => {
         store.speed -= Math.floor(Math.sqrt(store.speed))
         if (info.passingMinSpeed) {
            act.setToMinSpeed()
         }
      }),
      increaseSpeed: action(() => {
         store.speed += Math.ceil(Math.sqrt(store.speed))
         if (info.passingMaxSpeed) {
            act.setToMaxSpeed()
         }
      }),
      setToMaxSpeed: action(() => {
         store.speed = info.maxSpeed
      }),
      setToMinSpeed: action(() => {
         store.speed = info.minSpeed
      }),

      /********/
      /* Zoom */
      /********/

      increaseZoom: action(() => {
         store.zoom *= 2
         fixZoom()
         fixPosition()
      }),
      decreaseZoom: action(() => {
         store.zoom /= 2
         fixZoom()
         fixPosition()
      }),

      /***********/
      /* Panning */
      /***********/

      /** Relative move */
      pageLeft: action(() => {
         posS.totalPos -= info.horizontalPage
         fixLeft()
      }),
      goLeft: action(() => {
         posS.totalPos -= info.horizontalMove
         fixLeft()
      }),
      goRight: action(() => {
         posS.totalPos += info.horizontalMove
         fixRight()
      }),
      pageRight: action(() => {
         posS.totalPos += info.horizontalPage
         fixRight()
      }),

      /** Goto */
      gotoMaxLeft: action(() => {
         posS.totalPos = info.maxLeft
      }),
      gotoCenter: action(() => {
         posS.totalPos = info.center
      }),
      gotoMaxRight: action(() => {
         posS.totalPos = info.maxRight
      }),

      /** Relative move */
      pageUp: action(() => {
         posT.totalPos -= info.verticalPage
         fixTop()
      }),
      goUp: action(() => {
         posT.totalPos -= info.verticalMove
         fixTop()
      }),
      goDown: action(() => {
         posT.totalPos += info.verticalMove
      }),
      pageDown: action(() => {
         posT.totalPos += info.verticalPage
      }),

      /** Goto */
      gotoTop: action(() => {
         store.play = false
         posT.totalPos = info.top
      }),
   }
   return act
}
