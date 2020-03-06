import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { clamp } from '../../../util/clamp'
import { errorCheck } from '../../../util/errorCheck'
import { useStore } from '../../util/useContextHook'
import { SelectorInput } from '../../components/SelectorInput'

let lowBound = 6
let highBound = 384
let modulo = 6

let validation = (value: string) => {
   let notAnInteger = () => !value.match(/^-?\d*$/)
   let outOfRange = () => +value < lowBound || +value > highBound
   let badMultiplicity = () => +value % modulo !== 0

   return errorCheck(
      'Display Zoom',
      [notAnInteger, 'Zoom must be an integer'],
      [outOfRange, `Zoom must between ${lowBound} and ${highBound}`],
      [badMultiplicity, `Zoom must a multiple of ${modulo}`],
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
               while (res % modulo !== 0) {
                  res += diff
               }
               res = clamp(res, lowBound, highBound)
               textResult = '' + res
               let [error] = validation(textResult)
               submit = !error
            }
            return [submit, textResult]
         }}
      />
   )
})
