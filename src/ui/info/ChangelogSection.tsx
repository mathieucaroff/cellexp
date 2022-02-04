import Link from '@material-ui/core/Link'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { md2react } from './md2react'
import { usePromise } from './usePromise'

// @ts-ignore
import markdownContent from "bundle-text:../../../CHANGELOG.md";

let promise = md2react(markdownContent, {
   a: Link,
})

export let ChangelogSection = observer(() => {
   let tree = usePromise(() => '', promise)
   return <section>{tree}</section>
})
