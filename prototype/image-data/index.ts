let canvas = document.createElement('canvas')

let imSize = {
   x: 0,
   y: 0,
}

let ctxOrNull = canvas.getContext('2d')
if (!ctxOrNull) throw !ctxOrNull
let ctx = ctxOrNull

let setup = () => {
   window.addEventListener('resize', resize)

   document.body.appendChild(ctx.canvas)
   document.body.style.margin = '0'
   document.body.style.padding = '0'
   document.body.style.overflow = 'hidden'

   resize()
}

let resize = () => {
   imSize.y = window.innerHeight
   imSize.x = window.innerWidth

   count -= count % changeFrequence

   afProp.skip = true
   afProp = {
      drawAgain: true,
      beforeDrawRule: () => {
         canvas.height = imSize.y
         canvas.width = imSize.x
      },
   }
   animationFrame(afProp)()
}

let timeStore: {
   [k: string]: {
      totalTime: number
      count: number
   }
} = ((window as any).timeStore = {})

let logCall = (title) => {
   console.log(title, '()')
}

let logValueStore: { [k: string]: { count: number } } = {}
let logValue = <K>(name, value: K, { skipCount }) => {
   let { count } = (logValueStore[name] = logValueStore[name] || { count: 0 })
   if (count % skipCount === 0) {
      console.log(name, value)
   }
   logValueStore[name].count++
   return value
}

let logj = (obj) => {
   let entries = Object.entries(obj)
   if (entries.length == 1) {
      let [key, val] = entries[0]
      console.log(key, val)
      return val
   } else if (entries.length > 1) {
      console.warn('logj got obj that has more than 1 key:', obj)
   } else if (entries.length == 0) {
      console.warn('logj got obj with 0 key', new Error().stack)
   }
}

let timed = <K extends any>(title, f: () => K): K => {
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

let timedAndLogged = <K>(title, f) => {
   logCall(title)
   return timed<K>(title, f)
}

let report = () => {
   for (let [title, { totalTime, count }] of Object.entries(timeStore)) {
      let fps = (count * 1000) / totalTime
      console.log(title, totalTime / count, 'ms', fps, 'fps')
   }
}

let select = <K>(array: K[], selector: number) => {
   let s = array.length
   return array[((selector % s) + s) % s]
}

let rule110 = (p, q, r) => (q & (255 ^ p)) | (q ^ r)
let ruleN = (N) => (p, q, r) => {
   let k = (4 & p) + (2 & q) + (1 & r)
   return 255 * ((N & (1 << k)) >> k)
}

let interestingRuleArray = [
   18,
   22,
   26,
   30,
   45,
   54,
   60,
   62,
   73,
   75,
   86,
   89,
   90,
   102,
   110,
   122,
   126,
   150,
   182,
]

let rule = ruleN(0)
let afProp: AnimationFrameProp = {}
let lastImage: ImageBitmap
let lastLine: ImageData

let count = -1

let selectableRuleArray = interestingRuleArray

let fps = 60
let changeFrequence = 2 * fps

let drawRuleLine = ({ rule, src, srcStart, dest, destStart, count }) => {
   for (let kx = 0; kx < count; kx += 1) {
      let sk = srcStart + kx * 4
      let dk = destStart + kx * 4
      let value = rule(src[sk - 4], src[sk], src[sk + 4])
      dest[dk + 0] = value
      dest[dk + 1] = value
      dest[dk + 2] = value
      dest[dk + 3] = 255
   }
}

let drawRuleCanvas = async ({ rule, ctx, beforeDraw }) => {
   let imageData = timed('createImage', () => new ImageData(imSize.x, imSize.y))
   let { data } = imageData

   timed('computeImage', () => {
      if (1) {
         let ky = 0
         for (let k = 0; k < 4 * imSize.x; k += 4) {
            data[k] = data[k + 1] = data[k + 2] = data[k + 3] =
               255 * Math.floor(2 * Math.random())
         }
      }
      for (let ky = 1; ky < imSize.y; ky += 1) {
         let [srcStart, destStart] = [-1, 0].map((t) => (ky + t) * 4 * imSize.x)
         drawRuleLine({
            rule,
            src: data,
            srcStart,
            dest: data,
            destStart,
            count: imSize.x,
         })
      }
   })
   let imageBitmap = await timed('createImageBitmap', () =>
      createImageBitmap(imageData),
   )

   timedAndLogged('beforeDraw', beforeDraw)

   timedAndLogged('drawImageBitmap', () => ctx.drawImage(imageBitmap, 0, 0))

   let lastLineData = data.slice(4 * imSize.x * (imSize.y - 1))
   return {
      lastImage: imageBitmap,
      lastLine: new ImageData(lastLineData, imSize.x, 1),
   }
}

interface AnimationFrameProp {
   beforeDrawRule?: () => any
   drawAgain?: boolean
   skip?: boolean
}

let animationFrame = (prop: AnimationFrameProp = {}) => () => {
   timed('draw-total', async () => {
      let { beforeDrawRule = () => {}, skip = false, drawAgain = false } = prop
      if (skip) {
         return
      }
      count++
      let imageIndex = Math.floor(count / changeFrequence)
      if (imageIndex > selectableRuleArray.length) {
         // stop //
         report()
         return
      }

      afProp = {}
      requestAnimationFrame(animationFrame(afProp))

      if (count % changeFrequence == 0 || drawAgain) {
         // draw (new) rule //
         let ruleNumber = select(selectableRuleArray, imageIndex)
         rule = ruleN(ruleNumber)

         timedAndLogged('drawRuleCanvas', () => {
            drawRuleCanvas({
               ctx,
               rule,
               beforeDraw: () => {
                  location.hash = '' + ruleNumber
                  beforeDrawRule()
                  ctx.clearRect(0, 0, imSize.x, imSize.y)
               },
            }).then((prop) => {
               lastImage = prop.lastImage
               lastLine = prop.lastLine
            })
         })
      } else if (1) {
         let line = new ImageData(imSize.x, 1)

         drawRuleLine({
            rule,
            src: lastLine.data,
            srcStart: 0,
            dest: line.data,
            destStart: 0,
            count: imSize.x,
         })

         let lineBitmap = await timed('createImageBitmapLine', () =>
            createImageBitmap(line),
         )

         timed('drawImageCanvas', () => ctx.drawImage(ctx.canvas, 0, -1))
         timed('drawImageLine', () =>
            ctx.drawImage(lineBitmap, 0, imSize.y - 1),
         )

         lastLine = line
      }
   })
}

setup()
