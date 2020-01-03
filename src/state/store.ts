import { ThemeString } from '../ui/control/components/ThemeSelector'

export interface Store {
   rule: number
   size: number
   speed: number
   theme: ThemeString
}

export let createStore = (): Store => {
   return {
      rule: 73,
      size: 400,
      speed: 1,
      theme: 'blackCyan',
   }
}
