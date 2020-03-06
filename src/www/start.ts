import { observable } from 'mobx'
import { render } from 'react-dom'
import * as packageInfo from '../../package.json'
import { createComputer } from '../compute/compute'
import { createDisplay } from '../display/display'
import { createHub } from '../state/hub'
import { defaultState } from '../state/state'
import '../ui/style.css'
import { appElement } from './app'

function main() {
   let cellexp_version = document.getElementById('cellexp_version')
   cellexp_version!.innerText = packageInfo.version

   let bareStore = defaultState()
   let store = observable(bareStore)
   let hub = createHub()
   ;(window as any).store = bareStore

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
