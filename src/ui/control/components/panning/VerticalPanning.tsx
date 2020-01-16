import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import * as React from 'react'
import { useStore, useDisplay } from '../../../util/useContextHook'
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

   interface ButtonInfo {
      content: Xelement
      key: string
      action: () => void
      disabled: boolean
   }

   let toButton = (prop: ButtonInfo) => {
      let { content, action, key, disabled } = prop
      return (
         <Button onClick={action} key={key} disabled={disabled}>
            {content}
         </Button>
      )
   }

   let gather = (
      content: Xelement,
      disabled: boolean,
      action: () => void,
      key?: string,
   ): ButtonInfo => {
      return { content, disabled, action, key: key || (content as string) }
   }

   let relativeSmallMoveList = [
      gather(<ExpandLessIcon />, info.passingTop, act.goUp, 'muiArrowUp'),
      gather(<ExpandMoreIcon />, false, act.goDown, 'muiArrowDown'),
   ]

   let relativeBigMoveList = [
      gather('⇞', info.passingTop, act.pageUp),
      gather('⇟', false, act.pageDown),
   ]

   let absoluteMoveList = [gather('⏏', info.atTop, act.gotoTop)]

   return (
      <div className={classes.buttonContainer}>
         <ButtonGroup orientation="vertical" size="small">
            {relativeSmallMoveList.map(toButton)}
         </ButtonGroup>
         <ButtonGroup orientation="vertical" size="small">
            {relativeBigMoveList.map(toButton)}
         </ButtonGroup>
         <ButtonGroup orientation="vertical" size="small">
            {absoluteMoveList.map(toButton)}
         </ButtonGroup>
      </div>
   )
})
