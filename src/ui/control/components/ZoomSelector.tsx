import * as React from 'react'

import { observer } from 'mobx-react-lite'

import { useStore } from '../../util/useStore'
import { errorCheck } from '../../../util/errorCheck'
import { SelectorInput } from './SelectorInput'
import { clip } from '../../../util/clip'

let lowBound = 6
let highBound = 300

let validation = (value: string) => {
   let notAnInteger = () => !value.match(/^-?\d*$/)
   let outOfRange = () => +value < 6 || +value > 300
   let badMultiplicity = () => +value % 6 !== 0

   return errorCheck(
      'Display Zoom',
      [notAnInteger, 'Zoom must be an integer'],
      [outOfRange, 'Zoom must between 6 and 300'],
      [badMultiplicity, 'Zoom must a multiple of 6'],
   )
}

export let ZoomSelector = observer(() => {
   return (
      <SelectorInput
         label="Zoom"
         property={'zoom'}
         store={useStore()}
         type="number"
         validation={validation}
         doChange={(newV, oldV) => {
            let submit = false
            let textResult = newV
            let o = +oldV
            let n = +newV
            if (Math.abs(n - o) === 1) {
               let diff = n - o
               let res = n
               while (res % 6 !== 0) {
                  res += diff
               }
               res = clip(res, lowBound, highBound)
               textResult = '' + res
               let [error] = validation(textResult)
               submit = !error
            }
            return [submit, textResult]
         }}
      />
   )
})
