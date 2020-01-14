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
import { useSharedStyle } from '../style'
import { clx } from '../util/clx'
import { useStore } from '../util/useStore'
import { PropertyList } from './components/PropertyList'
import { Rule } from './components/Rule'
import { RuleEditor } from './components/RuleEditor'
import { RuleSelector } from './components/RuleSelector'

export let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      ruleSelection: {
         display: 'block',
      },
   }),
)

export let Editor = observer(() => {
   let classes = useStyle()
   let shared = useSharedStyle()
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
