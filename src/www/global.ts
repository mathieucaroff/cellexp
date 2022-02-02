import { createContext } from 'react'
import { State } from '../state/state'
import { Display } from '../display/display'

export let storeContext = createContext<State | null>(null)
export let displayContext = createContext<Display | null>(null)

export let timeStore: {
   [k: string]: {
      totalTime: number
      count: number
   }
} = ((window as any).timeStore = {})

export let warnOnceStore: {
   [k: string]: true
} = ((window as any).warnOnceStore = {})
