import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { reaction } from 'mobx'
import { observer, useLocalStore } from 'mobx-react-lite'
import * as React from 'react'
import {
   bdslParseSideBorder,
   bdslParseTopBorder,
   BdslResultSuccess,
   borderToBdsl,
} from '../../../compute/borderDsl'
import { TopologyFinite } from '../../../compute/topology'
import { capitalize } from '../../../util/capitalize'
import { SlowTextField } from '../../components/SlowTextField'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      borderSelector: {},
   }),
)

export interface BorderFieldProp {
   property: 'borderLeft' | 'borderRight' | 'genesis'
   side: 'left' | 'right' | 'top'
   topology: TopologyFinite
}

export let BorderField = observer((prop: BorderFieldProp) => {
   let { property, side, topology } = prop

   let c = useStyle()

   let local = useLocalStore(() => {
      let value = ''
      if (side === 'top') {
         value = '([01])'
      } else {
         value = '(0)'
      }
      return {
         slowValue: value,
         value,
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

   let bdslParse: any = bdslParseSideBorder
   if (side === 'top') {
      bdslParse = bdslParseTopBorder
   }

   let bdslResult = bdslParse(local.value.replace(/\s/g, ''))
   if (!bdslResult.success) {
      helperText = bdslResult.info
   }

   let handleChange = (newV) => {
      local.value = newV
   }

   let handleSubmit = (submittedV) => {
      local.slowValue = submittedV
      let { result } = bdslResult as BdslResultSuccess<any>
      topology[property] = result
   }

   return (
      <SlowTextField
         error={!bdslResult.success}
         fastValue={local.value}
         label={label}
         onChange={handleChange}
         onSubmit={handleSubmit}
         slowValue={local.slowValue}
         TextFieldProps={{
            className: c.borderSelector,
            disabled: side !== 'top' && topology.kind !== 'border',
            helperText,
            multiline: true,
         }}
      />
   )
})
