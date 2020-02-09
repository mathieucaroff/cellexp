import { createPatternParser } from '../src/compute/dsl/compileParser'
console.log('compileParser DONE')
import { testEngine, Case } from './lib/dslTestEngine'
console.log('TestEngine DONE')
import {
   Pattern,
   PatternSet,
   PatternRootGroup,
   PatternGroup,
} from '../src/compute/dsl/PatternType'
console.log('PatternType DONE')

let qwv1: { quantity: 1; width: 1; visibility: 'visible' } = {
   quantity: 1,
   width: 1,
   visibility: 'visible',
}
let zero: PatternSet = { type: 'set', stateSet: [0], ...qwv1 }
let one: PatternSet = { type: 'set', stateSet: [1], ...qwv1 }
let zo: PatternSet = { type: 'set', stateSet: [0, 1], ...qwv1 }

let stateSetList = [[0], [1], [0, 1]]

let set = (p: number, q = 1): PatternSet => {
   let quantity = q >= 0 ? q : -q
   return {
      type: 'set',
      stateSet: stateSetList[p],
      quantity,
      width: quantity,
      visibility: q >= 0 ? 'visible' : 'hidden',
   }
}

let pattern0: PatternRootGroup = { type: 'group', content: [zero], ...qwv1 }

let group = (q: number, ...content): PatternGroup => {
   let quantity = q >= 0 ? q : -q

   return {
      type: 'group',
      content,
      quantity,
      width: quantity * content.reduce((acc, val) => acc + val.width, 0),
      visibility: q >= 0 ? 'visible' : 'hidden',
   }
}

let patternList: Case<string, Pattern>[] = [
   {
      input: '!0',
      target: 'success',
      output: {
         type: 'exact',
         repetition: 'none',
         persistance: 'none',
         pattern: pattern0,
      },
   },
   {
      input: '^0',
      target: 'success',
      output: {
         type: 'triangle',
         repetition: 'none',
         persistance: 'persistant',
         pattern: pattern0,
      },
   },
   {
      input: '=0',
      target: 'success',
      output: {
         type: 'cyclic',
         repetition: 'cycle',
         persistance: 'none',
         pattern: pattern0,
      },
   },
   {
      input: '#0',
      target: 'success',
      output: {
         type: 'grid',
         repetition: 'cycle',
         persistance: 'persistant',
         pattern: pattern0,
      },
   },
   {
      input: '#1',
      target: 'success',
      output: {
         type: 'grid',
         repetition: 'cycle',
         persistance: 'persistant',
         pattern: { type: 'group', content: [one], ...qwv1 },
      },
   },
   {
      input: '#0(01[01](:?0)(:?[01]11{2})0{2}[01]{3}([1]1){4}([01][01]){5}){7}',
      target: 'success',
      output: {
         type: 'grid',
         repetition: 'cycle',
         persistance: 'persistant',
         pattern: {
            type: 'group',
            content: [
               zero,
               group(
                  7,
                  zero,
                  one,
                  zo,
                  group(-1, set(0, -1)),
                  group(-1, set(2, -1), set(1, -1), set(1, -2)),
                  set(0, 2),
                  set(2, 3),
                  group(4, one, one),
                  group(5, zo, zo),
               ),
            ],
            quantity: 1,
            width: 218, // unsure
            visibility: 'visible',
         },
      },
   },
   {
      input: '!0(0)',
      target: 'failure',
   },
]

let main = () => {
   testEngine(patternList, createPatternParser)
}

main()
