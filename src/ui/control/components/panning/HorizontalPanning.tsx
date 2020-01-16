import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import * as React from 'react'
import { useStore, useDisplay } from '../../../util/useContextHook'
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
   let display = useDisplay()

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

   let { info, act } = display

   let relativeMoveList = [
      gather('⬵', info.passingLeftBorder, act.pageLeft),
      gather('<', info.passingLeftBorder, act.goLeft),
      gather('>', info.passingRightBorder, act.goRight),
      gather('⤁', info.passingRightBorder, act.pageRight),
   ]

   let absoluteMoveList = [
      gather('⇤', info.atLeftBorder, act.gotoMaxLeft),
      gather('|', info.atCenter, act.gotoCenter),
      gather('⇥', info.atRightBorder, act.gotoMaxRight),
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
