import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { Display } from '../display/display'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      display: {
         '& canvas': {
            display: 'block',
            margin: 'auto',
         },
      },
   }),
)

export interface DisplayAdapterProp {
   display: Display
   header: React.ReactElement
   footer: React.ReactElement
}

export let DisplayAdapter = observer((prop: DisplayAdapterProp) => {
   let classes = useStyle()
   let { display, header, footer } = prop

   let outerRef = React.useRef<HTMLDivElement>(null)
   let rootRef = React.useRef<HTMLDivElement>(null)

   React.useEffect(() => {
      if (!rootRef.current || !outerRef.current) {
         let message = 'Unexpected lifecycle in `DisplayAdapter.tsx`'
         console.warn(message, rootRef, outerRef, new Error().stack)
      } else {
         display.renderDisplay({
            rootElement: rootRef.current,
            keyboardElement: outerRef.current,
         })
      }
   }, [])

   return (
      <div ref={outerRef}>
         {header}
         <div className={classes.display} ref={rootRef}></div>
         {footer}
      </div>
   )
})
