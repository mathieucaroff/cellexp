import * as React from 'react'
import { render } from 'react-dom'

import { storeContext } from '../../www/global'

import { Store } from '../../state/store'

import { CaSizeSelector } from './components/CaSizeSelector'
import { SpeedSelector } from './components/SpeedSelector'
import { ThemeSelector } from './components/ThemeSelector'
import { useStyle } from '../style'

let Controller = () => {
   let classes = useStyle()
   return (
      <div className={classes.ui}>
         <h2>Simulation Controller</h2>
         <div className={classes.inputList}>
            <CaSizeSelector />
            <SpeedSelector />
            <ThemeSelector />
         </div>
      </div>
   )
}

export let renderController = (rootElement: HTMLElement, store: Store) => {
   render(
      <storeContext.Provider value={store}>
         <Controller />
      </storeContext.Provider>,
      rootElement,
   )
}
