import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { RuleBox } from '../editor/components/RuleBox'
import { RerollButton } from './components/RerollButton'
import { ResetSimulationButton } from './components/ResetSimulationButton'
import { CropSimulation } from './components/CropSimulation'
import { AutoSize } from './components/AutoSize'

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
      withMargin: {
         '& > *': {
            marginRight: theme.spacing(1),
         },
      },
      balancerDiv: {
         width: '180px',
      },
   }),
)

export let DisplayHeader = observer(() => {
   let c = useStyle()
   return (
      <div>
         <div className={c.header}>
            <div className={c.balancerDiv}></div>
            <div>
               <RuleBox />
            </div>
            <div className={c.withMargin}>
               <RerollButton />
               <ResetSimulationButton />
               <AutoSize />
               <CropSimulation />
            </div>
         </div>
      </div>
   )
})
