import { readFileSync as read } from 'fs'

import { default as nearley } from 'nearley'
import { default as neCompile } from 'nearley/lib/compile'
import { default as neGenerate } from 'nearley/lib/generate'
import { default as nearleyGrammar } from 'nearley/lib/nearley-language-bootstrapped'

let compileGrammar = (sourceCode, dirname = '.') => {
   // Move to directory of the source file, for @include-s to work
   process.chdir(dirname)

   // Parse the grammar source into an AST
   let grammarParser = new nearley.Parser(nearleyGrammar)
   grammarParser.feed(sourceCode)
   let grammarAst = grammarParser.results[0] // TODO check for errors

   // Compile the AST into a set of rules
   let grammarInfoObject = neCompile(grammarAst, { args: [] })
   // Generate JavaScript code from the rules
   let grammarJs = neGenerate(grammarInfoObject, 'grammar')

   // Pretend this is a CommonJS environment to catch exports from the grammar.
   let module: any = { exports: {} }
   try {
      eval(grammarJs)
   } catch (e) {
      console.error('eval failed')
      throw e
   }

   let compiled = module.exports

   return nearley.Grammar.fromCompiled(compiled)
}

let compile = (source: string) => {
   return compileGrammar(source, __dirname)
}

let sideBorderSource = read(__dirname + '/sideBorderDsl.ne', 'utf-8')
let topBorderSource = read(__dirname + '/topBorderDsl.ne', 'utf-8')
let patternSource = read(__dirname + '/patternDsl.ne', 'utf-8')

let sideBorderGrammar, topBorderGrammar, patternGrammar

export let createSideBorderParser = () => {
   if (!sideBorderGrammar) {
      sideBorderGrammar = compile(sideBorderSource)
   }
   return new nearley.Parser(sideBorderGrammar)
}

export let createTopBorderParser = () => {
   if (!topBorderGrammar) {
      topBorderGrammar = compile(topBorderSource)
   }
   return new nearley.Parser(topBorderGrammar)
}

export let createPatternParser = () => {
   if (!patternGrammar) {
      patternGrammar = compile(patternSource)
   }
   return new nearley.Parser(patternGrammar)
}
