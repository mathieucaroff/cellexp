import { readFileSync } from 'fs'
import { observer, useLocalStore } from 'mobx-react-lite'
import * as React from 'react'
// import { default as html } from 'remark-html'
import { default as remark } from 'remark-parse'
import { default as unified } from 'unified'
import { default as rehype2react } from 'rehype-react'
import { default as remark2rehype } from 'remark-rehype'
import Link from '@material-ui/core/Link'

const markdownContent = readFileSync(
   __dirname + '../../../../CHANGELOG.md',
   'utf-8',
)

// const initialContent = 'Converting markdown to html...'
// let content = initialContent

// let converter = unified()
//    .use(markdown)
//    .use(html)

// converter.process(markdownContent, (err, result) => {
//    if (err) throw err
//    content = '' + result
// })

let createElement = (component, ...args) => {
   if (component !== 'a') {
      return React.createElement(component, ...args)
   } else {
      return <Link {...(args[0] || {})}>{args.slice(1)}</Link>
   }
}

const inititalTreeOuput: any = ''
let treeOutput = inititalTreeOuput

let processer = unified()
   .use(remark)
   .use(remark2rehype)
   .use(rehype2react, { createElement })

processer.process(markdownContent, (err, result) => {
   if (err) throw err
   treeOutput = result.contents
})

export let ChangelogSection = observer(() => {
   let local = useLocalStore(() => ({
      // content,
      treeOutput,
   }))
   // return <section dangerouslySetInnerHTML={{ __html: local.content }} />
   return <section>{local.treeOutput}</section>
})
