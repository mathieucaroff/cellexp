import { createContext } from 'react'

import { Store } from '../state/store'
import { Hub } from '../state/hub'

export let storeContext = createContext<Store | null>(null)
export let hubContext = createContext<Hub | null>(null)

export let timeStore: {
   [k: string]: {
      totalTime: number
      count: number
   }
} = ((window as any).timeStore = {})
