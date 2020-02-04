import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useState } from 'react'
import { SlowTextField } from './SlowTextField'
import { useReaction } from '../util/useReaction'

/**
 * SelectorInputProp
 *
 * @property validation - function returning a tuple [hasError, helpText]
 * @property doChange? - hook function receiving the new value and the old
 *   value of the input. It must return what value should be shown in the field
 */
export interface SelectorInputProp<T extends { [k: string]: any }> {
   label: string
   property: keyof T
   store: T
   validation: (v: string) => [boolean, string]
   disabled?: boolean
   type?: string
   doChange?: (newValue: string, oldValue: string) => [boolean, string]
}

type RecAny = { [k: string]: any }
type Prop<T> = SelectorInputProp<T>

export let SelectorInput = observer(<T extends RecAny>(prop: Prop<T>) => {
   let { label, property, store, validation, disabled = false, type } = prop
   const { doChange } = prop

   let [value, setValue] = useState<string>(() => '' + store[property])

   useReaction(
      () => store[property],
      (storeValue) => setValue('' + storeValue),
   )

   let [error, help] = validation(value)

   let onChange: (val: string) => void

   if (!doChange) {
      onChange = setValue
   } else {
      onChange = (newValue: string) => {
         let [submit, resValue] = doChange(newValue, value)
         setValue(resValue)
         if (submit) {
            action(() => {
               store[property] = +resValue as any
            })()
         }
      }
   }

   return (
      <SlowTextField
         label={label}
         slowValue={'' + store[property]}
         fastValue={value}
         error={error}
         disabled={disabled}
         helperText={help}
         type={type}
         onChange={onChange}
         onSubmit={action(() => {
            store[property] = +value as any
         })}
      />
   )
})
