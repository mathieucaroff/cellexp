import { List, ListItem } from '@material-ui/core'
import Link from '@material-ui/core/Link'
import { observer } from 'mobx-react-lite'
import * as React from 'react'
import { md2react } from './md2react'
import { usePromise } from './usePromise'

const markdownContent = `
- [Celldemo](http://devinacker.github.io/celldemo/)&nbsp;– Autoscrolling, Impuse, Random proportion
- [ECAX](https://www.xanxys.net/ecax/)&nbsp;\t– Zoom, Navigation, Compute-on-demand
- [ECA Canvas](http://www.cs.swan.ac.uk/~csandy/research/play/ca/)&nbsp;– Size, Border, Random
- [ECA EmergentMind](http://www.emergentmind.com/elementary-cellular-automata)&nbsp;– Zoom, Board of 256 rules
- [WolframAlpha](https://www.wolframalpha.com/input/?i=rule+110)&nbsp;- Description (symetries, properties, classes), Differential propagation examples
`

let promise = md2react(markdownContent, {
   a: Link,
   ul: List,
   li: ListItem,
})

export let AlternativeSection = observer(() => {
   let tree = usePromise(() => '', promise)
   return <section>{tree}</section>
})
