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
import { RuleLink } from '../editor/components/RuleLink'
import { useSharedStyle } from '../style'
import { clx } from '../util/clx'
import { useStore } from '../util/useContextHook'
import { CanvasHeight } from './components/CanvasHeight'
import { CanvasWidth } from './components/CanvasWidth'
import { FieldPosS } from './components/FieldPosS'
import { FieldPosT } from './components/FieldPosT'
import { FieldPrecisePosT } from './components/FieldPrecisePosT'
import { MorePanningControl } from './components/MorePanningControl'
import { PlayPauseButton } from './components/PlayPauseButton'
import { RerollButton } from './components/RerollButton'
import { ResetTime } from './components/ResetTime'
import { SeedSelector } from './components/SeedSelector'
import { SingleStep } from './components/SingleStep'
import { SpeedSelector } from './components/SpeedSelector'
import { WidthSelector } from './components/WidthSelector'
import { ZoomSelector } from './components/ZoomSelector'
import { TopologyController } from './TopologyController'

let useStyle = makeStyles((theme: Theme) =>
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
   let classes = useStyle()
   let shared = useSharedStyle()
   let store = useStore()

   let EP = ExpansionPanel
   let EPSm = ExpansionPanelSummary
   let EPDt = ExpansionPanelDetails

   let simulationController = (
      <EP className={shared.panel} defaultExpanded>
         <EPSm expandIcon={<ExpandMoreIcon />}>
            <h3 className={shared.noVeritcalMargins}>
               Simulation Controller <RuleLink rule={store.rule} />
            </h3>
         </EPSm>
         <EPDt className={clx(shared.block)}>
            <div className={shared.inputList}>
               <TopologyController />
               <WidthSelector />
               <SeedSelector />
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
            </div>
         </EPDt>
      </EP>
   )

   let displayController = (
      <EP className={shared.panel}>
         <EPSm expandIcon={<ExpandMoreIcon />}>
            <h3 className={shared.noVeritcalMargins}>
               Display Controller <RuleLink rule={store.rule} />
            </h3>
         </EPSm>
         <EPDt className={clx(classes.inputSizing, shared.block)}>
            <div className={classes.inputList}>
               <ZoomSelector />
               <CanvasHeight />
               <CanvasWidth />
               <SpeedSelector />
               <MorePanningControl />
            </div>
            <div className={classes.inputList}>
               <FieldPosT />
               <FieldPosS />
               <ResetTime />
               <PlayPauseButton />
               <SingleStep />
            </div>
            {displayExtraControls}
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
