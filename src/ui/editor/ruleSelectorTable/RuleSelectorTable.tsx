import { createStyles, makeStyles, Theme } from '@material-ui/core'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import * as React from 'react'
import { RuleTable } from './RuleTable'
import { TraitSelector } from './TraitSelector'
import { cellWidth } from './RuleCell'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      ruleSelectorTable: {
         display: 'flex',
         flexFlow: 'row',
      },
      small: {
         '&': {
            flexWrap: 'wrap',
         },
         '& > *': {
            maxWidth: 8 * cellWidth,
         },
      },
   }),
)

export let RuleSelectorTable = () => {
   let c = useStyle()

   let smallDevice = useMediaQuery('(max-width: 562px)')
   let className = c.ruleSelectorTable

   if (smallDevice) {
      className += ` ${c.small}`
   }

   return (
      <div className={className}>
         <TraitSelector />
         <RuleTable />
      </div>
   )
}
