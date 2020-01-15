import { createStyles, makeStyles, Theme } from '@material-ui/core'
import * as React from 'react'
import { HorizontalPanning } from './components/panning/HorizontalPanning'
import { VerticalPanning } from './components/panning/VerticalPanning'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      panningButtons: {
         '&': {
            display: 'flex',
            justifyContent: 'center',
            margin: theme.spacing(2),
         },
         '& > *': {
            marginLeft: theme.spacing(3),
         },
      },
   }),
)

export let DisplayFooter = () => {
   let classes = useStyle()

   return (
      <>
         <div className={classes.panningButtons}>
            <HorizontalPanning />
            <VerticalPanning />
         </div>
      </>
   )
}
