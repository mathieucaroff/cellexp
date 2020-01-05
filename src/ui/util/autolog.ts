import { autorun } from 'mobx'

export let autolog = <T>(name: string, obj: T, propName: keyof T) => {
   autorun(() => console.log(name, propName, obj[propName]))
}
