import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { Display } from '../display/display'
import { Rule } from './editor/components/Rule'
import { useStore } from './util/useStore'

export interface DisplayAdapterProp {
   display: Display
}

export let DisplayAdapter = observer((prop: DisplayAdapterProp) => {
   let { display } = prop

   let store = useStore()

   let ref = React.useRef<HTMLDivElement>(null)

   React.useEffect(() => {
      if (!ref.current) {
         let message = 'Unexpected lifecycle in `DisplayAdapter.tsx`'
         console.warn(message, new Error().stack)
      } else {
         display.renderDisplay(ref.current)
      }
   }, [])

   return (
      <div ref={ref}>
         <h2>
            Display <Rule rule={store.rule} />
         </h2>
      </div>
   )
})
