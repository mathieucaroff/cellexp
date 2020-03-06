import { HashlifeProp, Hashlife } from './hashlifeType'

export let createHashlife = (): Hashlife => {
   return {
      request: (prop: HashlifeProp) => {
         let { area } = prop
      },
   }
}

let howToImplement = `
rule() -> automaton(level)
area -> mainLevel
boiler.{marginLeft, marginRight, marginTop} &[CONST_POLICY] -> policy
groundAutomaton, random, topology -> allInitialCells
`
