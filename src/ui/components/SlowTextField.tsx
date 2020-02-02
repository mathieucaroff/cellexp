import TextField from '@material-ui/core/TextField'
import * as React from 'react'

export interface SlowTextFieldProp {
   label: string
   slowValue: string
   fastValue: string
   error: boolean
   helperText: string
   onChange: (v: string) => void
   onSubmit: (v: string) => void
   className?: string
   disabled?: boolean
   inline?: boolean
   type?: string
}

export let SlowTextField = (prop: SlowTextFieldProp) => {
   let {
      error,
      fastValue,
      helperText,
      label,
      onChange,
      onSubmit,
      slowValue,
      className,
      disabled = false,
      inline = false,
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
               onSubmit((ev.target as any).value)
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
