import { observable } from 'mobx'
import { mod } from '../util/mod'

export interface OxPosition {
   microFactor: number
   wholePos: number
   microPos: number
   totalPos: number
   toPix: (zoom: number) => number
   fromPix: (pix: number, zoom: number) => void
}

export let createPosition = (microFactor: number): OxPosition => {
   let me = observable({
      microFactor,
      _microPos: 0,
      wholePos: 0,
      get microPos() {
         return me._microPos
      },

      get totalPos() {
         return me.microFactor * me.wholePos + me.microPos
      },

      set microPos(v: number) {
         me._microPos = v
         let wholePos = me.wholePos
         while (me._microPos < 0) {
            me._microPos += microFactor
            wholePos -= 1
         }
         while (me._microPos >= microFactor) {
            me._microPos -= microFactor
            wholePos += 1
         }
         me.wholePos = wholePos
      },

      set totalPos(v: number) {
         me._microPos = mod(v, me.microFactor)
         me.wholePos = Math.round((v - me._microPos) / me.microFactor)
      },
      toPix(zoom: number) {
         return Math.round((me.totalPos * zoom) / (me.microFactor * 6))
      },
      fromPix(pix: number, zoom: number) {
         me.totalPos = Math.round((pix * me.microFactor * 6) / zoom)
      },
   })
   return me
}
