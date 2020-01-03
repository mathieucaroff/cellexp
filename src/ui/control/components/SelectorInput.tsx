import * as React from 'react'

import { action, reaction } from 'mobx'

import { observer } from 'mobx-react-lite'
import { SlowTextField } from '../../components/SlowTextField'

export interface SelectorInputProp<T extends { [k: string]: any }> {
   label: string
   property: keyof T
   store: T
   validation: (v: string) => [boolean, string]
}

export let SelectorInput = observer(
   <T extends { [k: string]: any }>(prop: SelectorInputProp<T>) => {
      let { label, property, store, validation } = prop
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
            helperText={help}
            onChange={setValue}
            onSubmit={action(() => {
               store[property] = +value as any
            })}
         />
      )
   },
)
