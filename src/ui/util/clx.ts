/**
 * clx
 * A short helper function to join texts on space. It can be used to join
 * class names
 *
 * @param textList the text fragments to join with a space
 */
export let clx = (...textList: string[]) => {
   return textList.filter((v) => v).join(' ')
}
