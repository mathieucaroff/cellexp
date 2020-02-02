import { createStyles, makeStyles, Theme } from '@material-ui/core'
import * as React from 'react'
import { HorizontalPanning } from './mini/HorizontalPanning'
import { MiniPlayPause } from './mini/MiniPlayPause'
import { MiniZoom } from './mini/MiniZoom'
import { VerticalPanning } from './mini/VerticalPanning'
import { MiniSpeedChange } from './mini/MiniSpeedChange'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      panningButtons: {
         '&': {
            display: 'flex',
            flexFlow: 'wrap',
            justifyContent: 'center',
            margin: theme.spacing(2),
         },
         '& > *': {
            margin: theme.spacing(1),
         },
      },
   }),
)

export let DisplayFooter = () => {
   let classes = useStyle()

   return (
      <div className={classes.panningButtons}>
         <MiniPlayPause />
         <MiniSpeedChange />
         <MiniZoom />
         <VerticalPanning />
         <HorizontalPanning />
      </div>
   )
}
