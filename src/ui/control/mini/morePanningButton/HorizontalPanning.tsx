import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import * as React from 'react'
import { useDisplay } from '../../../util/useContextHook'
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

   let { info, act } = display

   let relativeMoveList = [
      toButton('⬵', info.passingLeftBorder, act.pageLeft),
      toButton('<', info.passingLeftBorder, act.goLeft),
      toButton('>', info.passingRightBorder, act.goRight),
      toButton('⤁', info.passingRightBorder, act.pageRight),
   ]

   let absoluteMoveList = [
      toButton('⇤', info.atLeftBorder, act.gotoMaxLeft),
      toButton('|', info.atCenter, act.gotoCenter),
      toButton('⇥', info.atRightBorder, act.gotoMaxRight),
   ]

   return (
      <div className={classes.sameLine}>
         <div>
            <ButtonGroup size="small">{relativeMoveList}</ButtonGroup>
         </div>
         <div>
            <ButtonGroup size="small">{absoluteMoveList}</ButtonGroup>
         </div>
      </div>
   )
})
