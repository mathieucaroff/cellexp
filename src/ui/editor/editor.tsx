import * as React from 'react'
import { render } from 'react-dom'

import { makeStyles, Theme, createStyles } from '@material-ui/core'

import {
   ExpansionPanel,
   ExpansionPanelSummary,
   ExpansionPanelDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { storeContext } from '../../www/global'

import { Store } from '../../state/store'
import { Hub } from '../../state/hub'

import { useStyle } from '../style'
import { RuleSelector } from './components/RuleSelector'
import { PropertyList } from './components/PropertyList'
import { InterestingRuleList } from './components/InterestingRuleList'
import { clx } from '../util/clx'
import { observer } from 'mobx-react-lite'
import { useStore } from '../util/useStore'
import { Rule } from './components/Rule'

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
         '&': {
            backgroundColor: '#F6F6F6',
         },
         '& .Mui-expanded': {
            minHeight: 0,
            ...noVeritcalMargins,
         },
      },
   }),
)

let Editor = observer(() => {
   let store = useStore()
   let common = useStyle()
   let classes = useLocalStyle()

   let EP = ExpansionPanel
   let EPSm = ExpansionPanelSummary
   let EPDt = ExpansionPanelDetails

   return (
      <div className={common.ui}>
         <h2>
            Rule Picker <Rule rule={store.rule} />
         </h2>
         <EP className={classes.panel}>
            <EPSm expandIcon={<ExpandMoreIcon />}>
               <h3 className={classes.noVeritcalMargins}>Rule Editor</h3>
            </EPSm>
            <EPDt className={classes.noPaddingTop}>
               <div className={common.inputList}>
                  <RuleSelector />
               </div>
            </EPDt>
         </EP>
         <EP className={classes.panel} defaultExpanded>
            <EPSm expandIcon={<ExpandMoreIcon />}>
               <h3 className={classes.noVeritcalMargins}>Rule Selector</h3>
            </EPSm>
            <EPDt className={clx(classes.ruleSelection, classes.noPaddingTop)}>
               <InterestingRuleList />
            </EPDt>
         </EP>
         <EP className={classes.panel}>
            <EPSm expandIcon={<ExpandMoreIcon />}>
               <h3 className={classes.noVeritcalMargins}>Property List</h3>
            </EPSm>
            <EPDt className={classes.noPaddingTop}>
               <PropertyList />
            </EPDt>
         </EP>
      </div>
   )
})

export let renderEditor = (
   rootElement: HTMLElement,
   store: Store,
   hub: Hub,
) => {
   render(
      <storeContext.Provider value={store}>
         <Editor />
      </storeContext.Provider>,
      rootElement,
   )
}
