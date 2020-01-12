import * as React from 'react'

import { observer, useLocalStore } from 'mobx-react-lite'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'

import { Store } from '../../../state/store'
import { ThemeString, themeSet, CellexpTheme } from '../../../www/theme'

export interface AppThemeSelectorProp {
   label: string
   help: string
   allowUnset?: boolean
   themeProperty: 'theme' | 'displayTheme'
   store: Store
   nameFunction: (theme: CellexpTheme) => string
}

export let ThemeSelector = observer((prop: AppThemeSelectorProp) => {
   let {
      label,
      help,
      allowUnset = false,
      store,
      themeProperty,
      nameFunction,
   } = prop

   let handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      store[themeProperty] = event.target.value as ThemeString
   }

   let toColorItem = ([key, theme]: [string, CellexpTheme]) => {
      return (
         <MenuItem key={key} value={key}>
            {nameFunction(theme)}
         </MenuItem>
      )
   }

   return (
      <FormControl>
         <InputLabel id="theme-selector-label">{label}</InputLabel>
         <Select
            labelId="theme-selector-label"
            value={store[themeProperty]}
            onChange={handleChange}
         >
            {allowUnset ? (
               <MenuItem value="unset">
                  {'<'}inherit from app theme{'>'}
               </MenuItem>
            ) : null}
            {Object.entries(themeSet).map(toColorItem)}
         </Select>
         <FormHelperText>{help}</FormHelperText>
      </FormControl>
   )
})
