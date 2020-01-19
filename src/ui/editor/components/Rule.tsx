import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { Link } from '@material-ui/core'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useStore } from '../../util/useContextHook'

let useStyle = makeStyles((theme: Theme) => {
   return createStyles({
      fakeHref: {
         cursor: 'pointer',
      },
   })
})

export interface RuleProp {
   rule: number
}

export let Rule = observer((prop: RuleProp) => {
   let classes = useStyle()
   let store = useStore()
   let onClick = action(() => {
      store.rule = prop.rule
   })
   let textContent = <>rule&nbsp;{prop.rule}</>

   let content
   if (store.rule === prop.rule) {
      content = textContent
   } else {
      content = (
         <Link className={classes.fakeHref} onClick={onClick}>
            {textContent}
         </Link>
      )
   }
   return <>({content})</>
})
