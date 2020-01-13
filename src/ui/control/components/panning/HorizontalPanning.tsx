import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import * as React from 'react'
import { useStore } from '../../../util/useStore'
import { Xelement } from '../../../util/Xelement'

/**
 * (1) Small moves + Big move (<) < > (>)
 * (2) Absolute moves << :: >>
 */
export let HorizontalPanning = () => {
   let store = useStore()
   let { posS } = store

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

   let relativeMoveList = [
      gather('(<)', () => {
         posS.wholePos -= Math.floor((store.canvasSize.x / store.zoom) * 6)
      }),
      gather('<', () => {
         posS.wholePos -= Math.floor(store.canvasSize.x / store.zoom / 2)
      }),
      gather('>', () => {
         posS.wholePos += Math.floor(store.canvasSize.x / store.zoom / 2)
      }),
      gather('(>)', () => {
         posS.wholePos += Math.floor((store.canvasSize.x / store.zoom) * 6)
      }),
   ]

   let absoluteMoveList = [
      gather('<<', () => {
         posS.wholePos = 0
         posS.microPos = 0
      }),
      gather('::', () => {
         posS.wholePos = Math.floor(
            store.size / 2 - ((store.canvasSize.x / store.zoom) * 6) / 2,
         )
      }),
      gather('>>', () => {
         posS.wholePos =
            store.size - Math.floor((store.canvasSize.x / store.zoom) * 6)
      }),
   ]

   return (
      <div>
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
}
