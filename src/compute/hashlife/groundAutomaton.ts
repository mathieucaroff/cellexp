import { GroundCell, Atom } from './cellType'
import { GroundAutomaton, ArbitraryAutomaton } from './automatonType'

export let createGroundAutomaton = (
   base: ArbitraryAutomaton,
): GroundAutomaton => {
   let table: Record<string, GroundCell> = {}
   let id = 0

   let atomSize = base.neigboorhoodSize - 1

   let newId = () => {
      id++
      return id - 1
   }

   let hash = (aa: Atom, bb: Atom) => '' + aa + ':' + bb

   let fuse = (aa: Atom, bb: Atom): GroundCell => {
      let abHash = hash(aa, bb)
      let fusion: GroundCell = table[abHash]

      if (fusion === undefined) {
         fusion = createCell(aa, bb)
         table[abHash] = fusion
      }

      return fusion
   }

   let createCell = (aa: Atom, bb: Atom): GroundCell => {
      let id = newId()

      let result = memoized(() => {
         let input = [...aa, ...bb]

         let length = input.length - atomSize
         console.assert(
            length > 0,
            'bad input atom size vs base neigboorhood size',
         )

         let atomResult: Atom = Array.from({ length }, (_, k) => {
            return base.localRule(input.slice(k, k + base.neigboorhoodSize))
         })

         return atomResult
      })

      return {
         type: 'ground',
         id,
         left: aa,
         right: bb,
         result,
         level: 0,
         __table: [],
      }
   }

   return {
      fuse,
      level: 0,
      size: atomSize,
   }
}
