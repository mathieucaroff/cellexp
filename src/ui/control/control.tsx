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

let noVeritcalMargins = {
   marginTop: 0,
   marginBottom: 0,
}

export let useLocalStyle = makeStyles((theme: Theme) =>
   createStyles({
      ruleSelection: {
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

let Controller = () => {
   let common = useStyle()
   let classes = useLocalStyle()

   let EP = ExpansionPanel
   let EPSm = ExpansionPanelSummary
   let EPDt = ExpansionPanelDetails

   return (
      <EP className={classes.panel} defaultExpanded>
         <EPSm expandIcon={<ExpandMoreIcon />}>
            <h2 className={classes.noVeritcalMargins}>Simulation Controller</h2>
         </EPSm>
         <EPDt
            className={clx(
               classes.inputSizing,
               classes.noPaddingTop,
               common.inputList,
            )}
         >
            <CaSizeSelector />
            <SpeedSelector />
            <CanvasHeight />
            <FieldPosT />
            <ResetTime />
            <ThemeSelector />
            <RerollButton />
            <PlayPauseButton />
         </EPDt>
      </EP>
   )
}

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
