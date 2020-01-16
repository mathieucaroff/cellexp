import * as React from 'react'
import { Rule } from '../editor/components/Rule'
import { useStore } from '../util/useStore'
import { observer } from 'mobx-react-lite'

export let DisplayHeader = observer(() => {
   let store = useStore()

   return (
      <>
         <h2>
            Display <Rule rule={store.rule} />
         </h2>
      </>
   )
})
