import { createMuiTheme } from '@material-ui/core/styles'

export type Color = [number, number, number]

export interface CellexpTheme {
   type: 'dark' | 'light'
   color: Color
   colorName: string
}

let toCssRGB = (color: Color): string => {
   return `rgb(${color})`
}

export let muiThemeFromCellexp = (theme: CellexpTheme) => {
   let { type, color } = theme

   return createMuiTheme({
      palette: {
         type,
         primary: {
            main: toCssRGB(color),
         },
      },
   })
}

export let themeNameFromCellexp = (theme: CellexpTheme): string => {
   let { type, colorName } = theme
   return type === 'light' ? `Light-${colorName}` : `Dark-${colorName}`
}

export let displayThemeNameFromCellexp = (theme: CellexpTheme) => {
   let { type, colorName } = theme
   return type === 'light' ? `White-${colorName}` : `Black-${colorName}`
}

export let displayThemeFromCellexp = (theme: CellexpTheme) => {
   let { type, color } = theme

   return {
      dead: type === 'light' ? [255, 255, 255] : [0, 0, 0],
      alive: color,
   }
}

let color = (a, b, c): Color => [a, b, c]
let color01 = (a, b, c): Color => {
   return [a, b, c].map((x) => Math.max(0, x * 256 - 1)) as Color
}

let dryThemeSet = {
   darkLyra: color(0x94, 0xff, 0x220),
   darkCyan: color01(0, 1, 1),
   darkCream: color(0xff, 0xfd, 0xd0),
   darkGrey: color(0x88, 0x88, 0x88),
   darkAlbescent: color(0xfc, 0xfc, 0xfc),
   // darkRed: color(1, 0, 0),
   // darkMagenta: color(1, 0, 1),
   lightRed: color01(1, 0, 0),
   lightBlue: color01(0, 0, 1),
   lightCoal: color(0x38, 0x38, 0x38),
}

let makeThemeSet = () => {
   let themeSet = {} as {
      [k in keyof typeof dryThemeSet]: CellexpTheme
   }
   Object.entries(dryThemeSet).forEach(([k, color]) => {
      themeSet[k] = {
         type: k.startsWith('light') ? 'light' : 'dark',
         color,
         colorName: k.replace(/^(dark|light)/, '').toLowerCase(),
      }
   })
   return themeSet
}

export let themeSet = makeThemeSet()

export type ThemeSet = typeof themeSet

export type ThemeString = keyof ThemeSet
