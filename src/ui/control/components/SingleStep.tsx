import Button from '@material-ui/core/Button'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useStore } from '../../util/useStore'

export let SingleStep = observer(() => {
   let store = useStore()

   let handleClick = action(() => {
      store.play = false
      store.posT.wholePos += 1
   })

   return (
      <div>
         <Button variant="outlined" onClick={handleClick}>
            Single Step
         </Button>
      </div>
   )
})
