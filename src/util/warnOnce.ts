import { warnOnceStore } from '../www/global'

export let warnOnce = (msg: string, info: unknown) => {
   if (!warnOnceStore[msg]) {
      warnOnceStore[msg] = true
      console.warn('/1\\', msg, info)
   }
}
