import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
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
import { OxAccordion } from '../components/OxAccordion'

export let Editor = observer(() => {
   let shared = useSharedStyle()
   let store = useStore()

   let EP = Accordion
   let EPSm = AccordionSummary
   let EPDt = AccordionDetails

   return (
      <div>
         <h2>
            Rule Picker <RuleLink rule={store.rule} />
         </h2>
         <EP className={shared.panel} defaultExpanded>
            <EPSm expandIcon={<ExpandMoreIcon />}>
               <h3 className={shared.noVeritcalMargins}>Rule Selection</h3>
            </EPSm>
            <EPDt className={clx(shared.block)}>
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
         <OxAccordion
            title="Rule Table"
            content={<RuleSelectorTable />}
            defaultExpanded={false}
            AccordionDetailsProps={{ className: shared.block }}
         />
      </div>
   )
})
