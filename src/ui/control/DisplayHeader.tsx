import { createStyles, makeStyles, Theme } from '@material-ui/core'
import * as React from 'react'
import { Rule } from '../editor/components/Rule'
import { useStore } from '../util/useStore'
import { HorizontalPanning } from './components/panning/HorizontalPanning'
import { VerticalPanning } from './components/panning/VerticalPanning'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      panningButtons: {
         '&': {
            display: 'flex',
            justifyContent: 'center',
         },
         '& > *': {
            marginLeft: theme.spacing(3),
         },
      },
   }),
)

export let DisplayHeader = () => {
   let store = useStore()
   let classes = useStyle()

   return (
      <>
         <h2>
            Display <Rule rule={store.rule} />
         </h2>
         <div className={classes.panningButtons}>
            <HorizontalPanning />
            <VerticalPanning />
         </div>
      </>
   )
}
