import {
   createStyles,
   FormControlLabel,
   makeStyles,
   Radio,
   RadioGroup,
   Theme,
} from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { ruleTraitList } from '../../../data/ruleTraitType'
import { useStore } from '../../util/useContextHook'
import { useSharedStyle } from '../../style'
import { clx } from '../../util/clx'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      selector: {
         width: '250px',
      },
   }),
)

export let TraitSelector = observer(() => {
   let c = useStyle()
   let s = useSharedStyle()
   let store = useStore()

   let handleClick = (ev) => {
      store.ruleTrait = ev.target.value
   }

   let labelList = ['all', ...ruleTraitList].map((traitName) => {
      return (
         <FormControlLabel
            key={traitName}
            value={traitName}
            className={clx(c.selector, s.inlineBlock)}
            control={<Radio color="primary" />}
            label={traitName}
         />
      )
   })

   return (
      <RadioGroup onChange={handleClick} value={store.ruleTrait}>
         {labelList}
      </RadioGroup>
   )
})
