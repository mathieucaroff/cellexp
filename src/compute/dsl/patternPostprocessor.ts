import { sum } from './partial/borderPostprocessor'
import {
   Pattern,
   PatternBase,
   PatternElement,
   PatternGroup,
   PatternRootGroup,
   PatternSet,
} from './PatternType'

export let zero = () => 0
export let one = () => 1

// ## Pattern
export let pattern = ([iFlag, iGroup]: [
   Pattern,
   PatternRootGroup,
]): Pattern => {
   return { ...iFlag, pattern: iGroup }
}

// ## Flag
export let flag = ([input]): Pattern => {
   let pattern = {} as PatternRootGroup
   if (input === '!') {
      return {
         type: 'exact',
         repetition: 'none',
         persistence: 'none',
         pattern,
      }
   } else if (input === '^') {
      return {
         type: 'triangle',
         repetition: 'none',
         persistence: 'persistent',
         pattern,
      }
   } else if (input === '=') {
      return {
         type: 'cyclic',
         repetition: 'cycle',
         persistence: 'none',
         pattern,
      }
   } else if (input === '#') {
      return {
         type: 'grid',
         repetition: 'cycle',
         persistence: 'persistent',
         pattern,
      }
   } else {
      throw new Error(`bad flag '${flag}'`)
   }
}

type Visi = PatternBase['visibility']

type FGroup = (v: Visi) => (pe: [[], PatternElement[]]) => PatternGroup

// ## Group
export let group: FGroup = (visibility) => (arg) => {
   let [_, elementList] = arg
   if (visibility !== 'visible') {
      elementList.forEach((elem) => {
         if (elem.type === 'set') {
            elem.visibility = visibility
         }
      })
   }

   return {
      type: 'group',
      content: elementList,
      quantity: 1,
      width: sum(elementList),
      visibility,
   }
}

// ## StateSet
export let patternSet = ([stateList]: [number[]]): PatternSet => {
   let uniq = (x, k, arr) => !arr.slice(0, k).includes(x)

   return {
      type: 'set',
      stateSet: stateList.sort().filter(uniq),
      quantity: 1,
      width: 1,
      visibility: 'visible',
   }
}
