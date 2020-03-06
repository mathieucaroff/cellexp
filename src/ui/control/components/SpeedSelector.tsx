import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { errorCheck } from '../../../util/errorCheck'
import { useStore } from '../../util/useContextHook'
import { SelectorInput } from '../../components/SelectorInput'

let validation = (value: string) => {
   let high = 256

   let notAnInteger = () => !value.match(/^-?\d*$/)
   let notPositive = () => !!value.match(/^-/)
   let outOfRange = () => +value < 1 || +value > high

   return errorCheck(
      'Display run speed',
      [notAnInteger, 'Speed must be an integer'],
      [notPositive, 'Speed must be positive'],
      [outOfRange, `Speed must between 1 and ${high}`],
   )
}

export let SpeedSelector = observer(() => {
   return (
      <SelectorInput
         label="Speed"
         property={'speed'}
         store={useStore()}
         validation={validation}
      />
   )
})
