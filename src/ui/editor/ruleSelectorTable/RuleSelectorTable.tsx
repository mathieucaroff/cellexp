import * as React from 'react'
import { RuleTable } from './RuleTable'
import { TraitSelector } from './TraitSelector'

export let RuleSelectorTable = () => {
   return (
      <div>
         <RuleTable />
         <TraitSelector />
      </div>
   )
}
