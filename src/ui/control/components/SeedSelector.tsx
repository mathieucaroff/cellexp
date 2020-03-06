import { reaction } from 'mobx'
import { observer, useLocalStore } from 'mobx-react-lite'
import * as React from 'react'
import { SlowTextField } from '../../components/SlowTextField'
import { useStore } from '../../util/useContextHook'

export let SeedSelector = observer(() => {
   let store = useStore()

   let local = useLocalStore(() => {
      return {
         slowValue: store.seed,
         value: store.seed,
      }
   })

   reaction(
      () => store.seed,
      (value) => {
         local.slowValue = value
         local.value = value
      },
   )

   return (
      <SlowTextField
         error={false}
         fastValue={local.value}
         helperText={'Simulation random seed'}
         label={'Seed'}
         onChange={(newV) => {
            local.value = newV
         }}
         onSubmit={() => {
            local.value = local.value || '_'
            local.slowValue = local.value || '_'
            store.seed = local.value
         }}
         slowValue={local.slowValue}
      />
   )
})
