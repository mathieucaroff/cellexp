import { createContext } from 'react'

import { Store } from '../state/store'

export let storeContext = createContext<Store | null>(null)
