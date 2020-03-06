import * as React from 'react'
import { RuleTable } from './RuleTable'
import { TraitSelector } from './TraitSelector'
import { ruleTraitList } from '../../../data/ruleTraitType'
import { createStyleSheet } from '../../util/createStyleSheet'

let sheet = createStyleSheet(document)
ruleTraitList.forEach((trait) => {
   sheet.insertRule(`
      #appRoot .tt-${trait} .tt-${trait} {
         color: white;
         border-color: white;
      }
   `)
})
sheet.insertRule(`
   #appRoot .tt-all .cell {
      color: white;
      border-color: white;
   }
`)

export let RuleSelectorTable = () => {
   return (
      <div>
         <RuleTable />
         <TraitSelector />
      </div>
   )
}
