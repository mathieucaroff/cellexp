import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { reaction } from 'mobx'
import { observer, useLocalStore } from 'mobx-react-lite'
import * as React from 'react'
import {
   BdslResultSuccess,
   bdslToBorder,
   borderToBdsl,
} from '../../../compute/bdsl'
import { TopologyFinite } from '../../../compute/topology'
import { capitalize } from '../../../util/capitalize'
import { SlowTextField } from '../../components/SlowTextField'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      borderSelector: {},
   }),
)

export interface BorderSelectorProp {
   property: 'borderLeft' | 'borderRight' | 'genesis'
   side: 'left' | 'right'
   topology: TopologyFinite
}

export let BorderSelector = observer((prop: BorderSelectorProp) => {
   let { property, side, topology } = prop

   let classes = useStyle()

   let local = useLocalStore(() => {
      return {
         slowValue: '0',
         value: '0',
      }
   })

   reaction(
      () => topology[property],
      (border) => {
         if (topology.kind === 'border') {
            let bdsl = borderToBdsl(border)
            local.slowValue = bdsl
            local.value = bdsl
         }
      },
   )

   let label = `Border ${capitalize(side)}`
   let helperText = ''

   let bdslResult = bdslToBorder(local.value)
   if (!bdslResult.success) {
      helperText = bdslResult.info
   }

   return (
      <SlowTextField
         className={classes.borderSelector}
         disabled={topology.kind !== 'border'}
         error={!bdslResult.success}
         fastValue={local.value}
         helperText={helperText}
         label={label}
         onChange={(newV) => {
            local.value = newV
         }}
         onSubmit={(submittedV) => {
            local.slowValue = submittedV
            let { border } = bdslResult as BdslResultSuccess
            topology[property] = border
         }}
         slowValue={local.slowValue}
      />
   )
})
