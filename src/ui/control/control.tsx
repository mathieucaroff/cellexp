import * as React from 'react'
import { render } from 'react-dom'

import { makeStyles, Theme, createStyles } from '@material-ui/core'
import {
   ExpansionPanel,
   ExpansionPanelSummary,
   ExpansionPanelDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { storeContext, hubContext } from '../../www/global'

import { Store } from '../../state/store'
import { Hub } from '../../state/hub'

import { useStyle } from '../style'
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

let noVeritcalMargins = {
   marginTop: 0,
   marginBottom: 0,
}

export let useLocalStyle = makeStyles((theme: Theme) =>
   createStyles({
      block: {
         display: 'block',
      },
      noPaddingTop: {
         paddingTop: 0,
      },
      noVeritcalMargins,
      verticalSeparator: {
         height: 20,
      },
      panel: {
         '&': {
            backgroundColor: '#F6F6F6',
         },
         '& .Mui-expanded': {
            minHeight: 0,
            ...noVeritcalMargins,
         },
      },
      inputSizing: {
         '& input': {
            width: '120px',
         },
      },
   }),
)

let Controller = observer(() => {
   let common = useStyle()
   let classes = useLocalStyle()
   let store = useStore()

   let EP = ExpansionPanel
   let EPSm = ExpansionPanelSummary
   let EPDt = ExpansionPanelDetails

   let simulationController = (
      <EP className={classes.panel} elevation={2}>
         <EPSm expandIcon={<ExpandMoreIcon />}>
            <h3 className={classes.noVeritcalMargins}>
               Simulation Controller <Rule rule={store.rule} />
            </h3>
         </EPSm>
         <EPDt
            className={clx(
               classes.inputSizing,
               classes.noPaddingTop,
               classes.block,
            )}
         >
            <div className={common.inputList}>
               <CaSizeSelector />
               <RerollButton />
            </div>
         </EPDt>
      </EP>
   )

   let displayController = (
      <EP className={classes.panel} defaultExpanded>
         <EPSm expandIcon={<ExpandMoreIcon />}>
            <h3 className={classes.noVeritcalMargins}>
               Display Controller <Rule rule={store.rule} />
            </h3>
         </EPSm>
         <EPDt
            className={clx(
               classes.inputSizing,
               classes.noPaddingTop,
               classes.block,
            )}
         >
            <div className={common.inputList}>
               <SpeedSelector />
               <FieldPosT />
               <ResetTime />
               <PlayPauseButton />
            </div>
            <div className={common.inputList}>
               <CanvasHeight />
               <ThemeSelector />
            </div>
         </EPDt>
      </EP>
   )

   return (
      <div className={common.ui}>
         <h2>Controllers</h2>
         {simulationController}
         {displayController}
      </div>
   )
})

export let renderController = (
   rootElement: HTMLElement,
   store: Store,
   hub: Hub,
) => {
   let wrappedController = (
      <hubContext.Provider value={hub}>
         <storeContext.Provider value={store}>
            <Controller />
         </storeContext.Provider>
      </hubContext.Provider>
   )

   render(wrappedController, rootElement)
}
