import '../ui/style.css'

import { observable } from 'mobx'
import { render } from 'react-dom'

import { createComputer } from '../compute/compute'
import { createDisplay } from '../display/display'
import { createHub } from '../state/hub'
import { createStore } from '../state/store'
import { appElement } from './app'

function main() {
   let bareStore = createStore()
   let store = observable(bareStore)
   let hub = createHub()

   let computer = createComputer()
   let display = createDisplay(store, computer, hub)

   render(
      appElement({
         display,
         hub,
         store,
      }),
      document.getElementById('appRoot'),
   )
}

main()
