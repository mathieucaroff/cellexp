import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { observer, useLocalStore } from 'mobx-react-lite'
import * as React from 'react'
import { Display } from '../display/display'
import { State } from '../state/state'
import { Controller } from '../ui/control/Controller'
import { DisplayAdapter } from '../ui/DisplayAdapter'
import { Editor } from '../ui/editor/Editor'
import { displayContext, storeContext } from './global'
import { muiThemeFromCellexp, themeSet } from './theme'
import { DisplayHeader } from '../ui/control/DisplayHeader'
import { DisplayFooter } from '../ui/control/DisplayFooter'
import { InfoSection } from '../ui/info/InfoSection'

export interface AppProp {
   display: Display
   store: State
}

let App = observer((prop: AppProp) => {
   let { display, store } = prop

   let local = useLocalStore(() => ({
      get muiTheme() {
         return muiThemeFromCellexp(themeSet[store.theme])
      },
   }))

   return (
      <storeContext.Provider value={store}>
         <displayContext.Provider value={display}>
            <ThemeProvider theme={local.muiTheme}>
               <DisplayAdapter
                  display={display}
                  header={<DisplayHeader />}
                  footer={<DisplayFooter />}
               />
               <Editor />
               <Controller />
               <InfoSection />
               <CssBaseline />
            </ThemeProvider>
         </displayContext.Provider>
      </storeContext.Provider>
   )
})

export let appElement = (prop: AppProp) => {
   return <App {...prop} />
}
