import * as React from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core'

import {
   ExpansionPanel,
   ExpansionPanelSummary,
   ExpansionPanelDetails,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { useSharedStyle } from '../style'
import { RuleEditor } from './components/RuleEditor'
import { PropertyList } from './components/PropertyList'
import { RuleSelector } from './components/RuleSelector'
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

export let Editor = observer(() => {
   let shared = useSharedStyle()
   let classes = useStyle()
   let store = useStore()

   let EP = ExpansionPanel
   let EPSm = ExpansionPanelSummary
   let EPDt = ExpansionPanelDetails

   return (
      <div>
         <h2>
            Rule Picker <Rule rule={store.rule} />
         </h2>
         <EP className={shared.panel}>
            <EPSm expandIcon={<ExpandMoreIcon />}>
               <h3 className={shared.noVeritcalMargins}>Rule Editor</h3>
            </EPSm>
            <EPDt>
               <div className={shared.inputList}>
                  <RuleEditor />
               </div>
            </EPDt>
         </EP>
         <EP className={shared.panel} defaultExpanded>
            <EPSm expandIcon={<ExpandMoreIcon />}>
               <h3 className={shared.noVeritcalMargins}>Rule Picker</h3>
            </EPSm>
            <EPDt className={clx(classes.ruleSelection)}>
               <RuleSelector />
            </EPDt>
         </EP>
         <EP className={shared.panel}>
            <EPSm expandIcon={<ExpandMoreIcon />}>
               <h3 className={shared.noVeritcalMargins}>Property List</h3>
            </EPSm>
            <EPDt>
               <PropertyList />
            </EPDt>
         </EP>
      </div>
   )
})
