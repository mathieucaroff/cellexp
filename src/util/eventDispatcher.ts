/**
 * An EventDispatcher holds a list of registered callbacks, and performs
 * dispatching argumentless events to those callbacks.
 */
export let createEventDispatcher = () => {
   let callbackList: (() => any)[] = []

   return {
      /**
       * Add a callback to be run when the event is fired
       * @param callback the function to register
       */
      register(callback: () => any) {
         callbackList.push(callback)
      },
      /**
       * Fire the event
       */
      dispatch() {
         callbackList.forEach((callback) => {
            callback()
         })
      },
   }
}
