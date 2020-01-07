import '../ui/style.css'

import { renderController } from '../ui/control/control'
import { renderEditor } from '../ui/editor/editor'

import { observable } from 'mobx'
import { createHub } from '../state/hub'
import { createStore } from '../state/store'
import { createComputer } from '../compute/compute'
import { createDisplay } from '../display/display'

function main() {
   let bareStore = createStore()
   let hub = createHub()

   let store = observable(bareStore)

   let computer = createComputer(store, hub)
   let display = createDisplay(store, computer, hub)

   renderEditor(document.getElementById('editorRoot')!, store, hub)
   renderController(document.getElementById('controlRoot')!, store, hub)
   display.renderDisplay(document.getElementById('displayRoot')!)

   let versionRoot = document.getElementById('versionRoot')!
   versionRoot.textContent = process.env.VERSION || 'missing VERSION'
}

main()
