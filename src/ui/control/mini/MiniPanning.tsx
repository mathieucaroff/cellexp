import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import * as React from 'react'
import { useDisplay } from '../../util/useContextHook'
import { Xelement } from '../../util/Xelement'
import { observer } from 'mobx-react-lite'

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
      shiftRight4: {
         position: 'relative',
         left: '4px',
      },
      shiftRight1: {
         position: 'relative',
         left: '1px',
      },
      shiftLeft1: {
         position: 'relative',
         right: '1px',
      },
   }),
)

/**
 * (1) Small moves
 * (2) Big move
 * (3) Go to top
 */
export let MiniPanning = observer(() => {
   let classes = useStyle()
   let display = useDisplay()
   let { info, act } = display

   let toButton = (
      content: Xelement,
      disabled: boolean,
      action: () => void,
      key: string,
      prop = {},
   ): React.ReactElement => {
      return (
         <Button
            disabled={disabled}
            key={key}
            onClick={action}
            size="small"
            variant="outlined"
            style={{ minWidth: 0 }}
            {...prop}
         >
            {content}
         </Button>
      )
   }

   let left = toButton(
      <ArrowBackIosIcon className={classes.shiftRight4} fontSize="small" />,
      info.passingLeftBorder,
      act.goLeft,
      'left',
      { className: classes.shiftRight1 },
   )
   let right = toButton(
      <ArrowForwardIosIcon fontSize="small" />,
      info.passingRightBorder,
      act.goRight,
      'right',
      { className: classes.shiftLeft1 },
   )
   let relativeSmallMoveList = [
      toButton(<ExpandLessIcon />, info.passingTop, act.goUp, 'muiArrowUp'),
      toButton(<ExpandMoreIcon />, false, act.goDown, 'muiArrowDown'),
   ]

   return (
      <div className={classes.buttonContainer}>
         {left}
         <ButtonGroup orientation="vertical">
            {relativeSmallMoveList}
         </ButtonGroup>
         {right}
      </div>
   )
})
