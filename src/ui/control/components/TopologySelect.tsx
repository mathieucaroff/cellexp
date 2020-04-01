import { MenuItem, Select } from '@material-ui/core'
import { set, action } from 'mobx'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useStore } from '../../util/useContextHook'
import { BorderDescriptor } from '../../../compute/borderType'

let dead = {
   cumulativeMap: [1, 1],
   total: 1,
}

let simpleDeadBorder: BorderDescriptor = {
   kind: 'side',
   init: [],
   cycle: [dead],
}

export let TopologySelect = observer(() => {
   let store = useStore()

   let handleChange = action((event: any) => {
      let kind: 'loop' | 'border' = event.target.value

      if (kind !== store.topology.kind) {
         if (kind === 'loop') {
            store.topology.kind = kind
         } else if (kind === 'border') {
            set(store.topology, {
               borderLeft: simpleDeadBorder,
               borderRight: simpleDeadBorder,
            })
            set(store.topology, {
               kind,
            })
         }
      }
   })

   return (
      <Select value={store.topology.kind} onChange={handleChange}>
         <MenuItem value="loop">Loop</MenuItem>
         <MenuItem value="border">Border</MenuItem>
      </Select>
   )
})
