import fs, { readFileSync } from 'fs'
import Link from '@material-ui/core/Link'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { md2react } from './md2react'
import { usePromise } from './usePromise'

const markdownContent = readFileSync(
   __dirname + '/../../../CHANGELOG.md',
   'utf-8',
)

let promise = md2react(markdownContent, {
   a: Link,
})

export let ChangelogSection = observer(() => {
   let tree = usePromise(() => '', promise)
   return <section>{tree}</section>
})
