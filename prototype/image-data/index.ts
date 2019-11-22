let canvas = document.createElement('canvas')

let imSize = {
   x: 0,
   y: 0,
}

let ctxOrNull = canvas.getContext('2d')
if (!ctxOrNull) throw !ctxOrNull
let ctx = ctxOrNull

let createFixed = () => {
   let fixedDiv = document.createElement('div')
   fixedDiv.style.position = 'fixed'
   fixedDiv.style.textAlign = 'right'
   fixedDiv.style.width = '99vw'

   let urlInput = document.createElement('input')
   urlInput.name = 'url'
   urlInput.value = location.hash
   let uis = urlInput.style
   uis.width = '100vw'
   uis.background = 'rgba(0,0,0,0.5)'
   uis.color = 'white'
   uis.borderWidth = '1px 0'
   fixedDiv.appendChild(urlInput)

   let anchor = document.createElement('a')
   anchor.href =
      'https://github.com/mathieucaroff/cellular-automaton-explorer-1d/tree/master/prototype/image-data'
   anchor.textContent =
      'gh://mathieucaroff/cellular-automaton-explorer-1d///prototype/image-data'
   let as = anchor.style
   as.color = 'white'
   as.background = 'rgba(0,0,0,0.5)'
   as.fontSize = '10px'
   fixedDiv.appendChild(anchor)

   return { fixedDiv, urlInput }
}

let urlManager: UrlManager

let setup = () => {
   window.addEventListener('resize', resize)

   let { fixedDiv, urlInput } = createFixed()
   urlManager = createUrlManager({ urlInput })
   document.body.appendChild(fixedDiv)
   document.body.appendChild(ctx.canvas)
   let bs = document.body.style
   bs.margin = '0'
   bs.padding = '0'
   bs.overflow = 'hidden'
   bs.fontFamily = 'Tahoma'

   setup2()

   resize()
}

let resize = () => {
   imSize.y = window.innerHeight
   imSize.x = window.innerWidth

   count -= count % frameCountBetweenChange()

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

interface UrlManagerProp {
   urlInput: HTMLInputElement
}

type UrlManagerData = Record<string, any>

interface UrlManager {
   data: UrlManagerData
   setData: (data: UrlManagerData) => UrlManager
   updateData: (data: UrlManagerData) => UrlManager
   onChange: (callback: (data: UrlManagerData) => void) => UrlManager
}

let createUrlManager = (prop: UrlManagerProp) => {
   let { urlInput } = prop
   let callbackList: ((data: UrlManagerData) => any)[] = []

   let readData = () => {
      let text = urlInput.value
      location.hash = text.slice(text.indexOf('#'))
      let partArray = location.hash.split('#').slice(1)

      let data: UrlManagerData = {}
      partArray.forEach((part) => {
         let encodedKey, value
         if (part.includes('=')) {
            let tail
            ;[encodedKey, ...tail] = part.split('=')
            let encodedValue = tail.join('=')
            value = decode(encodedValue)
            if (value.match(/[1-9]\d*/)) {
               value = 0 + value
            }
         } else {
            encodedKey = part
            value = true
         }
         let key = decode(encodedKey)
         data[key] = value
      })

      self.data = data
   }

   urlInput.addEventListener('keydown', (ev) => {
      // logj({ key: ev.key })
      if (ev.key === 'Enter') {
         readData()
         allCallback()
      }
   })

   let allCallback = () => {
      callbackList.forEach((callback) => {
         callback(self.data)
      })
   }

   let encode = (text: string) => {
      let result = text
      try {
         '%#='.split('').forEach((char) => {
            result = result.replace(char, encodeURIComponent(char))
         })
      } catch (e) {
         console.error(new Error().stack)
         result = '' + result
      }
      return result
   }
   let decode = decodeURIComponent

   let self: UrlManager = {
      data: {},
      setData: (data) => {
         let hash = ''
         Object.entries(data).forEach(([key, value]) => {
            if (value === true) {
               hash += `#${encode(key)}`
            } else {
               if (typeof value !== 'string') {
                  value = JSON.stringify(value)
               }
               hash += `#${encode(key)}=${encode(value)}`
            }
         })
         location.hash = hash
         urlInput.value = location.href

         self.data = data

         allCallback()
         return self
      },
      updateData: (dataPiece) => {
         self.setData({
            ...self.data,
            ...dataPiece,
         })
         return self
      },
      onChange: (callback) => {
         callbackList.push(callback)
         return self
      },
   }

   readData()

   return self
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
   90, // grey triangles
   102,
   105,
   110,
   122,
   126,
   150, // bi-color triangles
   182,
]

let rule = ruleN(0)
let afProp: AnimationFrameProp = {}
let lastImage: ImageBitmap
let lastLine: ImageData

let count = -1
let roundIndex = -1

let selectableRuleArray = interestingRuleArray

let fps = 60
let baseChangePeriod = 0.125
let frameCountBetweenChange = () => {
   let changePeriod =
      baseChangePeriod *
      8 ** Math.floor(roundIndex / selectableRuleArray.length)
   return changePeriod * fps
}

let setup2 = () => {
   urlManager.onChange((data) => {
      if ('rule' in data) {
         rule = ruleN(parseInt(data.rule))
      }
   })
}

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
            data[k] = data[k + 1] = data[k + 2] =
               255 * Math.floor(2 * Math.random())
            data[k + 3] = 255
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

   timed('beforeDraw', beforeDraw)

   timed('drawImageBitmap', () => ctx.drawImage(imageBitmap, 0, 0))

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
      count = Math.floor(count + 1)
      if (count % frameCountBetweenChange() === 0) {
         roundIndex += 1
      }
      // logValue('count', count, { skipCount: 100 })

      if (roundIndex > 4 * selectableRuleArray.length) {
         // stop //
         report()
         return
      }

      afProp.skip = true
      afProp = {}
      requestAnimationFrame(animationFrame(afProp))

      if ('pause' in urlManager.data) {
         return
      }

      drawAgain =
         drawAgain ||
         (urlManager.data.auto && count % frameCountBetweenChange() == 0) ||
         !lastLine

      if (drawAgain) {
         // draw (new) rule //
         let ruleNumber = select(selectableRuleArray, roundIndex)
         urlManager.updateData({ rule: ruleNumber })

         timed('drawRuleCanvas', () => {
            drawRuleCanvas({
               ctx,
               rule,
               beforeDraw: () => {
                  beforeDrawRule()
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
