import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { RuleBox } from '../editor/components/RuleBox'
import { RerollButton } from './components/RerollButton'
import { ResetButton } from './components/ResetButton'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { clx } from '../util/clx'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      header: {
         '&': {
            display: 'flex',
         },
         '& > *': {
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'row',
         },
      },
   }),
)

export let DisplayHeader = observer(() => {
   let classes = useStyle()
   return (
      <div>
         <div className={classes.header}>
            <div style={{ width: '180px' }}></div>
            <div>
               <RuleBox />
            </div>
            <div>
               <RerollButton />
               <ResetButton />
            </div>
         </div>
      </div>
   )
})
