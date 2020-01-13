import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { errorCheck } from '../../../util/errorCheck'
import { useStore } from '../../util/useStore'
import { SelectorInput } from './SelectorInput'

export let FieldPosS = observer(() => {
   let store = useStore()

   let validation = (value: string): [boolean, string] => {
      let { wholePos } = store.posS

      let low = -4
      let high = store.size - (store.canvasSize.x / store.zoom) * 6 + 4

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
