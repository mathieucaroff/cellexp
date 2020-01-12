import * as React from 'react'
import { useState } from 'react'

import { action } from 'mobx'

import { observer } from 'mobx-react-lite'
import { SlowTextField } from '../../components/SlowTextField'
import { useReaction } from '../../util/useReaction'

export interface SelectorInputProp<T extends { [k: string]: any }> {
   label: string
   property: keyof T
   store: T
   validation: (v: string) => [boolean, string]
   disabled?: boolean
}

type RecAny = { [k: string]: any }
type Prop<T> = SelectorInputProp<T>

export let SelectorInput = observer(<T extends RecAny>(prop: Prop<T>) => {
   let { label, property, store, validation, disabled = false } = prop
   let [value, setValue] = useState<string>(() => '' + store[property])

   useReaction(
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
