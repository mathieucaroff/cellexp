import * as React from 'react'

import { Store } from '../state/store'
import { Hub } from '../state/hub'
import { Display } from '../display/display'
import { hubContext, storeContext } from './global'
import { Editor } from '../ui/editor/Editor'
import { Controller } from '../ui/control/Controller'
import { DisplayAdapter } from '../ui/DisplayAdapter'

export interface AppProp {
   display: Display
   hub: Hub
   store: Store
}

let App = (prop: AppProp) => {
   let { display, hub, store } = prop

   return (
      <hubContext.Provider value={hub}>
         <storeContext.Provider value={store}>
            <Editor />
            <Controller />
            <DisplayAdapter display={display} />
         </storeContext.Provider>
      </hubContext.Provider>
   )
}

export let appElement = (prop: AppProp) => {
   return <App {...prop} />
}
