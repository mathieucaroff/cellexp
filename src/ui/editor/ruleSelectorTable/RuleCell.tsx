import { ButtonBase, createStyles, makeStyles, Theme } from '@material-ui/core'
import * as React from 'react'
import { useStore } from '../../util/useContextHook'
import { RuleTrait } from '../../../data/ruleTraitType'

export let cellWidth = 35
export let cellBorder = 1
export let cellMargin = 3
let innerCellWidth = cellWidth - cellMargin

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      cell: {
         marginRight: cellMargin,
         borderWidth: cellBorder,
         borderStyle: 'solid',
         borderColor: theme.palette.text.disabled,
         color: theme.palette.text.disabled,
         width: innerCellWidth,
      },
      activated: {
         borderColor: theme.palette.primary.main,
         color: theme.palette.primary.main,
      },
   }),
)

export interface RuleCellProp {
   number: number
   info: RuleTrait[]
   activated?: true
}

export let RuleCell = (prop: RuleCellProp) => {
   let c = useStyle()
   let store = useStore()

   let ccc: string[] = [c.cell, 'cell']
   if (prop.activated) {
      ccc.push(c.activated)
   }
   ccc.push(...prop.info.map((trait) => `tt-${trait}`))

   let handleClick = () => {
      store.rule.number = prop.number
   }

   return (
      <ButtonBase className={ccc.join(' ')} onClick={handleClick}>
         {prop.number}
      </ButtonBase>
   )
}
