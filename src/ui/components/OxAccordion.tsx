import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   AccordionProps,
   AccordionDetailsProps,
} from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useSharedStyle } from '../style'
import { clx } from '../util/clx'

export interface OxAccordionProp {
   content: React.ReactElement | string
   defaultExpanded: boolean
   title: string | (React.ReactElement | string)[]
   children?: React.ReactElement | React.ReactElement[]
   className?: string
   contentDisplayBlock?: boolean
   titleTagName?: string
   AccordionProps?: AccordionProps
   AccordionDetailsProps?: AccordionDetailsProps
}

export let OxAccordion = observer((prop: OxAccordionProp) => {
   let shared = useSharedStyle()

   let { defaultExpanded, title, content } = prop

   if (typeof title === 'string') {
      title = [title]
   }
   let titleFragment = React.createElement(React.Fragment, null, ...title)

   let {
      className = '',
      titleTagName = 'h3',
      AccordionProps: EPProp = {},
      AccordionDetailsProps: EPDProp = {},
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

   let EP = Accordion
   let EPSm = AccordionSummary
   let EPDt = AccordionDetails
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
