import { KeyboardManager } from './keyboardManager'
import { Display } from './display'
import { Remover } from '../util/RemoverType'

export let keyboardBinding = (
   display: Display,
   kb: KeyboardManager,
): Remover => {
   let { act } = display

   let removerList = [] as (() => void)[]

   let onKeydown = (key: string, fn: () => void) => {
      let { remove } = kb.onKeydown(key, fn)
      removerList.push(remove)
   }

   onKeydown('ArrowLeft', act.goLeft)
   onKeydown('ArrowRight', act.goRight)
   onKeydown('ArrowUp', act.goUp)
   onKeydown('ArrowDown', act.goDown)

   onKeydown('PageUp', act.pageUp)
   onKeydown('PageDown', act.pageDown)
   onKeydown('Home', act.pageLeft)
   onKeydown('End', act.pageRight)

   return {
      remove: () => {
         removerList.forEach((f) => f())
      },
   }
}
