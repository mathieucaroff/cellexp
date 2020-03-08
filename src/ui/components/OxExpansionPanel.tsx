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

export interface OxExpansionPanelProp {
   defaultExpanded: boolean
   title: string
   content: React.ReactElement | string
}

export let OxExpansionPanel = observer((prop: OxExpansionPanelProp) => {
   let shared = useSharedStyle()

   let { defaultExpanded, title, content } = prop

   let EP = ExpansionPanel
   let EPSm = ExpansionPanelSummary
   let EPDt = ExpansionPanelDetails
   let EMI = ExpandMoreIcon
   return (
      <EP className={shared.panel} defaultExpanded={defaultExpanded}>
         <EPSm expandIcon={<EMI />}>
            <h3 className={shared.noVeritcalMargins}>{title}</h3>
         </EPSm>
         <EPDt className={shared.block}>{content}</EPDt>
      </EP>
   )
})
