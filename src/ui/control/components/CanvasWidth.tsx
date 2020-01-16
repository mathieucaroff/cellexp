import * as React from 'react'
import { errorCheck } from '../../../util/errorCheck'
import { useStore } from '../../util/useContextHook'
import { SelectorInput } from './SelectorInput'

let validation = (value: string) => {
   const fourKWidth = 3840

   let notAnInteger = () => !value.match(/^-?\d*$/)
   let notPositive = () => !!value.match(/^-/)
   let outOfBoundary = () => +value > 3 * fourKWidth

   return errorCheck(
      'Canvas width',
      [notAnInteger, 'Width must be an integer'],
      [notPositive, 'Width must be positive'],
      [outOfBoundary, `Width must between 0 and ${3 * fourKWidth}`],
   )
}

export let CanvasWidth = () => {
   return (
      <SelectorInput
         label="Width"
         property={'x'}
         store={useStore().canvasSize}
         validation={validation}
      />
   )
}
