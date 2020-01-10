import { autorun } from 'mobx'

/**
 * autolog
 * debug help to log a value from an observable whenever it changes
 * @param name A name to tag the log entry
 * @param obj The observable object in which read the value
 * @param propName The name to read in the objet
 */

export let autolog = <T>(name: string, obj: T, propName: keyof T) => {
   autorun(() => console.log(name, propName, obj[propName]))
}
