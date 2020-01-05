import { observable } from 'mobx'

export interface OxPosition {
   microFactor: number
   wholePos: number
   microPos: number
}

export let createPosition = (microFactor: number): OxPosition => {
   let me = observable({
      microFactor,
      _microPos: 0,
      wholePos: 0,
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
      get microPos() {
         return me._microPos
      },
   })
   return me
}
