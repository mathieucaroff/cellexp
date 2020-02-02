import { timeStore } from '../www/global'

/// /// /// /// /// /// /// /// /// /// /// /// ///
let measure: 'enabled' | 'disabled' = 'disabled'
/// /// /// /// /// /// /// /// /// /// /// /// ///

type Function<AT extends any[], RT> = (...args: AT) => RT

let getStat = (title: string) => {
   if (title.startsWith('!')) {
      return { totalTime: 0, count: 0 }
   }
   return (timeStore[title] = timeStore[title] || {
      totalTime: 0,
      count: 0,
   })
}

let formatted = (n: number): string => {
   return Number(n).toLocaleString()
}

let timed = <FAT extends any[], FRT>(
   title: string,
   f: Function<FAT, FRT>,
): Function<FAT, FRT> => {
   let stat = getStat(title)

   let wrapped_f = (...args: FAT) => {
      let beginning = Date.now()
      let result = f(...args)
      let end = Date.now()
      stat.totalTime += end - beginning
      stat.count += 1
      return result
   }
   return wrapped_f
}

let timedAsync = <FAT extends any[], FRT>(
   title: string,
   f: Function<FAT, Promise<FRT>>,
): Function<FAT, Promise<FRT>> => {
   let stat = getStat(title)

   let wrapped_f = (...args: FAT) => {
      let beginning = Date.now()
      let result = f(...args)
      return result.finally(() => {
         let end = Date.now()
         stat.totalTime += end - beginning
         stat.count += 1
      })
   }
   return wrapped_f
}

let timedExpr = <FRT>(title: string, f: () => FRT): FRT => {
   return timed(title, f)()
}

let timedAsyncExpr = <FRT>(
   title: string,
   f: () => Promise<FRT>,
): Promise<FRT> => {
   return timedAsync(title, f)()
}

let report = () => {
   for (let [title, { totalTime, count }] of Object.entries(timeStore)) {
      let rps = (count * 1000) / totalTime
      console.log(
         title,
         formatted(totalTime / count),
         'ms',
         formatted(rps),
         'rps',
      )
   }
}

// ;(window as any).report = report
// setInterval(report, 5000)

if (measure === 'disabled') {
   timed = <T>(title: string, f: T) => f
   timedAsync = timed
   timedExpr = <T>(title: string, f: () => T) => f()
   timedAsyncExpr = timedExpr
}

export { timed, timedAsync, timedExpr, timedAsyncExpr }
