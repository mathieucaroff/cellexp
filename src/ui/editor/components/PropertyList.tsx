import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useStore } from '../../util/useContextHook'
import { SymmetricTable } from './SymmetricTable'
import { clx } from '../../util/clx'

let useStyle = makeStyles((theme: Theme) => {
   return createStyles({
      displayBlock: {
         display: 'inline-block',
      },
      spacerRight: {
         marginRight: '2em',
      },
   })
})

export let PropertyList = observer(() => {
   let classes = useStyle()
   let store = useStore()

   let { rule } = store

   return (
      <div>
         <div className={clx(classes.displayBlock, classes.spacerRight)}>
            <SymmetricTable
               label="Symmetrics of current rule"
               ruleNumber={rule.number}
               symmetricReferenceRule={rule.number}
               symmetricMessage="self-symmetric"
            />
         </div>
         <div className={clx(classes.displayBlock)}>
            <SymmetricTable
               label="Symmetrics of color output complement rule"
               ruleNumber={255 - rule.number}
               symmetricReferenceRule={rule.number}
               symmetricMessage="remote-self-symmetric"
            />
         </div>
      </div>
   )
})
