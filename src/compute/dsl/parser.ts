import { default as nearley } from 'nearley'

// @ts-ignore
import sideBorderGrammar from './patternDsl.ne'
// @ts-ignore
import topBorderGrammar from './sideBorderDsl.ne'
// @ts-ignore
import patternGrammar from './topBorderDsl.ne'

export let createSideBorderParser = () => {
   return new nearley.Parser(sideBorderGrammar)
}

export let createTopBorderParser = () => {
   return new nearley.Parser(topBorderGrammar)
}

export let createPatternParser = () => {
   return new nearley.Parser(patternGrammar)
}
