import { literalArray } from '../ui/util/literalArray'

export let ruleTraitList = literalArray(
   'author-favorite',
   'class1',
   'class2',
   'class3',
   'class4',
   'famous',
   'primitive',
   'self-conjugate',
   'self-left-right',
   'self-left-right-conjugate',
   'turing-complete',
   'triangle',
   'twinkling',
   'xor',
)

export type RuleTrait = typeof ruleTraitList[number]
