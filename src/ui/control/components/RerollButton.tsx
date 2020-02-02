import Button from '@material-ui/core/Button'
import * as React from 'react'
import { useStore } from '../../util/useContextHook'

export let RerollButton = () => {
   let store = useStore()

   let handleClick = () => {
      store.seed = Math.random()
         .toString(36)
         .slice(2)
   }

   return (
      <div>
         <Button variant="outlined" onClick={handleClick}>
            Reroll
         </Button>
      </div>
   )
}
