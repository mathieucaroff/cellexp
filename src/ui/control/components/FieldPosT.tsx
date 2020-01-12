import * as React from 'react'

import { observer } from 'mobx-react-lite'

import { useStore } from '../../util/useStore'
import { errorCheck } from '../../../util/errorCheck'
import { SelectorInput } from './SelectorInput'

let validation = (value: string) => {
   let notAnInteger = () => !value.match(/^-?\d*$/)
   let notPositive = () => !!value.match(/^-/)
   let tooLong = () => value.length > 4

   return errorCheck(
      'Elapsed generations (time)',
      [notAnInteger, 'Generation must be an integer'],
      [notPositive, 'Generation must be positive'],
      [tooLong, 'Generation must between 0 and 9999'],
   )
}

export let FieldPosT = observer(() => {
   let store = useStore()

   return (
      <SelectorInput
         label="Generation"
         property={'wholePos'}
         disabled={store.play === true}
         store={store.posT}
         validation={validation}
      />
   )
})
