import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import * as React from 'react'
import { useDisplay } from '../../../util/useContextHook'
import { Xelement } from '../../../util/Xelement'
import { observer } from 'mobx-react-lite'

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
export let VerticalPanning = observer(() => {
   let classes = useStyle()
   let display = useDisplay()
   let { info, act } = display

   let toButton = (
      content: Xelement,
      disabled: boolean,
      action: () => void,
      key?: string,
   ): React.ReactElement => {
      return (
         <Button
            onClick={action}
            key={key || (content as string)}
            disabled={disabled}
         >
            {content}
         </Button>
      )
   }

   let relativeSmallMoveList = [
      toButton(<ExpandLessIcon />, info.passingTop, act.goUp, 'muiArrowUp'),
      toButton(<ExpandMoreIcon />, false, act.goDown, 'muiArrowDown'),
   ]

   let relativeBigMoveList = [
      toButton('⇞', info.passingTop, act.pageUp),
      toButton('⇟', false, act.pageDown),
   ]

   let absoluteMoveList = [toButton('⏏', info.atTop, act.gotoTop)]

   return (
      <div className={classes.buttonContainer}>
         <ButtonGroup orientation="vertical" size="small">
            {relativeSmallMoveList}
         </ButtonGroup>
         <ButtonGroup orientation="vertical" size="small">
            {relativeBigMoveList}
         </ButtonGroup>
         <ButtonGroup orientation="vertical" size="small">
            {absoluteMoveList}
         </ButtonGroup>
      </div>
   )
})
