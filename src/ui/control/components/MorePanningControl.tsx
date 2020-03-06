import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useStore } from '../../util/useContextHook'
import { Checkbox, FormControlLabel } from '@material-ui/core'
import { action } from 'mobx'

/**
 * Checkbox to show all panning buttons
 */
export let MorePanningControl = observer(() => {
   let store = useStore()

   let handleChange = action(() => {
      store.morePanningControl = !store.morePanningControl
   })

   return (
      <FormControlLabel
         control={
            <Checkbox
               checked={store.morePanningControl}
               onChange={handleChange}
               color="primary"
            />
         }
         label="Show all panning buttons"
      />
   )
})
