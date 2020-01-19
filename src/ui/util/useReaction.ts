import { IReactionOptions, IReactionPublic, reaction } from 'mobx'
import { DependencyList, useEffect } from 'react'

export type UseReaction = <T>(
   expression: (r: IReactionPublic) => T,
   effect: (arg: T, r: IReactionPublic) => void,
   opts?: IReactionOptions,
   deps?: DependencyList,
) => void

/**
 * reaction, but ensures to run the disposer function when the component is
 * unmounted
 *
 * @param expression What values the reaction is based on
 * @param effect What effect the reaction does
 * @param opts
 * @param deps If provided, the reaction will be recreated each time a
 * value in the list is changed
 */
export let useReaction: UseReaction = (expression, effect, opts, deps = []) => {
   useEffect(() => reaction(expression, effect, opts), deps)
}
