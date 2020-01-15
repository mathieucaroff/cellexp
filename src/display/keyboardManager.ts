export interface KeyboardManagerProp {
   element: Element
   evPropName: keyof KeyboardEvent
}

let createKeyboardManager = (prop: KeyboardManagerProp) => {
   let { element, evPropName } = prop

   let onKeydownMap: Record<string, () => void> = {}
   let onKeyupMap: Record<string, () => void> = {}

   element.addEventListener('keydown', (ev) => {
      let key = '' + ev[evPropName]
      onKeydownMap[key]?.()
   })

   return {
      onKeydown: (key: string, callback: () => void) => {
         if (onKeydownMap[key] !== undefined) {
            throw new Error(`keyboard event ${key}(down) assigned twice`)
         }
         onKeydownMap[key] = callback
         return {
            remove: () => {
               delete onKeydownMap[key]
            },
         }
      },
      onBoth: (prop) => {
         let { key, keydown, keyup } = prop
         if (onKeydownMap[key] !== undefined) {
            throw new Error(`keyboard event ${key}(down) assigned twice`)
         }
         if (onKeyupMap[key] !== undefined) {
            throw new Error(`keyboard event ${key}(up) assigned twice`)
         }
         onKeydownMap[key] = keydown
         onKeyupMap[key] = keyup
         return {
            remove: () => {
               delete onKeydownMap[key]
               delete onKeyupMap[key]
            },
         }
      },
   }
}
