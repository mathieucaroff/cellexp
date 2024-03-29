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
import { useMediaQuery } from '@material-ui/core'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      header: {
         '&': {
            display: 'flex',
            marginTop: '10px',
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
         width: '340px',
      },
      inlineFlex: {
         display: 'inline-flex',
      },
      moveUp: {
         marginTop: '-30px',
      },
      small: {
         '&': {
            display: 'initial',
         },
         '& > *': {
            marginBottom: '15px',
         },
      },
   }),
)

export let DisplayHeader = observer(() => {
   let c = useStyle()

   let smallDevice = useMediaQuery('(max-width: 780px)')

   let className = c.header

   if (smallDevice) {
      className += ` ${c.small}`
   }

   return (
      <div>
         <div className={className}>
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
