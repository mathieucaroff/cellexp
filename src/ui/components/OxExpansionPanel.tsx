import {
   ExpansionPanel,
   ExpansionPanelDetails,
   ExpansionPanelSummary,
   ExpansionPanelProps,
   ExpansionPanelDetailsProps,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useSharedStyle } from '../style'
import { clx } from '../util/clx'

export interface OxExpansionPanelProp {
   content: React.ReactElement | string
   defaultExpanded: boolean
   title: string | (React.ReactElement | string)[]
   children?: React.ReactElement | React.ReactElement[]
   className?: string
   contentDisplayBlock?: boolean
   titleTagName?: string
   ExpansionPanelProps?: ExpansionPanelProps
   ExpansionPanelDetailsProps?: ExpansionPanelDetailsProps
}

export let OxExpansionPanel = observer((prop: OxExpansionPanelProp) => {
   let shared = useSharedStyle()

   let { defaultExpanded, title, content } = prop

   if (typeof title === 'string') {
      title = [title]
   }
   let titleFragment = React.createElement(React.Fragment, null, ...title)

   let {
      className = '',
      titleTagName = 'h3',
      ExpansionPanelProps: EPProp = {},
      ExpansionPanelDetailsProps: EPDProp = {},
      children = '',
   } = prop

   EPProp.defaultExpanded = defaultExpanded
   EPProp = {
      className: clx(shared.panel, className, EPProp.className || ''),
      ...EPProp,
   }

   if (prop.contentDisplayBlock) {
      EPDProp = {
         className: clx(shared.block, EPDProp.className || ''),
         ...EPDProp,
      }
   }

   let EP = ExpansionPanel
   let EPSm = ExpansionPanelSummary
   let EPDt = ExpansionPanelDetails
   let EMI = ExpandMoreIcon
   let HX: any = titleTagName
   return (
      <EP {...EPProp}>
         <EPSm expandIcon={<EMI />}>
            <HX className={shared.noVeritcalMargins}>{titleFragment}</HX>
         </EPSm>
         <EPDt {...EPDProp}>
            {content}
            {children}
         </EPDt>
      </EP>
   )
})
