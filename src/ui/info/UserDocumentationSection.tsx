import Link from '@material-ui/core/Link'
import fs from 'fs'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { md2react } from './md2react'
import { usePromise } from './usePromise'
import { SelfLinkingTitleList } from './SelfLinkingTitleList'

const markdownContent = fs.readFileSync(
   __dirname + '../../../../doc/user-documentation.md',
   'utf-8',
)

let promise = md2react(markdownContent, {
   a: Link,
   ...SelfLinkingTitleList,
})

export let UserDocumentationSection = observer(() => {
   let tree = usePromise(() => '', promise)
   return <section>{tree}</section>
})
