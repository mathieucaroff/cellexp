import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { errorCheck } from '../../../util/errorCheck'
import { useStore } from '../../util/useStore'
import { SelectorInput } from './SelectorInput'

let validation = (value: string) => {
   let notAnInteger = () => !value.match(/^-?\d*$/)
   let notPositive = () => !!value.match(/^-/)
   let tooLong = () => value.length > 4

   return errorCheck(
      'Simulation width',
      [notAnInteger, 'Size must be an integer'],
      [notPositive, 'Size must be positive'],
      [tooLong, 'Size must between 0 and 9999'],
   )
}

export let CaSizeSelector = observer(() => {
   return (
      <SelectorInput
         label="Size"
         property={'size'}
         store={useStore()}
         validation={validation}
      />
   )
})
