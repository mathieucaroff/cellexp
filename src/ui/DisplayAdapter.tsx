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
      <div>
         {header}
         <div className={classes.display} ref={ref}></div>
         {footer}
      </div>
   )
})
