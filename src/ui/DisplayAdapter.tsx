import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { Display } from '../display/display'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      display: {
         '&': {
            cursor: 'grab',
         },
         '& > *': {
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

   let rootRef = React.useRef<HTMLDivElement>(null)

   React.useEffect(() => {
      if (!rootRef.current) {
         let message = 'Unexpected lifecycle in `DisplayAdapter.tsx`'
         console.warn(message, rootRef, new Error().stack)
      } else {
         display.initialize({
            rootElement: rootRef.current as any,
            keyboardElement: rootRef.current as any,
         })
      }
   }, [])

   return (
      <div>
         {header}
         <div className={classes.display} ref={rootRef} tabIndex={0}></div>
         {footer}
      </div>
   )
})
