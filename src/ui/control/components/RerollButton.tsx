import Button from '@material-ui/core/Button'
import * as React from 'react'
import { useHub } from '../../util/useHub'

export let RerollButton = () => {
   let hub = useHub()
   let handleClick = hub.reroll.dispatch
   return (
      <div>
         <Button variant="outlined" onClick={handleClick}>
            Reroll
         </Button>
      </div>
   )
}
