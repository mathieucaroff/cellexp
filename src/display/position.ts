import { observable } from 'mobx'

export interface OxPosition {
   microFactor: number
   wholePos: number
   microPos: number
}

export let createPosition = (microFactor: number): OxPosition => {
   let microPos: number = 0
   let me = observable({
      microFactor,
      wholePos: 0,
      set microPos(v: number) {
         microPos = v
         let wholePos = me.wholePos
         while (microPos < 0) {
            microPos += microFactor
            wholePos -= 1
         }
         while (microPos >= microFactor) {
            microPos -= microFactor
            wholePos += 1
         }
         me.wholePos = wholePos
      },
      get microPos() {
         return microPos
      },
   })
   return me
}
