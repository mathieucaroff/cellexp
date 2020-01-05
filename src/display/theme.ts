export type ThemeString = 'blackCyan' | 'blackRed' | 'whiteRed' | 'whiteBlue'

export let themeObj: Record<
   ThemeString,
   {
      alive: [number, number, number]
      dead: [number, number, number]
   }
> = {
   blackCyan: { dead: [0, 0, 0], alive: [0, 255, 255] },
   blackRed: { dead: [0, 0, 0], alive: [255, 0, 0] },
   whiteRed: { dead: [255, 255, 255], alive: [255, 0, 0] },
   whiteBlue: { dead: [255, 255, 255], alive: [0, 0, 255] },
}
