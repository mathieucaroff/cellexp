import '../ui/style.css'

import { renderController } from '../ui/control/control'
import { renderEditor } from '../ui/editor/editor'

import { observable } from 'mobx'
import { createStore } from '../state/store'

function main() {
   let store = createStore()

   let observableStore = observable(store)

   renderEditor(document.getElementById('editorRoot')!, observableStore)
   renderController(document.getElementById('controlRoot')!, observableStore)
   // renderDisplay(document.getElementById('displayRoot')!, observableStore)
}

main()
