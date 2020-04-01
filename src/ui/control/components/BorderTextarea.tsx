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
import { BorderDescriptor } from '../../../compute/borderType'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      borderField: {
         '&': {
            width: '400px',
         },
         '& .MuiInput-input': {
            minHeight: '3.5em',
         },
      },
   }),
)

export interface BorderFieldProp {
   getProperty: () => BorderDescriptor
   setProperty: (val: BorderDescriptor) => void
   side: 'left' | 'right' | 'top'
   topologyKind: TopologyFinite['kind']
}

export let BorderTextarea = observer((prop: BorderFieldProp) => {
   let { getProperty, setProperty, side, topologyKind } = prop

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

   reaction(getProperty, (border) => {
      if (topologyKind === 'border') {
         let bdsl = borderToBdsl(border)
         local.slowValue = bdsl
         local.value = bdsl
      }
   })

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
      setProperty(result)
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
            className: c.borderField,
            disabled: side !== 'top' && topologyKind !== 'border',
            helperText,
            multiline: true,
         }}
      />
   )
})
