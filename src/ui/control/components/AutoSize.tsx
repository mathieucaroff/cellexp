import { Button, Tooltip } from '@material-ui/core'
import AspectRatioIcon from '@material-ui/icons/AspectRatio'
import * as React from 'react'
import { canvasSizeAdvice } from '../../../display/canvasSizeAdvice'
import { useStore } from '../../util/useContextHook'
import { Theme, makeStyles, createStyles } from '@material-ui/core'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      button: {
         fontSize: '18px',
      },
   }),
)

export let AutoSize = () => {
   let c = useStyle()
   let store = useStore()

   let handleClick = () => {
      let advice = canvasSizeAdvice(window)
      store.canvasSize.x = advice.x
      store.canvasSize.y = advice.y
   }

   return (
      <div>
         <Tooltip title="Fit view to window">
            <Button
               className={c.button}
               variant="outlined"
               onClick={handleClick}
            >
               <AspectRatioIcon />
            </Button>
         </Tooltip>
      </div>
   )
}
