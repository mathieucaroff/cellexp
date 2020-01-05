import { createEventDispatcher } from '../util/eventDispatcher'

export let createHub = () => {
   return {
      reroll: createEventDispatcher(),
   }
}

export type Hub = ReturnType<typeof createHub>
