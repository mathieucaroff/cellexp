import Link from '@material-ui/core/Link'
import { readFileSync } from 'fs'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { md2react } from './md2react'
import { usePromise } from './usePromise'

const markdownContent = readFileSync(
   __dirname + '../../../../CHANGELOG.md',
   'utf-8',
)

let createElement = (component, ...args) => {
   if (component === 'a') {
      return <Link {...(args[0] || {})}>{args.slice(1)}</Link>
   } else {
      return React.createElement(component, ...args)
   }
}

let promise = md2react(markdownContent, createElement)

export let ChangelogSection = observer(() => {
   let tree = usePromise(() => '', promise)
   return <section>{tree}</section>
})
