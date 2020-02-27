type AnyFunction = void

/**
 * Memoize the result of an argument-less function f
 * @param f the function to memoize
 */
let memoized = <T>(f: () => T) => {
   let done = false
   let result: T
   return () => {
      return done ? result : ((done = true), (result = f()))
   }
}
