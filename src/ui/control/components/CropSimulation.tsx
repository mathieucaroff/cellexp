import { Button, Tooltip } from '@material-ui/core'
import CropIcon from '@material-ui/icons/Crop'
import * as React from 'react'
import { useStore, useDisplay } from '../../util/useContextHook'
import { Theme, makeStyles, createStyles } from '@material-ui/core'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      button: {
         fontSize: '18px',
      },
   }),
)

export let CropSimulation = () => {
   let c = useStyle()
   let store = useStore()
   let display = useDisplay()

   let handleClick = () => {
      store.topology.width = Math.ceil((store.canvasSize.x * 6) / store.zoom)
      display.act.gotoCenter()
   }

   return (
      <div>
         <Tooltip title="Fit simulation to view">
            <Button
               className={c.button}
               variant="outlined"
               onClick={handleClick}
            >
               <CropIcon />
            </Button>
         </Tooltip>
      </div>
   )
}
