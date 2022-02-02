import { observable } from 'mobx'
import { render } from 'react-dom'
import * as packageInfo from '../../package.json'
import { createComputer } from '../compute/compute'
import { createDisplay } from '../display/display'
import { defaultState } from '../state/state'
import '../ui/style.css'
import { appElement } from './app'
import { githubCornerHTML } from './lib/githubCorner'

function main() {
   let cellexp_version = document.getElementById('cellexp_version')
   cellexp_version!.innerText = packageInfo.version

   let bareStore = defaultState()
   let store = observable(bareStore)
   ;(window as any).store = bareStore

   let computer = createComputer()
   let display = createDisplay(store, computer)

   let div = document.createElement('div')
   div.innerHTML = githubCornerHTML(packageInfo.repository)

   render(
      appElement({
         display,
         store,
      }),
      document.getElementById('appRoot'),
   )
}

main()
