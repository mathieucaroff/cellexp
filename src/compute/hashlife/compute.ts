import { AirCell, GroundCell } from './cellType'
import { Automaton } from './automatonType'

let createAutomaton = <TCell>(child: Automaton<TCell>): Automaton<AirCell> => {
   let id = 0

   let getId = () => {
      return id++
   }

   let fuse = (a: TCell, b: TCell) => {
      let result = a.__table[b.id]
      if (result === undefined) {
         result = createCell(a, b)
         a.__table[b.id] = result
      }
      return result
   }

   let createCell = (aa: AirCell, bb: AirCell): AirCell => {
      let id = getId()

      let result = memoized(() => {
         let ab = fuse(aa.right, bb.left)

         let u = aa.result()
         let v = ab.result()
         let w = bb.result()

         let x = fuse(u, v).result()
         let y = fuse(v, w).result()

         return fuse(x, y)
      })

      return {
         type: 'air',
         id,
         left: aa,
         right: bb,
         result,
         __table: [],
      }
   }

   return {
      createCell,
   }
}
