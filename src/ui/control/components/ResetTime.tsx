import Button from '@material-ui/core/Button'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useDisplay } from '../../util/useContextHook'
import { Tooltip } from '@material-ui/core'

export let ResetTime = observer(() => {
   let display = useDisplay()

   return (
      <div>
         <Tooltip title="Reset time to 0">
            <span>
               <Button
                  variant="outlined"
                  disabled={display.info.atTop}
                  onClick={display.act.gotoTop}
               >
                  Reset
               </Button>
            </span>
         </Tooltip>
      </div>
   )
})
