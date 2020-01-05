import { timeStore } from '../www/global'

export let timed = <K extends any>(title, f: () => K): K => {
   let stat = (timeStore[title] = timeStore[title] || {
      totalTime: 0,
      count: 0,
   })

   let close = () => {
      let end = Date.now()
      stat.totalTime += end - beginning
      stat.count += 1
   }

   let beginning = Date.now()
   let result = f()
   if (result && result.then) {
      return result.finally(close)
   } else {
      close()
      return result
   }
}

export let report = () => {
   for (let [title, { totalTime, count }] of Object.entries(timeStore)) {
      let fps = (count * 1000) / totalTime
      console.log(title, totalTime / count, 'ms', fps, 'fps')
   }
}
