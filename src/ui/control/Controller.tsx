import {
   createStyles,
   ExpansionPanel,
   ExpansionPanelDetails,
   ExpansionPanelSummary,
   makeStyles,
   Theme,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { Rule } from '../editor/components/Rule'
import { useSharedStyle } from '../style'
import { clx } from '../util/clx'
import { useStore } from '../util/useStore'
import { AlignTime } from './components/AlignTime'
import { CanvasHeight } from './components/CanvasHeight'
import { CanvasWidth } from './components/CanvasWidth'
import { CaSizeSelector } from './components/CaSizeSelector'
import { FieldPosS } from './components/FieldPosS'
import { FieldPosT } from './components/FieldPosT'
import { FieldPrecisePosT } from './components/FieldPrecisePosT'
import { PlayPauseButton } from './components/PlayPauseButton'
import { RerollButton } from './components/RerollButton'
import { ResetTime } from './components/ResetTime'
import { SingleStep } from './components/SingleStep'
import { SpeedSelector } from './components/SpeedSelector'
import { ZoomSelector } from './components/ZoomSelector'

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
      <EP className={shared.panel} TransitionProps={{ unmountOnExit: true }}>
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
               <ZoomSelector />
               <CanvasHeight />
               <CanvasWidth />
               <SpeedSelector />
            </div>
            <div className={classes.inputList}>
               <FieldPosT />
               <FieldPosS />
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
