import { createStyles, makeStyles, Theme, ButtonBase } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { Display } from '../display/display'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      display: {
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

   let outerRef = React.useRef<any>(null)
   let rootRef = React.useRef<HTMLDivElement>(null)

   React.useEffect(() => {
      if (!rootRef.current || !outerRef.current) {
         let message = 'Unexpected lifecycle in `DisplayAdapter.tsx`'
         console.warn(message, rootRef, outerRef, new Error().stack)
      } else {
         display.initialize({
            rootElement: rootRef.current,
            keyboardElement: outerRef.current,
         })
      }
   }, [])

   return (
      <div>
         {header}
         <div className={classes.display}>
            <ButtonBase ref={outerRef}>
               <div ref={rootRef}></div>
            </ButtonBase>
         </div>
         {footer}
      </div>
   )
})
