import * as React from 'react'

import { Store } from '../state/store'
import { Hub } from '../state/hub'
import { Display } from '../display/display'
import { hubContext, storeContext } from './global'
import { Editor } from '../ui/editor/Editor'
import { Controller } from '../ui/control/Controller'
import { Configurator } from '../ui/control/Configurator'
import { DisplayAdapter } from '../ui/DisplayAdapter'
import { useLocalStore, observer } from 'mobx-react-lite'
import { muiThemeFromCellexp, themeSet } from './theme'
import { ThemeProvider, CssBaseline, Box } from '@material-ui/core'

export interface AppProp {
   display: Display
   hub: Hub
   store: Store
}

let App = observer((prop: AppProp) => {
   let { display, hub, store } = prop

   let local = useLocalStore(() => ({
      get muiTheme() {
         return muiThemeFromCellexp(themeSet[store.theme])
      },
   }))

   return (
      <hubContext.Provider value={hub}>
         <storeContext.Provider value={store}>
            <ThemeProvider theme={local.muiTheme}>
               <Configurator />
               <Editor />
               <Controller />
               <DisplayAdapter display={display} />
               <CssBaseline />
            </ThemeProvider>
         </storeContext.Provider>
      </hubContext.Provider>
   )
})

export let appElement = (prop: AppProp) => {
   return <App {...prop} />
}
