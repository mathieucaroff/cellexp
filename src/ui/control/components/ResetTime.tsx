import Button from '@material-ui/core/Button'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useDisplay } from '../../util/useContextHook'

export let ResetTime = observer(() => {
   let display = useDisplay()

   return (
      <div>
         <Button
            variant="outlined"
            disabled={display.info.atTop}
            onClick={display.act.gotoTop}
         >
            Reset
         </Button>
      </div>
   )
})
