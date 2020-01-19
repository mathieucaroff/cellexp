import { useEffect, DependencyList } from 'react'
import { autorun, IReactionPublic, IAutorunOptions } from 'mobx'

export type UseAutorun = (
   view: (r: IReactionPublic) => any,
   opts?: IAutorunOptions,
   deps?: DependencyList,
) => void

/**
 * autorun, but it makes sure to run the disposer function when the component is
 * unmounted.
 *
 * Autorun:
 * Creates a named reactive view and keeps it alive, so that the view is always
 * updated if one of the dependencies changes, even when the view is not further
 * used by something else.
 *
 * @param view The reactive view
 * @param opts
 * @param deps If provided, the autorun will be disposed and recreated
 * each time a value in the list is changed
 */
export let useAutorun: UseAutorun = (view, opts, deps = []) => {
   useEffect(() => autorun(view, opts), deps)
}
