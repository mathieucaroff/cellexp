import { action } from 'mobx'

export let getAct = (store, info) => {
   let { posS, posT } = store

   let isBigEnough = () => info.maxLeft < info.maxRight
   let fixLeft = () => {
      if (posS.totalPos < info.maxLeft && isBigEnough()) {
         act.gotoMaxLeft()
      }
   }
   let fixRight = () => {
      if (posS.totalPos > info.maxRight && isBigEnough()) {
         act.gotoMaxRight()
      }
   }
   let fixTop = () => {
      if (posT.totalPos < 0) {
         posT.totalPos = 0
      }
   }

   let act = {
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
      goOneDown: action(() => {
         posT.wholePos += 1
      }),
      goDown: action(() => {
         posT.totalPos += info.verticalMove
      }),
      pageDown: action(() => {
         posT.totalPos += info.verticalPage
      }),

      /** Goto */
      gotoTop: action(() => {
         posT.totalPos = info.top
      }),
   }
   return act
}
