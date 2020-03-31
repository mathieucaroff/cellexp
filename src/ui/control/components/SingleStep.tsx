import Button from '@material-ui/core/Button'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useDisplay } from '../../util/useContextHook'
import { Tooltip } from '@material-ui/core'

export let SingleStep = observer(() => {
   let display = useDisplay()

   return (
      <div>
         <Tooltip title="Play a single step">
            <Button variant="outlined" onClick={display.act.singleStep}>
               Single Step
            </Button>
         </Tooltip>
      </div>
   )
})
