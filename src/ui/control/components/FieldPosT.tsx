import * as React from 'react'

import { observer } from 'mobx-react-lite'

import { useStore } from '../../util/useStore'
import { errorCheck } from '../../../util/errorCheck'
import { SelectorInput } from './SelectorInput'

export let FieldPosT = observer(() => {
   let store = useStore()
   let { wholePos } = store.posT

   let validation = (value: string): [boolean, string] => {
      let defaultHelp = 'Elapsed generations (time)'
      if (value === '' + wholePos) {
         return [false, defaultHelp]
      }

      let notAnInteger = () => !value.match(/^-?\d*$/)
      let notPositive = () => !!value.match(/^-/)
      let tooLong = () => value.length > 5

      return errorCheck(
         defaultHelp,
         [notAnInteger, 'Generation must be an integer'],
         [notPositive, 'Generation must be positive'],
         [tooLong, 'Generation must between 0 and 99999'],
      )
   }

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
