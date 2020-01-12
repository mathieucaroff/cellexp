import * as React from 'react'

import { observer } from 'mobx-react-lite'

import { useStore } from '../../util/useStore'
import { errorCheck } from '../../../util/errorCheck'
import { SelectorInput } from './SelectorInput'

export let FieldPosS = observer(() => {
   let store = useStore()
   let { size: caWidth } = store
   let { wholePos } = store.posS

   let low = -300
   let high = caWidth - 1

   let validation = (value: string): [boolean, string] => {
      let defaultHelp = 'Spatial Position on the CA'
      if (value === '' + wholePos) {
         return [false, defaultHelp]
      }

      let notAnInteger = () => !value.match(/^-?\d*$/)
      let outOfBound = () => +value < low || +value > high

      return errorCheck(
         defaultHelp,
         [notAnInteger, 'Position must be an integer'],
         [outOfBound, `Position must between ${low} and ${high}`],
      )
   }

   return (
      <SelectorInput
         label="Spatial Pos"
         property={'wholePos'}
         store={store.posS}
         validation={validation}
      />
   )
})
