import '../ui/style.css'

import { render } from 'react-dom'
import { observable } from 'mobx'

import { appElement } from './app'

import { createHub } from '../state/hub'
import { createStore } from '../state/store'
import { createComputer } from '../compute/compute'
import { createDisplay } from '../display/display'

function main() {
   let bareStore = createStore()
   let store = observable(bareStore)
   let hub = createHub()

   let computer = createComputer(store, hub)
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
