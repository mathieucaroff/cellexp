import { autorun } from 'mobx'

/**
 * autox: MobX's autorun function, but it's easier to give it a name
 * for debug purpose.
 *
 * Synopsis:
 * autox.{debug_name}(<callback function>)
 *
 * Example:
 * ```ts
 * autox.updateDisplay(() => {
 *   render(data.screen)
 * })
 * ```
 */

export let autox = new Proxy(autorun, {
   get: (autorun_, propName) => {
      if (typeof propName === 'number') {
         throw new Error("autox doesn't handle [Number]")
      } else if (typeof propName === 'symbol') {
         throw new Error("autox doesn't handle [Symbol]")
      }

      return (func, param = {}) => {
         if (param.name) {
            throw new Error(
               `Autox got a debug name twice (${propName}) and (${param.name})`,
            )
         }
         autorun_(func, { ...param, name: '' + propName })
      }
   },
}) as typeof autorun & Record<string, typeof autorun>
