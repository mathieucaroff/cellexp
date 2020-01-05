import { useContext } from 'react'
import { hubContext } from '../../www/global'

export let useHub = () => {
   let hub = useContext(hubContext)
   if (!hub) {
      throw new Error('useHub must be used within a StoreProvider.')
   }
   return hub
}
