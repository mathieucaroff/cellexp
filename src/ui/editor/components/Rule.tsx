import { Link } from '@material-ui/core'
import { action } from 'mobx'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { useStore } from '../../util/useStore'

export interface RuleProp {
   rule: number
}

export let Rule = observer((prop: RuleProp) => {
   let store = useStore()
   let onClick = action(() => {
      store.rule = prop.rule
   })
   let text = `rule ${prop.rule}`
   let eq = store.rule === prop.rule
   return <>({eq ? text : <Link onClick={onClick}>{text}</Link>})</>
})
