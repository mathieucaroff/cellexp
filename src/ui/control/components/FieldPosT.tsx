import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { errorCheck } from '../../../util/errorCheck'
import { useStore } from '../../util/useStore'
import { SelectorInput } from './SelectorInput'

export let FieldPosT = observer(() => {
   let store = useStore()

   let validation = (value: string): [boolean, string] => {
      let { wholePos } = store.posT

      let low = 0
      let high = 99999

      let defaultHelp = 'Elapsed generations (time)'
      if (value === '' + wholePos) {
         return [false, defaultHelp]
      }

      let notAnInteger = () => !value.match(/^-?\d*$/)
      let outOfBound = () => +value < low || +value > high

      return errorCheck(
         defaultHelp,
         [notAnInteger, 'Generation must be an integer'],
         [outOfBound, `Generation must between ${low} and ${high}`],
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
