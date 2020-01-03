export let errorCheck = <T>(
   defaultValue: T,
   ...pairList: [() => boolean, T][]
): [boolean, T] => {
   for (let [check, value] of pairList) {
      if (check()) {
         return [true, value]
      }
   }
   return [false, defaultValue]
}
