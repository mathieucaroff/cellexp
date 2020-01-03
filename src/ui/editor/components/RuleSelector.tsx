import * as React from 'react'

import { BasenumRuleSelector } from './BasenumRuleSelector'

export let RuleSelector = () => {
   return React.createElement(
      React.Fragment,
      {},
      [10, 2, 4, 16].map((base) => {
         return <BasenumRuleSelector base={base} key={base} />
      }),
   )
}
