import * as React from 'react'
import { action, reaction } from 'mobx'
import { observer, useLocalStore } from 'mobx-react-lite'

import Button from '@material-ui/core/Button'

import { useStore } from '../../util/useStore'

export let AlignTime = observer(() => {
   let store = useStore()

   let handleClick = action(() => {
      store.play = false
      store.posT.microPos = store.posT.microPos < 15 ? 0 : 30
   })

   return (
      <div>
         <Button
            variant="outlined"
            disabled={store.play || store.posT.microPos === 0}
            onClick={handleClick}
         >
            Align Generation
         </Button>
      </div>
   )
})
