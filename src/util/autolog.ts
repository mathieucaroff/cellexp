import { autorun } from 'mobx'

/**
 * autolog
 * Debug help to log a value from a mobx observable whenever it changes
 * It uses mobx `autorun` to subsribe to changes.
 * @param name A name to tag the log entry
 * @param obj The observable object in which read the value
 * @param propName The name to read in the objet
 * @returns the function to dispose of the autorun
 */

export let autolog = <T>(name: string, obj: T, propName: keyof T) => {
   return autorun(() => console.log(name, propName, obj[propName]))
}
