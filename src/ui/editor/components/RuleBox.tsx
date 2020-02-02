import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { observer, useLocalStore } from 'mobx-react-lite'
import * as React from 'react'
import { useStore } from '../../util/useContextHook'
import { errorCheck } from '../../../util/errorCheck'
import { SlowTextField } from '../../components/SlowTextField'
import { action } from 'mobx'
import { useReaction } from '../../util/useReaction'

let useStyle = makeStyles((theme: Theme) => {
   return createStyles({
      textField: {
         marginLeft: '1em',
         width: '4em',
      },
   })
})

export let RuleBox = observer(() => {
   let store = useStore()
   let classes = useStyle()

   let local = useLocalStore(() => ({
      slowValue: '' + store.rule.number,
      value: '' + store.rule.number,
   }))

   // Subscribe to changes of store.rule, to reset the value
   useReaction(
      () => store.rule.number,
      (number) => {
         local.slowValue = '' + number
         local.value = '' + number
      },
   )

   let convertedValue = parseInt(local.value)

   let invalidNumbaseInteger = () => local.value !== '' + convertedValue
   let outOfBoundary = () => convertedValue < 0 || convertedValue > 255

   let [error, help] = errorCheck(
      '',
      [invalidNumbaseInteger, `The rule number is invalid`],
      [outOfBoundary, `The rule number must be between 0 and 255`],
   )

   return (
      <SlowTextField
         label="Rule"
         slowValue={local.slowValue}
         fastValue={local.value}
         error={error}
         helperText={help}
         onChange={(v) => {
            local.value = v.trim()
         }}
         onSubmit={action(() => {
            store.rule.number = convertedValue
         })}
         className={classes.textField}
         inline={true}
      />
   )
})
