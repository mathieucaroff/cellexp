import * as React from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core'

import { useStore } from '../../util/useStore'
import { observer } from 'mobx-react-lite'
import { SymmetricTable } from './SymmetricTable'

let useStyle = makeStyles((theme: Theme) => {
   return createStyles({
      spacerRight: {
         marginRight: '2em',
      },
   })
})

export let PropertyList = observer(() => {
   let store = useStore()
   let classes = useStyle()

   let { rule } = store

   return (
      <>
         <div className={classes.spacerRight}>
            <SymmetricTable
               label="Symmetrics of current rule"
               rule={rule}
               symmetricReferenceRule={rule}
               symmetricMessage="self-symmetric"
            />
         </div>
         <div>
            <SymmetricTable
               label="Symmetrics of color output complement rule"
               rule={255 - rule}
               symmetricReferenceRule={rule}
               symmetricMessage="remote-self-symmetric"
            />
         </div>
      </>
   )
})
