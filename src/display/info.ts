import { observable } from 'mobx'

export let getInfo = (store) => {
   let { posS, posT } = store

   let info = observable({
      /** ** Horizontal ** **/
      /** Sizes */
      get horizontalPage() {
         return Math.floor(
            posS.microFactor * (store.canvasSize.x / store.zoom) * 6,
         )
      },
      get horizontalMove() {
         return Math.floor(info.horizontalPage / 12)
      },

      /** Positions */
      get maxLeft() {
         return 0
      },
      get maxRight() {
         let right = Math.floor(
            ((store.size * store.zoom - store.canvasSize.x * 6) *
               posS.microFactor) /
               store.zoom,
         )
         return right
      },
      get center() {
         return Math.floor((info.maxLeft + info.maxRight) / 2)
      },

      /** Boolean indicators */
      get atLeftBorder() {
         return posS.totalPos === info.maxLeft
      },
      get atRightBorder() {
         return posS.totalPos === info.maxRight
      },
      get atCenter() {
         return posS.totalPos === info.center
      },
      get passingLeftBorder() {
         return posS.totalPos <= info.maxLeft
      },
      get passingRightBorder() {
         return posS.totalPos >= info.maxRight
      },

      /** ** Vertical ** **/
      /** Sizes */
      get verticalPage() {
         return Math.floor(
            posT.microFactor * (store.canvasSize.y / store.zoom) * 6,
         )
      },
      get verticalMove() {
         return Math.floor(info.verticalPage / 12)
      },

      /** Positions */
      get top() {
         return 0
      },

      /** Boolean indicators */
      get atTheTop() {
         return posT.totalPos === info.top
      },
      get passingTop() {
         return posT.totalPos <= info.top
      },
   })

   return info
}
