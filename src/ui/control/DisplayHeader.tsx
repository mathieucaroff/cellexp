import * as React from 'react'
import { Rule } from '../editor/components/Rule'
import { useStore } from '../util/useStore'

export let DisplayHeader = () => {
   let store = useStore()

   return (
      <>
         <h2>
            Display <Rule rule={store.rule} />
         </h2>
      </>
   )
}
