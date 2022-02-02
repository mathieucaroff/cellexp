import * as React from 'react'
import { useStore } from '../../util/useContextHook'
import { BorderTextarea } from './BorderTextarea'
import { observer } from 'mobx-react-lite'

export let BorderFieldList = observer(() => {
   let store = useStore()

   let { kind } = store.topology
   let topology: any = store.topology

   return (
      <>
         <BorderTextarea
            getProperty={() => topology.genesis}
            setProperty={(val: any) => {
               store.topology.genesis = val
               store.selectedSimpleGenesis = 'Other'
            }}
            side={'top'}
            topologyKind={kind}
         />
         <BorderTextarea
            getProperty={() => topology.borderLeft}
            setProperty={(val) => {
               topology.borderLeft = val
            }}
            side={'left'}
            topologyKind={kind}
         />
         <BorderTextarea
            getProperty={() => topology.borderRight}
            setProperty={(val) => {
               topology.borderRight = val
            }}
            side={'right'}
            topologyKind={kind}
         />
      </>
   )
})
