import { useContext } from 'react'
import { displayContext, storeContext, hubContext } from '../../www/global'

export let useDisplay = () => {
   let display = useContext(displayContext)
   if (!display) {
      throw new Error('useDisplay must be used within a StoreProvider')
   }
   return display
}

export let useHub = () => {
   let hub = useContext(hubContext)
   if (!hub) {
      throw new Error('useHub must be used within a StoreProvider')
   }
   return hub
}

export let useStore = () => {
   let store = useContext(storeContext)
   if (!store) {
      throw new Error('useStore must be used within a StoreProvider')
   }
   return store
}
