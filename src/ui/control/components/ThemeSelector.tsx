import * as React from 'react'

import { observer } from 'mobx-react-lite'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'

import { ThemeString } from '../../../display/theme'
import { useStore } from '../../util/useStore'

export let ThemeSelector = observer(() => {
   let store = useStore()

   const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      store.theme = event.target.value as ThemeString
   }

   return (
      <FormControl>
         <InputLabel id="theme-selector-label">Theme</InputLabel>
         <Select
            labelId="theme-selector-label"
            id="theme-selector-select"
            value={store.theme}
            onChange={handleChange}
         >
            <MenuItem value={'blackCyan'}>Black-cyan</MenuItem>
            <MenuItem value={'blackRed'}>Black-red</MenuItem>
            <MenuItem value={'whiteRed'}>White-red</MenuItem>
            <MenuItem value={'whiteBlue'}>White-blue</MenuItem>
         </Select>
         <FormHelperText>Cellular automaton colors</FormHelperText>
      </FormControl>
   )
})
