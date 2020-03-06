import { observable } from 'mobx'
import { State } from '../state/state'

interface Info_ {
   minSpeed: number
   maxSpeed: number
   passingMinSpeed: boolean
   passingMaxSpeed: boolean

   horizontalPage: number
   horizontalMove: number
   maxLeft: number
   maxRight: number
   center: number
   pockingLeft: boolean
   pockingRight: boolean

   atLeftBorder: boolean
   atRightBorder: boolean
   atCenter: boolean
   passingLeftBorder: boolean
   passingRightBorder: boolean

   verticalPage: number
   verticalMove: number
   top: number

   atTop: boolean
   passingTop: boolean
}

export type Info = Readonly<Info_>

export let getInfo = (store: State): Info => {
   let { posS, posT } = store

   let _info = {
      /*****************/
      /* Autoscrolling */
      /*****************/
      /** Speed */
      get minSpeed() {
         return 1
      },
      get maxSpeed() {
         return 256
      },
      get passingMinSpeed() {
         return store.speed <= info.minSpeed
      },
      get passingMaxSpeed() {
         return store.speed >= info.maxSpeed
      },

      /***********/
      /* Panning */
      /***********/
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
         let pixel6 = store.topology.width * store.zoom
         let difference = pixel6 - store.canvasSize.x * 6
         let right = Math.floor((difference * posS.microFactor) / store.zoom)
         return right
      },
      get center() {
         return Math.floor((info.maxLeft + info.maxRight) / 2)
      },
      /** Position tests */
      get pockingLeft() {
         return posS.totalPos < info.maxLeft
      },
      get pockingRight() {
         return posS.totalPos > info.maxRight
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
      get atTop() {
         return posT.totalPos === info.top
      },
      get passingTop() {
         return posT.totalPos <= info.top
      },
   }

   let info = observable(_info)

   return info
}
