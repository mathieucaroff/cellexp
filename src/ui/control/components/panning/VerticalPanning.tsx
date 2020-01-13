import * as React from 'react'
import { useStore } from '../../../util/useStore'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { Xelement } from '../../../util/Xelement'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'

/**
 * (1) Small moves
 * (2) Big move
 * (3) Go to top
 */
export let VerticalPanning = () => {
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
      gather(<ExpandLessIcon />, () => {
         posT.wholePos -= Math.floor(
            ((store.canvasSize.y / store.zoom) * 6) / 12,
         )
      }),
      gather(<ExpandMoreIcon />, () => {
         posT.wholePos += Math.floor(
            ((store.canvasSize.y / store.zoom) * 6) / 12,
         )
      }),
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
      <div>
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
