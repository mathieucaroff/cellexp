import Button from '@material-ui/core/Button'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useStore } from '../../util/useStore'

export let ResetTime = observer(() => {
   let store = useStore()

   let handleClick = action(() => {
      store.play = false

      store.posT.wholePos = 0
      store.posT.microPos = 0
   })

   let isZero = store.posT.wholePos === 0 && store.posT.microPos === 0

   return (
      <div>
         <Button variant="outlined" disabled={isZero} onClick={handleClick}>
            Reset
         </Button>
      </div>
   )
})
