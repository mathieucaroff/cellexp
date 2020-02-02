import { createEventDispatcher } from '../util/eventDispatcher'

export let createHub = () => {
   return {}
}

export type Hub = ReturnType<typeof createHub>
