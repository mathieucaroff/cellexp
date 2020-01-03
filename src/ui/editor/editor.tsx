import * as React from 'react'
import { render } from 'react-dom'

import { storeContext } from '../../www/global'

import { Store } from '../../state/store'

import { RuleSelector } from './components/RuleSelector'
import { useStyle } from '../style'
import { PropertyList } from './components/PropertyList'

let Editor = () => {
   let classes = useStyle()
   return (
      <div className={classes.ui}>
         <h2>Rule Editor</h2>
         <h3>Rule selector</h3>
         <div className={classes.inputList}>
            <RuleSelector />
         </div>
         <h3>Property list</h3>
         <div>
            <PropertyList />
         </div>
      </div>
   )
}

export let renderEditor = (rootElement: HTMLElement, store: Store) => {
   render(
      <storeContext.Provider value={store}>
         <Editor />
      </storeContext.Provider>,
      rootElement,
   )
}
