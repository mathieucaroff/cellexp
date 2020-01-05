import * as React from 'react'

import { makeStyles, Theme, createStyles } from '@material-ui/core'

import { useStore } from '../../util/useStore'
import { observer } from 'mobx-react-lite'
import { SymmetricTable } from './SymmetricTable'

let useStyle = makeStyles((theme: Theme) => {
   return createStyles({
      spacer: {
         marginLeft: '2em',
      },
   })
})

export let PropertyList = observer(() => {
   let store = useStore()
   let classes = useStyle()

   let { rule } = store

   return (
      <span>
         <SymmetricTable
            label="Symmetrics of current rule"
            rule={rule}
            symmetricReferenceRule={rule}
            symmetricMessage="self-symmetric"
         />
         <span className={classes.spacer}></span>
         <SymmetricTable
            label="Symmetrics of color output complement rule"
            rule={255 - rule}
            symmetricReferenceRule={rule}
            symmetricMessage="remote-self-symmetric"
         />
      </span>
   )
})
