import * as React from 'react'

import { BasenumRuleField } from './BasenumRuleField'

export let RuleEditor = () => {
   return React.createElement(
      React.Fragment,
      {},
      [10, 2, 4, 16].map((base) => {
         return <BasenumRuleField base={base} key={base} />
      }),
   )
}
