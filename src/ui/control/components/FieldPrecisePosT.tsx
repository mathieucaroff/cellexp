import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { errorCheck } from '../../../util/errorCheck'
import { useStore } from '../../util/useStore'
import { SelectorInput } from './SelectorInput'

export let FieldPrecisePosT = observer(() => {
   let store = useStore()
   let { microFactor } = store.posT

   let validation = (value: string) => {
      let notAnInteger = () => !value.match(/^-?\d*$/)
      let notPositive = () => !!value.match(/^-/)
      let tooBig = () => +value >= microFactor

      return errorCheck(
         'Fractional part of the time (generations)',
         [notAnInteger, 'It must be an integer'],
         [notPositive, 'It must be positive'],
         [tooBig, `It must between 0 and ${microFactor - 1}`],
      )
   }

   return (
      <SelectorInput
         label="Fractional Generation"
         property={'microPos'}
         disabled={store.play === true}
         store={store.posT}
         validation={validation}
      />
   )
})
