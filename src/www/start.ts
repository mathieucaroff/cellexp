import '../ui/style.css'

import { renderController } from '../ui/control/control'
import { renderEditor } from '../ui/editor/editor'

import { observable } from 'mobx'
import { createStore } from '../state/store'
import { createComputer } from '../compute/compute'
import { createDisplay } from '../display/display'

function main() {
   let store = createStore()

   let observableStore = observable(store)

   let computer = createComputer(observableStore)
   let display = createDisplay(observableStore, computer)

   renderEditor(document.getElementById('editorRoot')!, observableStore)
   renderController(document.getElementById('controlRoot')!, observableStore)
   display.renderDisplay(document.getElementById('displayRoot')!)
}

main()
