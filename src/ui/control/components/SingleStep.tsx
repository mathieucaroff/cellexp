import Button from '@material-ui/core/Button'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useDisplay } from '../../util/useContextHook'

export let SingleStep = observer(() => {
   let display = useDisplay()

   return (
      <div>
         <Button variant="outlined" onClick={display.act.singleStep}>
            Single Step
         </Button>
      </div>
   )
})
