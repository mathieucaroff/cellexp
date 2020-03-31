import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { RuleBox } from '../editor/components/RuleBox'
import { RerollButton } from './components/RerollButton'
import { CropSimulation } from './components/CropSimulation'
import { AutoSize } from './components/AutoSize'
import { SimpleGenesisSelect } from './components/SimpleGenesisiSelect'
import { Outline } from '../components/Outline'
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
            justifyContent: 'center',
         },
      },
      withMargin: {
         '& > *': {
            marginRight: theme.spacing(1),
         },
      },
      balancerDiv: {
         width: '480px',
      },
      inlineFlex: {
         display: 'inline-flex',
      },
      moveUp: {
         marginTop: '-20px',
      },
   }),
)

export let DisplayHeader = observer(() => {
   let c = useStyle()
   return (
      <div>
         <div className={c.header}>
            <div className={c.balancerDiv}></div>
            <div className={c.withMargin}>
               <RuleBox />
            </div>
            <div className={c.withMargin}>
               <div className={c.moveUp}>
                  <Outline label="Genesis">
                     <span className={clx(c.withMargin, c.inlineFlex)}>
                        <SimpleGenesisSelect />
                        <RerollButton />
                     </span>
                  </Outline>
               </div>
               <AutoSize />
               <CropSimulation />
            </div>
         </div>
      </div>
   )
})
