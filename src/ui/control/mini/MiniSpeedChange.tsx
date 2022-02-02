import { createStyles, makeStyles, Theme, Tooltip } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { useDisplay } from '../../util/useContextHook'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      buttonContainer: {
         '&': {
            display: 'flex',
            marginLeft: theme.spacing(1),
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
export let MiniSpeedChange = observer(() => {
   let classes = useStyle()
   let display = useDisplay()

   return (
      <div className={classes.buttonContainer}>
         <ButtonGroup orientation="vertical" size="small">
            <Tooltip title="Decrease speed" placement="top">
               <Button
                  disabled={display.info.passingMinSpeed}
                  onClick={display.act.halfSpeed}
               >
                  -
               </Button>
            </Tooltip>
            <Tooltip title="Increase speed">
               <Button
                  disabled={display.info.passingMaxSpeed}
                  onClick={display.act.doubleSpeed}
               >
                  +
               </Button>
            </Tooltip>
         </ButtonGroup>
      </div>
   )
})
