import * as React from 'react'

import TextField, { TextFieldProps } from '@material-ui/core/TextField'

export interface SlowTextFieldProp {
   label: string
   slowValue: string
   fastValue: string
   error: boolean
   helperText: string
   onChange: (v: string) => void
   onSubmit: (v: string) => void
}

export let SlowTextField = (prop: SlowTextFieldProp) => {
   let mayBeDirty = prop.slowValue !== prop.fastValue ? 'dirty' : ''

   return (
      <form
         onSubmit={(ev: React.FormEvent) => {
            if (!prop.error) {
               prop.onSubmit((ev.target as any).value)
            }
            ev.preventDefault()
         }}
      >
         <TextField
            label={prop.label + ` (${prop.slowValue})`}
            className={mayBeDirty}
            value={prop.fastValue}
            error={prop.error}
            helperText={prop.helperText}
            onChange={(ev) => prop.onChange(ev.currentTarget.value)}
         />
      </form>
   )
}
