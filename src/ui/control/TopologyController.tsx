import {
   createStyles,
   makeStyles,
   MenuItem,
   Select,
   Theme,
} from '@material-ui/core'
import { set, action } from 'mobx'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { BorderDescriptor } from '../../compute/borderType'
import { useStore } from '../util/useContextHook'
import { BorderField } from './components/BorderField'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      topology: {
         '& > *': {
            display: 'inline-block',
            margin: theme.spacing(1),
         },
      },
   }),
)

export let TopologyController = observer(() => {
   let store = useStore()
   let classes = useStyle()

   let { finitness, width } = store.topology

   let dead = {
      cumulativeMap: [1, 1],
      total: 1,
   }

   let simpleDeadBorder: BorderDescriptor = {
      kind: 'side',
      init: [],
      cycle: [dead],
   }

   let handleChange = action((event: any) => {
      let kind: 'loop' | 'border' = event.target.value

      if (kind !== store.topology.kind) {
         if (kind === 'loop') {
            store.topology.kind = kind
         } else if (kind === 'border') {
            set(store.topology, {
               borderLeft: simpleDeadBorder,
               borderRight: simpleDeadBorder,
               finitness,
               width,
            })
            set(store.topology, {
               kind,
            })
         }
      }
   })

   let { kind } = store.topology

   return (
      <div className={classes.topology}>
         <Select value={store.topology.kind} onChange={handleChange}>
            <MenuItem value="loop">Loop</MenuItem>
            <MenuItem value="border">Border</MenuItem>
         </Select>
         <BorderField
            getProperty={() => store.topology.genesis}
            setProperty={(val: any) => {
               store.topology.genesis = val
               store.selectedSimpleGenesis = 'Other'
            }}
            side={'top'}
            topologyKind={kind}
         />
         <BorderField
            getProperty={() => (store.topology as any).borderLeft}
            setProperty={(val: any) => {
               ;(store.topology as any).borderLeft = val
            }}
            side={'left'}
            topologyKind={kind}
         />
         <BorderField
            getProperty={() => (store.topology as any).borderRight}
            setProperty={(val: any) => {
               ;(store.topology as any).borderRight = val
            }}
            side={'right'}
            topologyKind={kind}
         />
      </div>
   )
})
