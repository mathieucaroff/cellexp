import * as React from 'react'

import { action, reaction, observable } from 'mobx'
import { observer } from 'mobx-react-lite'

import { useStore } from '../../util/useStore'
import { SlowTextField } from '../../components/SlowTextField'
import { errorCheck } from '../../../util/errorCheck'
import { toBase, fromBase } from '../../../util/baseConverter'

export interface BasenumRuleSelectorProp {
   base: number
}

export let BasenumRuleSelector = observer((prop: BasenumRuleSelectorProp) => {
   let store = useStore()
   let { base } = prop
   if (~~base !== base || !(base >= 2)) {
      throw new Error(`base must be an integer and at least 2, not (${base})`)
   }

   let xx255 = toBase(255, base)

   let local = observable({
      get slowValue() {
         let param = {
            ...(base !== 10 ? { size: 255 } : {}),
            prefix: true,
         }
         return toBase(store.rule, base, param)
      },
   })

   let [value, setValue] = React.useState<string>(local.slowValue)

   // Subscribe to changes to store.rule
   reaction(
      () => store.rule,
      () => setValue(local.slowValue),
   )

   let conversion = fromBase(value, base)
   let conversionErrMessage = ''
   let convertedValue: number
   if (conversion.error) {
      let { info: { message = 'is invalid' } = {} } = conversion
      conversionErrMessage = message
   } else {
      convertedValue = conversion.result
   }

   let invalidNumbaseInteger = () => conversion.error
   let outOfBoundary = () => convertedValue > 255

   let [error, help] = errorCheck(
      `Rule number in base ${base}`,
      [invalidNumbaseInteger, `The rule number ${conversionErrMessage}`],
      [outOfBoundary, `The rule number must be between 0 and ${xx255}`],
   )

   return (
      <SlowTextField
         label="Rule"
         slowValue={local.slowValue}
         fastValue={value}
         error={error}
         helperText={help}
         onChange={(v) => setValue(v.trim())}
         onSubmit={action(() => {
            store.rule = convertedValue
         })}
      />
   )
})
