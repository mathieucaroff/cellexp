import * as React from 'react'

import TextField from '@material-ui/core/TextField'

export interface SlowTextFieldProp {
   label: string
   slowValue: string
   fastValue: string
   error: boolean
   disabled?: boolean
   helperText: string
   onChange: (v: string) => void
   onSubmit: (v: string) => void
}

export let SlowTextField = (prop: SlowTextFieldProp) => {
   let {
      label,
      slowValue,
      fastValue,
      error,
      disabled = false,
      helperText,
      onChange,
      onSubmit,
   } = prop

   let maybeDirty = slowValue !== fastValue ? 'dirty' : ''

   return (
      <form
         className={maybeDirty}
         onSubmit={(ev: React.FormEvent) => {
            if (!error) {
               onSubmit((ev.target as any).value)
            }
            ev.preventDefault()
         }}
      >
         <TextField
            label={label + ` (${slowValue})`}
            value={fastValue}
            error={error}
            disabled={disabled}
            helperText={helperText}
            onChange={(ev) => onChange(ev.currentTarget.value)}
         />
      </form>
   )
}
