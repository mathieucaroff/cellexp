import * as React from 'react'

import FormControl from '@material-ui/core/FormControl'
import TextField from '@material-ui/core/TextField'

/**
 * Accept a help-and-validation function.
 */

export interface ValidableSlowInputProp {
   value: string
   helpValidate: () => { help: string; valid: boolean }
   onChange: (value: string) => void
}
