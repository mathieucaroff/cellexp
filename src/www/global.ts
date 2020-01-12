import { createContext } from 'react'
import { Hub } from '../state/hub'
import { Store } from '../state/store'

export let storeContext = createContext<Store | null>(null)
export let hubContext = createContext<Hub | null>(null)

export let timeStore: {
   [k: string]: {
      totalTime: number
      count: number
   }
} = ((window as any).timeStore = {})
