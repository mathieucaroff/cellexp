import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import * as React from 'react'
import { useStore } from '../../../util/useStore'
import { Xelement } from '../../../util/Xelement'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      sameLine: {
         '&': {
            display: 'flex',
         },
         '& > *': {
            marginLeft: theme.spacing(2),
         },
      },
   }),
)

/**
 * (1) Small moves
 * (2) Big move
 * (3) Go to top
 */
export let VerticalPanning = () => {
   let classes = useStyle()
   let store = useStore()
   let { posT } = store

   interface ButtonInfo {
      content: Xelement
      key: string
      action: () => void
   }

   let toButton = (prop: ButtonInfo) => {
      let { content, action, key } = prop
      return (
         <Button onClick={action} key={key}>
            {content}
         </Button>
      )
   }

   let gather = (
      content: Xelement,
      action: () => void,
      key?: string,
   ): ButtonInfo => {
      return { content, action, key: key || (content as string) }
   }

   let relativeSmallMoveList = [
      gather(
         <ExpandLessIcon />,
         () => {
            posT.wholePos -= Math.floor(
               ((store.canvasSize.y / store.zoom) * 6) / 12,
            )
         },
         'muiArrowUp',
      ),
      gather(
         <ExpandMoreIcon />,
         () => {
            posT.wholePos += Math.floor(
               ((store.canvasSize.y / store.zoom) * 6) / 12,
            )
         },
         'muiArrowDown',
      ),
   ]

   let relativeBigMoveList = [
      gather('⇞', () => {
         posT.wholePos -= Math.floor((store.canvasSize.y / store.zoom) * 6)
      }),
      gather('⇟', () => {
         posT.wholePos += Math.floor((store.canvasSize.y / store.zoom) * 6)
      }),
   ]

   let absoluteMoveList = [
      gather('⏏', () => {
         posT.wholePos = 0
         posT.microPos = 0
      }),
   ]

   return (
      <div className={classes.sameLine}>
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
}
