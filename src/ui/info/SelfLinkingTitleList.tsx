import Link from '@material-ui/core/Link'
import * as React from 'react'

interface HProp {
   children: string
}

let tag2comp = (hx) => [
   hx,
   (prop: HProp) => {
      let textContent = '' + prop.children

      let id = textContent.toLowerCase().replace(/\s/g, '-')

      return React.createElement(hx, { id }, prop.children)
   },
]

export let titleTagList = 'h1 h2 h3 h4 h5 h6'.split(' ')

export let SelfLinkingTitleList = Object.fromEntries(titleTagList.map(tag2comp))
