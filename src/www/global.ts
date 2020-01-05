import { createContext } from 'react'

import { Store } from '../state/store'

export let storeContext = createContext<Store | null>(null)

export let timeStore: {
   [k: string]: {
      totalTime: number
      count: number
   }
} = ((window as any).timeStore = {})
