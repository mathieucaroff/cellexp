import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { OxExpansionPanel } from '../components/OxExpansionPanel'
import { RuleLink } from '../editor/components/RuleLink'
import { useSharedStyle } from '../style'
import { useStore } from '../util/useContextHook'
import { CanvasHeight } from './components/CanvasHeight'
import { CanvasWidth } from './components/CanvasWidth'
import { FieldPosS } from './components/FieldPosS'
import { FieldPosT } from './components/FieldPosT'
import { FieldPrecisePosT } from './components/FieldPrecisePosT'
import { GoToTop } from './components/GoToTop'
import { MorePanningControl } from './components/MorePanningControl'
import { RerollButton } from './components/RerollButton'
import { SeedSelector } from './components/SeedSelector'
import { SpeedSelector } from './components/SpeedSelector'
import { BorderFieldList } from './components/BorderFieldList'
import { TopologySelect } from './components/TopologySelect'
import { WidthSelector } from './components/WidthSelector'
import { ZoomSelector } from './components/ZoomSelector'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      inputSizing: {
         '& input': {
            width: '120px',
         },
      },
      inputList: {
         '&': {
            display: 'inline',
         },
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

   let simulationController = (
      <OxExpansionPanel
         title={['Simulation Controller', <RuleLink rule={store.rule} />]}
         defaultExpanded={true}
         contentDisplayBlock={true}
         content={
            <div className={shared.inputList}>
               <TopologySelect />
               <WidthSelector />
               <BorderFieldList />
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
         </div>
         {displayExtraControls}
      </OxExpansionPanel>
   )

   return (
      <div>
         <h2>Controllers</h2>
         {simulationController}
         {displayController}
      </div>
   )
})
