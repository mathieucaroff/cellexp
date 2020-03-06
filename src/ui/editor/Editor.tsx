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
import { useStore } from '../util/useContextHook'
import { PropertyList } from './components/PropertyList'
import { RuleEditor } from './components/RuleEditor'
import { RuleLink } from './components/RuleLink'
import { RuleSelection } from './components/RuleSelection'
import { RuleSelectorTable } from './ruleSelectorTable/RuleSelectorTable'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      displayBlock: {
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
            Rule Picker <RuleLink rule={store.rule} />
         </h2>
         <EP className={shared.panel} defaultExpanded>
            <EPSm expandIcon={<ExpandMoreIcon />}>
               <h3 className={shared.noVeritcalMargins}>Rule Table</h3>
            </EPSm>
            <EPDt className={clx(classes.displayBlock)}>
               <RuleSelectorTable />
            </EPDt>
         </EP>
         <EP className={shared.panel} defaultExpanded>
            <EPSm expandIcon={<ExpandMoreIcon />}>
               <h3 className={shared.noVeritcalMargins}>Old Rule Selection</h3>
            </EPSm>
            <EPDt className={clx(classes.displayBlock)}>
               <RuleSelection />
            </EPDt>
         </EP>
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
