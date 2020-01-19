import { Pair } from '../../util/RectType'

export interface CreateImageDataProp {
   size: Pair
   callback: (prop: {
      data: Uint8ClampedArray
      y: number
      x: number
      p: number
   }) => void
}

export let createImageData = (prop: CreateImageDataProp) => {
   let { size, callback } = prop
   let imageData = new ImageData(size.x, size.y)
   let { data } = imageData

   let p = 0
   Array.from({ length: size.y }, (_, y) => {
      Array.from({ length: size.x }, (_, x) => {
         callback({ data, y, x, p })
         p += 4
      })
   })
   return imageData
}
