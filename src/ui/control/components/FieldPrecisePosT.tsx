import * as React from 'react'

import { observer } from 'mobx-react-lite'

import { useStore } from '../../util/useStore'
import { TextField } from '@material-ui/core'

export let FieldPrecisePosT = observer(() => {
   let store = useStore()

   return (
      <TextField
         label="Generation"
         helperText="Elapsed generations"
         disabled
         value={store.posT.microPos}
      />
   )
})
