import Button from '@material-ui/core/Button'
import * as React from 'react'
import { useStore } from '../../util/useContextHook'
import { resetState } from '../../../state/state'
import { Theme, makeStyles, createStyles } from '@material-ui/core'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      button: {
         fontSize: '18px',
      },
   }),
)

/**
 * Reset simulation and display parameters
 */
export let ResetSimulationButton = () => {
   let store = useStore()
   let c = useStyle()

   let handleClick = () => {
      resetState(store)
   }

   return (
      <div>
         <Button className={c.button} variant="outlined" onClick={handleClick}>
            ⟳
         </Button>
      </div>
   )
}
