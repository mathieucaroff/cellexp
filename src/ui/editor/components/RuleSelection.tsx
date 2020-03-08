import { createStyles, makeStyles, Theme } from '@material-ui/core'
import * as React from 'react'
import { OxTable } from '../../components/OxTable'
import { clx } from '../../util/clx'
import { RuleLink } from './RuleLink'
import { createElementaryRule } from '../../../compute/Rule'
import { useSharedStyle } from '../../style'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      spacerRight: {
         marginRight: '2em',
      },
   }),
)

/**
 * RuleSelector / InterestingRuleList / Rule Picker
 */
export let RuleSelection = () => {
   let classes = useStyle()
   let s = useSharedStyle()

   let rr = (...ruleList) => {
      let r = createElementaryRule
      let joinedList = ([] as any[])
         .concat(
            ...ruleList.map((n, k) => [' ', <RuleLink key={k} rule={r(n)} />]),
         )
         .slice(1)
      return React.createElement(React.Fragment, null, ...joinedList)
   }

   return (
      <>
         <div className={clx(s.inlineBlock, classes.spacerRight)}>
            <OxTable
               tableHead={[['Description'], ['Rules']]}
               tableData={[
                  ['Famous', rr(110, 30, 90)],
                  ['Turing Complete', rr(110)],
                  ['Class 4', rr(54, 106, 110)],
                  ["Author's favorite", rr(73, 26, 105)],
               ]}
            />
         </div>
         <div className={s.inlineBlock}>
            <OxTable
               tableHead={[['Description'], ['Rules']]}
               tableData={[
                  ['XOR', rr(60, 90, 105, 150)],
                  ['Twinkling', rr(41, 45, 62, 73, 105, 94, 15, 51)],
                  ['Triangle', rr(18, 22, 26, 30, 122, 126)],
                  ['Primitives', rr(0, 255, 204, 51, 170, 240)],
               ]}
            />
         </div>
      </>
   )
}
