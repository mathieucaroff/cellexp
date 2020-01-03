import * as React from 'react'

import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Select from '@material-ui/core/Select'

export type ThemeString = 'blackCyan' | 'blackRed' | 'whiteRed' | 'whiteBlue'

export let ThemeSelector = () => {
   const [theme, setTheme] = React.useState<ThemeString>('blackCyan')

   const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
      setTheme(event.target.value as ThemeString)
   }

   return (
      <FormControl>
         <InputLabel id="theme-selector-label">Theme</InputLabel>
         <Select
            labelId="theme-selector-label"
            id="theme-selector-select"
            value={theme}
            onChange={handleChange}
         >
            <MenuItem value={'blackCyan'}>Black-cyan</MenuItem>
            <MenuItem value={'blackRed'}>Black-red</MenuItem>
            <MenuItem value={'whiteRed'}>White-red</MenuItem>
            <MenuItem value={'whiteRed'}>White-blue</MenuItem>
         </Select>
         <FormHelperText>Cellular automaton colors</FormHelperText>
      </FormControl>
   )
}
