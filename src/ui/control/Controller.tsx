import * as React from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core'
import {
   ExpansionPanel,
   ExpansionPanelSummary,
   ExpansionPanelDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { useSharedStyle } from '../style'
import { clx } from '../util/clx'

import { CaSizeSelector } from './components/CaSizeSelector'
import { SpeedSelector } from './components/SpeedSelector'
import { CanvasHeight } from './components/CanvasHeight'
import { FieldPosT } from './components/FieldPosT'
import { ResetTime } from './components/ResetTime'
import { ThemeSelector } from './components/ThemeSelector'
import { RerollButton } from './components/RerollButton'
import { PlayPauseButton } from './components/PlayPauseButton'
import { observer } from 'mobx-react-lite'
import { useStore } from '../util/useStore'
import { Rule } from '../editor/components/Rule'
import { SingleStep } from './components/SingleStep'
import { AlignTime } from './components/AlignTime'
import { FieldPrecisePosT } from './components/FieldPrecisePosT'

export let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      inputSizing: {
         '& input': {
            width: '120px',
         },
      },
      inputList: {
         '& > *': {
            margin: theme.spacing(1),
            display: 'inline-block',
         },
      },
   }),
)

export let Controller = observer(() => {
   let shared = useSharedStyle()
   let classes = useStyle()
   let store = useStore()

   let EP = ExpansionPanel
   let EPSm = ExpansionPanelSummary
   let EPDt = ExpansionPanelDetails

   let simulationController = (
      <EP className={shared.panel} elevation={2}>
         <EPSm expandIcon={<ExpandMoreIcon />}>
            <h3 className={shared.noVeritcalMargins}>
               Simulation Controller <Rule rule={store.rule} />
            </h3>
         </EPSm>
         <EPDt className={clx(classes.inputSizing, shared.block)}>
            <div className={shared.inputList}>
               <CaSizeSelector />
               <RerollButton />
            </div>
         </EPDt>
      </EP>
   )

   let displayExtraControls = (
      <EP className={shared.panel} defaultExpanded>
         <EPSm expandIcon={<ExpandMoreIcon />}>
            <h4 className={shared.noVeritcalMargins}>Extra Controls</h4>
         </EPSm>
         <EPDt className={clx(classes.inputSizing, shared.block)}>
            <div className={classes.inputList}>
               <FieldPrecisePosT />
               <AlignTime />
            </div>
         </EPDt>
      </EP>
   )

   let displayController = (
      <EP className={shared.panel} defaultExpanded>
         <EPSm expandIcon={<ExpandMoreIcon />}>
            <h3 className={shared.noVeritcalMargins}>
               Display Controller <Rule rule={store.rule} />
            </h3>
         </EPSm>
         <EPDt className={clx(classes.inputSizing, shared.block)}>
            {displayExtraControls}
            <div className={classes.inputList}>
               <CanvasHeight />
               <ThemeSelector />
            </div>
            <div className={classes.inputList}>
               <SpeedSelector />
               <FieldPosT />
               <ResetTime />
               <PlayPauseButton />
               <SingleStep />
            </div>
         </EPDt>
      </EP>
   )

   return (
      <div>
         <h2>Controllers</h2>
         {simulationController}
         {displayController}
      </div>
   )
})
