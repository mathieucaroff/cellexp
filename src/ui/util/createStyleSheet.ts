// Inpired from:
// https://stackoverflow.com/a/17423037/9878263

export let createStyleSheet = (d: Document): CSSStyleSheet => {
   let style = d.createElement('style')
   style.id = Math.random()
      .toString(16)
      .slice(2)
   d.head.append(style)

   // Find its CSSStyleSheet entry in document.styleSheets
   let sheet: CSSStyleSheet | undefined = undefined
   for (let sh of document.styleSheets) {
      if (sh.ownerNode == style) {
         sheet = sh as any
         break
      }
   }

   if (sheet === undefined) {
      throw 'createStyleSheet failed to retrieve created sheet'
   }

   return sheet
}

// for (var sid in document.styleSheets) {
//    if (document.styleSheets.hasOwnProperty(sid)) {
//       let currentSheet = document.styleSheets[sid]
//       if (currentSheet.ownerNode == style) {
//          sheet = currentSheet
//          break
//       }
//    }
