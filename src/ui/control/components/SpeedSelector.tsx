import * as React from 'react'

import { observer } from 'mobx-react-lite'

import { useStore } from '../../util/useStore'
import { errorCheck } from '../../../util/errorCheck'
import { SelectorInput } from './SelectorInput'

let validation = (value: string) => {
   let notAnInteger = () => !value.match(/^-?\d*$/)
   let notPositive = () => !!value.match(/^-/)
   let tooLong = () => value.length > 2

   return errorCheck(
      'Display run speed',
      [notAnInteger, 'Speed must be an integer'],
      [notPositive, 'Speed must be positive'],
      [tooLong, 'Speed must between 0 and 99'],
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
