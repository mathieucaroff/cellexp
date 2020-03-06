import { AirCell } from './cellType'
import { AirAutomaton } from './automatonType'

export let createAirAutomaton = (child: any): AirAutomaton => {
   let id = 0

   let newId = () => {
      return id++
   }

   let fuse = (aa: any, bb: any): AirCell => {
      let fusion: AirCell = aa.__table[bb.id]
      if (fusion === undefined) {
         fusion = createCell(aa, bb)
         aa.__table[bb.id] = fusion
      }
      return fusion
   }

   let createCell = (aa: any, bb: any): AirCell => {
      console.assert(aa.level == bb.level)

      let id = newId()

      let result = memoized(() => {
         let ab = child.fuse(aa.right, bb.left)

         let u = aa.result()
         let v = ab.result()
         let w = bb.result()

         let x = child.fuse(u, v).result()
         let y = child.fuse(v, w).result()

         return child.fuse(x, y)
      })

      return {
         type: 'air',
         id,
         left: aa,
         right: bb,
         result,
         level: aa.level + 1,
         __table: [],
      }
   }

   return {
      fuse,
      level: child.level + 1,
      size: 2 * child.size,
   }
}
