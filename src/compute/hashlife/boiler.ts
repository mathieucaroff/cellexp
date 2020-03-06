import { BoilerFunction, Boiler, BoiledContent, Content } from './boilerType'
import { Pattern, PatternElement } from '../dsl/PatternType'

export let createBoiler = (patternList: Pattern[]): Boiler => {
   let marginLeftList: number[] = [0]
   let marginRightList: number[] = [0]
   let marginTopList: number[] = [0]

   patternList.forEach(({ pattern: root }) => {
      let { content, width } = root
      let mLeft = width - 1 - invisibleRight(content)
      let mRight = width - 1 - invisibleLeft(content)
      let mTop = (width - (width % 2)) / 2

      marginLeftList.push(mLeft)
      marginRightList.push(mRight)
      marginTopList.push(mTop)
   })

   let boil: BoilerFunction = (input: Content): BoiledContent => {
      return [[]]
   }

   return {
      marginLeft: Math.max(...marginLeftList),
      marginRight: Math.max(...marginRightList),
      marginTop: Math.max(...marginTopList),
      boil,
   }
}

let invisibleSide = (reordered: any) => (patternElemList: PatternElement[]) => {
   let margin = 0
   for (let pattern of reordered(patternElemList)) {
      if (pattern.visibility === 'hidden') {
         margin += pattern.width
      } else {
         if (pattern.type === 'group') {
            margin += invisibleSide(reordered)(pattern.content)
         }
         break
      }
   }
   return margin
}

let invisibleLeft = invisibleSide((li) => li)
let invisibleRight = invisibleSide((li) => [...li].reverse())

let pA = { visibility: 'hidden', type: 'set', width: 4 } as any
let pB = { visibility: 'visible', type: 'set', width: 3 } as any
let pC = { visibility: 'visible', type: 'group', content: [pA, pB] } as any
let pD = { visibility: 'visible', type: 'group', content: [pB, pA] } as any
let pE = { visibility: 'visible', type: 'group', content: [pA, pA, pB] } as any
let pF = { visibility: 'visible', type: 'group', content: [pB, pA, pA] } as any
let pG = { visibility: 'visible', type: 'group', content: [pB, pB, pA] } as any

console.assert(invisibleLeft([pA]) === 4)
console.assert(invisibleLeft([pB]) === 0)
console.assert(invisibleLeft([pC]) === 4)
console.assert(invisibleLeft([pD]) === 0)
console.assert(invisibleLeft([pE]) === 8)
console.assert(invisibleLeft([pF]) === 0)
console.assert(invisibleLeft([pG]) === 0)

console.assert(invisibleLeft([pA, pA]) === 8)
console.assert(invisibleLeft([pA, pB]) === 4)
console.assert(invisibleLeft([pB, pA]) === 0)
console.assert(invisibleLeft([pB, pB]) === 0)
