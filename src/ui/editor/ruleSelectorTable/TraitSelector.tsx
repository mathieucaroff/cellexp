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

export let TraitSelector = observer(() => {
   let c = useSharedStyle()
   let store = useStore()

   let handleClick = (ev) => {
      store.ruleTrait = ev.target.value
   }

   let labelList = ['all', ...ruleTraitList].map((traitName) => {
      return (
         <FormControlLabel
            key={traitName}
            value={traitName}
            className={c.inlineBlock}
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
