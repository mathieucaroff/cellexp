import TextField from '@material-ui/core/TextField'
import * as React from 'react'

export interface SlowTextFieldProp {
   className?: string
   disabled?: boolean
   error: boolean
   fastValue: string
   helperText: string
   inline?: boolean
   label: string
   onChange: (v: string) => void
   onSubmit: (v: string) => void
   slowValue: string
   type?: string
}

export let SlowTextField = (prop: SlowTextFieldProp) => {
   let {
      className,
      disabled = false,
      error,
      fastValue,
      helperText,
      inline = false,
      label,
      onChange,
      onSubmit,
      slowValue,
      type,
   } = prop

   let maybeDirty = slowValue !== fastValue ? 'dirty' : ''

   let formAddition = inline ? { style: { display: 'inline' } } : {}

   return (
      <form
         className={maybeDirty}
         {...formAddition}
         onSubmit={(ev: React.FormEvent) => {
            if (!error) {
               onSubmit(fastValue)
            }
            ev.preventDefault()
         }}
      >
         <TextField
            className={className}
            label={label + ` (${slowValue})`}
            value={fastValue}
            error={error}
            disabled={disabled}
            helperText={helperText}
            type={type}
            onChange={(ev) => onChange(ev.currentTarget.value)}
         />
      </form>
   )
}
