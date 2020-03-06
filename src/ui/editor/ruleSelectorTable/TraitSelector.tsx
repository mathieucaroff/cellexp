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

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      inlineblock: {
         display: 'inline-block',
         width: '300px',
      },
   }),
)

export let TraitSelector = observer(() => {
   let c = useStyle()
   let store = useStore()

   let handleClick = (ev) => {
      store.ruleTrait = ev.target.value
   }

   let labelList = ['all', ...ruleTraitList].map((traitName) => {
      return (
         <FormControlLabel
            key={traitName}
            value={traitName}
            className={c.inlineblock}
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
