import Button from '@material-ui/core/Button'
import * as React from 'react'
import { useStore } from '../../util/useContextHook'
import { Theme, makeStyles, createStyles } from '@material-ui/core'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      button: {
         fontSize: '18px',
      },
   }),
)

export let RerollButton = () => {
   let c = useStyle()
   let store = useStore()

   let handleClick = () => {
      store.posT.totalPos = 0
      store.seed = Math.random()
         .toString(36)
         .slice(2)
         .toUpperCase()
   }

   return (
      <div>
         <Button className={c.button} variant="outlined" onClick={handleClick}>
            🎲
         </Button>
      </div>
   )
}
