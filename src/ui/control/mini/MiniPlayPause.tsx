import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { useDisplay, useStore } from '../../util/useContextHook'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      buttonContainer: {
         '&': {
            display: 'flex',
         },
         '& > *': {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
         },
      },
   }),
)

/**
 * (1) Small moves
 * (2) Big move
 * (3) Go to top
 */
export let MiniPlayPause = observer(() => {
   let store = useStore()
   let classes = useStyle()
   let display = useDisplay()

   return (
      <div className={classes.buttonContainer}>
         <ButtonGroup orientation="vertical" size="small">
            <Button onClick={display.act.togglePlay}>
               {store.play ? '⏸' : '▶'}
            </Button>
            <Button onClick={display.act.singleStep}>1</Button>
         </ButtonGroup>
      </div>
   )
})
