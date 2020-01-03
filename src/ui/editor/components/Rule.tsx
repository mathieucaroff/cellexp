import * as React from 'react'

import { Link } from '@material-ui/core'
import { action } from 'mobx'

import { useStore } from '../../util/useStore'

export interface RuleProp {
   rule: number
}

export let Rule = (prop: RuleProp) => {
   let store = useStore()
   let onClick = action(() => {
      store.rule = prop.rule
   })
   return <Link onClick={onClick}>{prop.rule}</Link>
}
