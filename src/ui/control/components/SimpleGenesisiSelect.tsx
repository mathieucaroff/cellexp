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
import {
   BorderDescriptor,
   StochasticState,
   TopBorderDescriptor,
} from '../../../compute/borderType'
import { useStore } from '../../util/useContextHook'

let useStyle = makeStyles((theme: Theme) =>
   createStyles({
      simpleTopology: {},
   }),
)

export let SimpleTopologySelect = observer(() => {
   let store = useStore()
   let classes = useStyle()

   let { finitness, width } = store.topology

   let dead: StochasticState = {
      cumulativeMap: [1, 1],
      total: 1,
   }

   let alive: StochasticState = {
      cumulativeMap: [0, 1],
      total: 1,
   }

   let random50: StochasticState = {
      cumulativeMap: [1, 2],
      total: 2,
   }

   let random10: StochasticState = {
      cumulativeMap: [9, 10],
      total: 10,
   }

   let random90: StochasticState = {
      cumulativeMap: [1, 10],
      total: 10,
   }

   let optionMap: Record<string, TopBorderDescriptor> = {
      'Impulse 1': {
         kind: 'top',
         center: [alive],
         cycleLeft: [dead],
         cycleRight: [dead],
      },
      'Impulse 3': {
         kind: 'top',
         center: [alive, alive],
         cycleLeft: [dead],
         cycleRight: [dead],
      },
      'Impulse 5': {
         kind: 'top',
         center: [alive, dead, alive],
         cycleLeft: [dead],
         cycleRight: [dead],
      },
      'Random 50%': {
         kind: 'top',
         center: [],
         cycleLeft: [random50],
         cycleRight: [random50],
      },
      'Random 10%': {
         kind: 'top',
         center: [],
         cycleLeft: [random10],
         cycleRight: [random10],
      },
      'Random 90%': {
         kind: 'top',
         center: [],
         cycleLeft: [random90],
         cycleRight: [random90],
      },
   }

   let handleChange = action((event: any) => {
      let { value } = event.target

      if (value === 'Other') {
      } else if (value in optionMap) {
         let option = optionMap[value]
      }
   })

   // TODO once state has been changed!

   return (
      <div className={classes.simpleTopology}>
         <Select value={store.topology.kind} onChange={handleChange}>
            {[...Object.keys(optionMap), 'Other'].map((name) => (
               <MenuItem value={name}>{name}</MenuItem>
            ))}
         </Select>
      </div>
   )
})
