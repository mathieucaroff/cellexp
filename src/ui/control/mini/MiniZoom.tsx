import { createStyles, makeStyles, Theme } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import { Xelement } from '../../util/Xelement'
import { useDisplay, useStore } from '../../util/useContextHook'

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
export let MiniZoom = observer(() => {
   let classes = useStyle()
   let display = useDisplay()
   let store = useStore()

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
      toButton('+', store.zoom === 300, () => (store.zoom += 6)),
      toButton('-', store.zoom === 6, () => (store.zoom -= 6)),
   ]

   return (
      <div className={classes.buttonContainer}>
         <ButtonGroup orientation="vertical" size="small">
            {relativeSmallMoveList}
         </ButtonGroup>
      </div>
   )
})
