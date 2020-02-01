import { createStyles, makeStyles, Theme } from '@material-ui/core'
import { Link } from '@material-ui/core'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useStore } from '../../util/useContextHook'
import { Rule as RuleType } from '../../../compute/Rule'

let useStyle = makeStyles((theme: Theme) => {
   return createStyles({
      fakeHref: {
         cursor: 'pointer',
      },
   })
})

export interface RuleProp {
   rule: RuleType
}

export let Rule = observer((prop: RuleProp) => {
   let classes = useStyle()
   let store = useStore()
   let onClick = action(() => {
      store.rule.number = prop.rule.number
   })
   let textContent = <>rule&nbsp;{prop.rule.number}</>

   let content: React.ReactElement
   if (store.rule.number === prop.rule.number) {
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
