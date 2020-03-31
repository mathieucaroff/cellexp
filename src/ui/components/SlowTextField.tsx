import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import * as React from 'react'

export interface SlowTextFieldProp {
   error: boolean
   fastValue: string
   inline?: boolean
   label: string
   onChange: (v: string) => void
   onSubmit: (v: string) => void
   slowValue: string
   /**
    * Props applied to the TextField element
    */
   TextFieldProps: Omit<TextFieldProps, 'label' | 'value' | 'onChange'>
}

export let SlowTextField = (prop: SlowTextFieldProp) => {
   let {
      error,
      fastValue,
      inline = false,
      label,
      onChange,
      onSubmit,
      slowValue,
      TextFieldProps,
   } = prop

   let maybeDirty = slowValue !== fastValue ? 'dirty' : ''

   let formAddition = inline ? { style: { display: 'inline' } } : {}

   let handleSubmit = (ev: React.FormEvent) => {
      if (!error) {
         onSubmit(fastValue)
      }
      ev.preventDefault()
   }

   let handleKeyDown = (ev) => {
      if (ev.key === 'Enter' && (ev.altKey || ev.ctrlKey || ev.shiftKey)) {
         handleSubmit(ev)
      }
   }

   let handleChange = (ev) => onChange(ev.currentTarget.value)

   return (
      <form className={maybeDirty} {...formAddition} onSubmit={handleSubmit}>
         <TextField
            label={label + ` (${slowValue})`}
            value={fastValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            {...(TextFieldProps as any)}
         />
      </form>
   )
}
