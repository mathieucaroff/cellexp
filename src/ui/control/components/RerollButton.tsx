import Button from '@material-ui/core/Button'
import * as React from 'react'
import { useStore } from '../../util/useContextHook'

export let RerollButton = () => {
   let store = useStore()

   let handleClick = () => {
      store.posT.totalPos = 0
      store.seed = Math.random()
         .toString(36)
         .slice(2)
         .toUpperCase()
   }

   return (
      <div>
         <Button
            style={{ fontSize: '18px' }}
            variant="outlined"
            onClick={handleClick}
         >
            🎲
         </Button>
      </div>
   )
}
