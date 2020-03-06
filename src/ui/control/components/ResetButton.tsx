import Button from '@material-ui/core/Button'
import * as React from 'react'
import { useStore } from '../../util/useContextHook'
import { resetState } from '../../../state/state'

/**
 * Reset simulation and display parameters
 */
export let ResetButton = () => {
   let store = useStore()

   let handleClick = () => {
      resetState(store)
   }

   return (
      <div>
         <Button
            style={{ fontSize: '18px' }}
            variant="outlined"
            onClick={handleClick}
         >
            ⟳
         </Button>
      </div>
   )
}
