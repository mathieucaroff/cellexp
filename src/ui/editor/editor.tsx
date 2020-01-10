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

import { useSharedStyle } from '../style'
import { RuleSelector } from './components/RuleSelector'
import { PropertyList } from './components/PropertyList'
import { InterestingRuleList } from './components/InterestingRuleList'
import { clx } from '../util/clx'
import { observer } from 'mobx-react-lite'
import { useStore } from '../util/useStore'
import { Rule } from './components/Rule'

export let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      ruleSelection: {
         display: 'block',
      },
   }),
)

let Editor = observer(() => {
   let shared = useSharedStyle()
   let classes = useStyle()
   let store = useStore()

   let EP = ExpansionPanel
   let EPSm = ExpansionPanelSummary
   let EPDt = ExpansionPanelDetails

   return (
      <div className={shared.ui}>
         <h2>
            Rule Picker <Rule rule={store.rule} />
         </h2>
         <EP className={shared.panel}>
            <EPSm expandIcon={<ExpandMoreIcon />}>
               <h3 className={shared.noVeritcalMargins}>Rule Editor</h3>
            </EPSm>
            <EPDt className={shared.noPaddingTop}>
               <div className={shared.inputList}>
                  <RuleSelector />
               </div>
            </EPDt>
         </EP>
         <EP className={shared.panel} defaultExpanded>
            <EPSm expandIcon={<ExpandMoreIcon />}>
               <h3 className={shared.noVeritcalMargins}>Rule Selector</h3>
            </EPSm>
            <EPDt className={clx(classes.ruleSelection, shared.noPaddingTop)}>
               <InterestingRuleList />
            </EPDt>
         </EP>
         <EP className={shared.panel}>
            <EPSm expandIcon={<ExpandMoreIcon />}>
               <h3 className={shared.noVeritcalMargins}>Property List</h3>
            </EPSm>
            <EPDt className={shared.noPaddingTop}>
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
