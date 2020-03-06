import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { Outline } from '../components/Outline'
import { useStore } from '../util/useContextHook'
import { MiniPlayPause } from './mini/MiniPlayPause'
import { MiniSpeedChange } from './mini/MiniSpeedChange'
import { MiniZoom } from './mini/MiniZoom'
import { MiniPanning } from './mini/MiniPanning'
import { HorizontalPanning } from './mini/morePanningButton/HorizontalPanning'
import { VerticalPanning } from './mini/morePanningButton/VerticalPanning'

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

export let DisplayFooter = observer(() => {
   let classes = useStyle()
   let store = useStore()

   let playLabel = `Play (speed ${store.speed})`
   let navigationLabel = `Navigation (zoom ${store.zoom / 6})`

   return (
      <div className={classes.panningButtons}>
         <Outline label={navigationLabel}>
            <MiniZoom />
            {store.morePanningControl ? (
               <>
                  <HorizontalPanning />
                  <VerticalPanning />
               </>
            ) : (
               <MiniPanning />
            )}
         </Outline>
         <Outline label={playLabel}>
            <MiniPlayPause />
            <MiniSpeedChange />
         </Outline>
      </div>
   )
})
