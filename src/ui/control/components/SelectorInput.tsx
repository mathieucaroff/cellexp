import * as React from 'react'

import { action, reaction } from 'mobx'

import { observer } from 'mobx-react-lite'
import { SlowTextField } from '../../components/SlowTextField'

export interface SelectorInputProp<T extends { [k: string]: any }> {
   label: string
   property: keyof T
   disabled?: boolean
   store: T
   validation: (v: string) => [boolean, string]
}

type RecAny = { [k: string]: any }
type Prop<T> = SelectorInputProp<T>

export let SelectorInput = observer(<T extends RecAny>(prop: Prop<T>) => {
   let { label, property, disabled = false, store, validation } = prop
   let [value, setValue] = React.useState<string>(() => '' + store[property])

   reaction(
      () => store[property],
      (storeValue) => setValue('' + storeValue),
   )

   let [error, help] = validation(value)

   return (
      <SlowTextField
         label={label}
         slowValue={'' + store[property]}
         fastValue={value}
         error={error}
         disabled={disabled}
         helperText={help}
         onChange={setValue}
         onSubmit={action(() => {
            store[property] = +value as any
         })}
      />
   )
})
