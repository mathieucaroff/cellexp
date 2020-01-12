import * as React from 'react'

import { Display } from '../display/display'
import { Rule } from './editor/components/Rule'
import { useStore } from './util/useStore'

export interface DisplayAdapterProp {
   display: Display
}

export let DisplayAdapter = (prop: DisplayAdapterProp) => {
   let { display } = prop

   let store = useStore()

   let ref = React.useRef<HTMLDivElement>(null)

   React.useEffect(() => {
      if (!ref.current) {
         let message =
            "Unexpected lifecycle in `DisplayAdapter.tsx`. The display won't mount."
         console.error(message, new Error().stack)
         return
      }
      display.renderDisplay(ref.current)
   })

   return (
      <div ref={ref}>
         <h2>
            Display <Rule rule={store.rule} />
         </h2>
      </div>
   )
}
