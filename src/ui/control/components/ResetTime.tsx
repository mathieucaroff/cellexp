import * as React from 'react'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'

import Button from '@material-ui/core/Button'

import { useStore } from '../../util/useStore'

export let ResetTime = observer(() => {
   let store = useStore()

   let handleClick = action(() => {
      store.posT.wholePos = 0
      store.posT.microPos = 0
   })

   return (
      <div>
         <Button variant="outlined" onClick={handleClick}>
            Reset
         </Button>
      </div>
   )
})
