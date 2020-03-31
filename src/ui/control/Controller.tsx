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
import { GoToTop } from './components/GoToTop'
import { SeedSelector } from './components/SeedSelector'
import { SingleStep } from './components/SingleStep'
import { SpeedSelector } from './components/SpeedSelector'
import { WidthSelector } from './components/WidthSelector'
import { ZoomSelector } from './components/ZoomSelector'
import { TopologyController } from './components/TopologyController'
import { OxExpansionPanel } from '../components/OxExpansionPanel'

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
      <OxExpansionPanel
         title={['Simulation Controller', <RuleLink rule={store.rule} />]}
         defaultExpanded={true}
         contentDisplayBlock={true}
         content={
            <div className={shared.inputList}>
               <TopologyController />
               <WidthSelector />
               <SeedSelector />
               <RerollButton />
            </div>
         }
      />
   )

   let displayExtraControls = (
      <OxExpansionPanel
         title="Extra Controls"
         titleTagName="h4"
         defaultExpanded={false}
         contentDisplayBlock={true}
         ExpansionPanelProps={{ TransitionProps: { unmountOnExit: true } }}
         ExpansionPanelDetailsProps={{ className: classes.inputSizing }}
         content={
            <div className={classes.inputList}>
               <FieldPrecisePosT />
            </div>
         }
      />
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
               <GoToTop />
               <PlayPauseButton />
               <SingleStep />
            </div>
            {displayExtraControls}
         </EPDt>
      </EP>
   )

   let displayControllers = (
      <OxExpansionPanel
         title={['Display Controller', <RuleLink rule={store.rule} />]}
         defaultExpanded={false}
         contentDisplayBlock={true}
         ExpansionPanelDetailsProps={{ className: classes.inputSizing }}
         content=""
      >
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
            <GoToTop />
            <PlayPauseButton />
            <SingleStep />
         </div>
         {displayExtraControls}
      </OxExpansionPanel>
   )

   return (
      <div>
         <h2>Controllers</h2>
         {simulationController}
         {displayControllers}
      </div>
   )
})
