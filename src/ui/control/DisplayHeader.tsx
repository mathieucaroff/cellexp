import * as React from 'react'
import { useStore } from '../util/useContextHook'
import { observer } from 'mobx-react-lite'
import { RuleBox } from '../editor/components/RuleBox'

export let DisplayHeader = observer(() => {
   let store = useStore()

   return (
      <>
         <h2>
            Display <RuleBox />
         </h2>
      </>
   )
})
