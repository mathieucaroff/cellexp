import * as React from 'react'
import { RuleLink } from '../editor/components/RuleLink'
import { useStore } from '../util/useContextHook'
import { observer } from 'mobx-react-lite'

export let DisplayHeader = observer(() => {
   let store = useStore()

   return (
      <>
         <h2>
            Display <RuleLink rule={store.rule} />
         </h2>
      </>
   )
})
