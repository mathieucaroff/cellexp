import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import * as React from 'react'
import { useStore } from '../../../util/useContextHook'
import { Xelement } from '../../../util/Xelement'
import { observer } from 'mobx-react-lite'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      sameLine: {
         '& > *': {
            display: 'flex',
            justifyContent: 'center',
         },
      },
   }),
)

/**
 * (1) Small moves + Big move (<) < > (>)
 * (2) Absolute moves << :: >>
 */
export let HorizontalPanning = observer(() => {
   let classes = useStyle()
   let store = useStore()
   let { posS } = store

   let maxLeft = posS.wholePos * posS.microFactor + posS.microPos <= 0
   let maxRight =
      posS.wholePos * posS.microFactor + posS.microPos >=
      posS.microFactor * (store.size - (store.canvasSize.x / store.zoom) * 6)

   let rightBorderFact =
      posS.microFactor * (store.size - (store.canvasSize.x / store.zoom) * 6)
   let leftBorderFact = 0
   let centerFact = Math.floor((rightBorderFact + leftBorderFact) / 2)

   let atLeftBorder =
      posS.wholePos * posS.microFactor + posS.microPos === leftBorderFact
   let atRightBorder =
      posS.wholePos * posS.microFactor + posS.microPos === rightBorderFact
   let atCenter =
      posS.wholePos * posS.microFactor + posS.microPos === centerFact

   interface ButtonInfo {
      content: Xelement
      key: string
      disabled: boolean
      action: () => void
   }

   let toButton = (prop: ButtonInfo) => {
      let { content, action, disabled, key } = prop

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
      return { content, action, disabled, key: key || (content as string) }
   }

   let relativeMoveList = [
      gather('⬵', maxLeft, () => {
         posS.wholePos -= Math.floor((store.canvasSize.x / store.zoom) * 6)
      }),
      gather('<', maxLeft, () => {
         posS.wholePos -= Math.floor(store.canvasSize.x / store.zoom / 2)
      }),
      gather('>', maxRight, () => {
         posS.wholePos += Math.floor(store.canvasSize.x / store.zoom / 2)
      }),
      gather('⤁', maxRight, () => {
         posS.wholePos += Math.floor((store.canvasSize.x / store.zoom) * 6)
      }),
   ]

   let absoluteMoveList = [
      gather('⇤', atLeftBorder, () => {
         posS.wholePos = 0
         posS.microPos = 0
      }),
      gather('|', atCenter, () => {
         posS.wholePos = Math.floor(
            store.size / 2 - ((store.canvasSize.x / store.zoom) * 6) / 2,
         )
      }),
      gather('⇥', atRightBorder, () => {
         posS.microPos = 0
         posS.wholePos =
            store.size - Math.floor((store.canvasSize.x / store.zoom) * 6)
      }),
   ]

   return (
      <div className={classes.sameLine}>
         <div>
            <ButtonGroup size="small">
               {relativeMoveList.map(toButton)}
            </ButtonGroup>
         </div>
         <div>
            <ButtonGroup size="small">
               {absoluteMoveList.map(toButton)}
            </ButtonGroup>
         </div>
      </div>
   )
})
