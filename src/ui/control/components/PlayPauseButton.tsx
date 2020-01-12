import Button from '@material-ui/core/Button'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useStore } from '../../util/useStore'

export let PlayPauseButton = observer(() => {
   let store = useStore()

   let handleClick = action(() => {
      store.play = !store.play
   })

   let actionName = store.play ? 'Pause' : 'Play'

   return (
      <div>
         <Button variant="outlined" onClick={handleClick}>
            {actionName}
         </Button>
      </div>
   )
})
