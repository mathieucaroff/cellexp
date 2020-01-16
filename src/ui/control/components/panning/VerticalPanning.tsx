import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import * as React from 'react'
import { useStore } from '../../../util/useStore'
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
   let store = useStore()
   let { posT } = store

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
      action: () => void,
      disabled: boolean,
      key?: string,
   ): ButtonInfo => {
      return { content, disabled, action, key: key || (content as string) }
   }

   let relativeSmallMoveList = [
      gather(
         <ExpandLessIcon />,
         () => {
            posT.wholePos -= Math.floor(
               ((store.canvasSize.y / store.zoom) * 6) / 12,
            )
         },
         posT.wholePos <= 0 && posT.microPos <= 0,
         'muiArrowUp',
      ),
      gather(
         <ExpandMoreIcon />,
         () => {
            posT.wholePos += Math.floor(
               ((store.canvasSize.y / store.zoom) * 6) / 12,
            )
         },
         false,
         'muiArrowDown',
      ),
   ]

   let relativeBigMoveList = [
      gather(
         '⇞',
         () => {
            posT.wholePos -= Math.floor((store.canvasSize.y / store.zoom) * 6)
         },
         posT.wholePos <= 0 && posT.microPos <= 0,
      ),
      gather(
         '⇟',
         () => {
            posT.wholePos += Math.floor((store.canvasSize.y / store.zoom) * 6)
         },
         false,
      ),
   ]

   let absoluteMoveList = [
      gather(
         '⏏',
         () => {
            posT.wholePos = 0
            posT.microPos = 0
         },
         posT.wholePos <= 0 && posT.microPos <= 0,
      ),
   ]

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
