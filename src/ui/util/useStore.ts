import { useContext } from 'react'
import { storeContext } from '../../www/global'

export let useStore = () => {
   let store = useContext(storeContext)
   if (!store) {
      throw new Error('useStore must be used within a StoreProvider.')
   }
   return store
}
