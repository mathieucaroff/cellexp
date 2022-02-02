import { createStyles, makeStyles, Theme, Tooltip } from '@material-ui/core'
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
            marginTop: 'auto',
            marginBottom: 'auto',
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
         <ButtonGroup size="small">
            <Button
               onClick={display.act.setPause}
               disabled={store.play === false}
            >
               ⏸
            </Button>
            <Button
               onClick={display.act.setPlay}
               disabled={store.play === true}
            >
               ▶
            </Button>
            <Tooltip title="Single step">
               <Button onClick={display.act.singleStep}>❘⯈</Button>
            </Tooltip>
         </ButtonGroup>
      </div>
   )
})
