/**
 * Deep copy values from sourceObj to destObj
 *
 * @param destO Destination object
 * @param sourceO Source object
 */
function deepUpdate<TD extends {}, TS extends TD>(destO: TD, sourceO: TS): void
function deepUpdate<TD extends {}>(destO: TD, sourceO: TD): void {
   for (var prop in sourceO) {
      let sourceV = sourceO[prop]
      if (typeof sourceV == 'object' && sourceV != null) {
         let destVIsObj = typeof destO[prop] == 'object' && destO[prop] != null
         if (!destVIsObj) {
            destO[prop] = {} as typeof sourceV
         }
         deepUpdate(destO[prop], sourceV)
      } else {
         destO[prop] = sourceV
      }
   }
}

export { deepUpdate }
