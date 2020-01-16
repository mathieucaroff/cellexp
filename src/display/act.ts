import { action } from 'mobx'

export let getAct = (store, info) => {
   let { posS, posT } = store

   let act = {
      /** Relative move */
      pageLeft: action(() => {
         posS.totalPos -= info.horizontalPage
      }),
      goLeft: action(() => {
         posS.totalPos -= info.horizontalMove
      }),
      goRight: action(() => {
         posS.totalPos += info.horizontalMove
      }),
      pageRight: action(() => {
         posS.totalPos += info.horizontalPage
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
      }),
      goUp: action(() => {
         posT.totalPos -= info.verticalMove
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
