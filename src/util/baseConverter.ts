import { Result } from './resultType'

export interface ToBaseParam {
   prefix?: boolean
   size?: number
}

export let toBase = (
   value: number,
   base: number,
   param: ToBaseParam = {},
): string => {
   // Conversion
   let valueInBase = value.toString(base)

   // Formatting
   /// 0 prefix sizing
   let sizedValue = valueInBase
   if (param.size !== undefined) {
      let sizeInBase = param.size.toString(base)
      let diff = sizeInBase.length - valueInBase.length
      if (diff > 0) {
         sizedValue = '0'.repeat(diff) + valueInBase
      }
   }

   /// Letter prefix
   let formattedValue = sizedValue
   if (param.prefix) {
      let index = [2, 4, 8, 16].indexOf(base)
      let prefix = index >= 0 ? `0${'bqox'[index]}` : ''
      formattedValue = prefix + sizedValue
   }

   return formattedValue
}

export let fromBase = (word: string, base: number): Result<number> => {
   // Handle 0x notation
   let match = word.match(/^(-?)0([bqodx])(.*)/)
   let tail: string
   if (match) {
      let letter = match[2]
      let expectedLetter = 'bqodx'[[2, 4, 8, 10, 16].indexOf(base)]
      if (letter !== expectedLetter) {
         let expLet = expectedLetter
         return {
            error: true,
            info: {
               message: `has incorrect prefix '0${letter}' -- expected '0${expLet}' or nothing`,
               data: { letter, expectedLetter },
            },
         }
      }
      tail = match[3]
   } else {
      tail = word
   }

   // Convert and check if it worked
   let result = parseInt(tail, base) // /!\ result can be NaN
   let error = !tail.endsWith(result.toString(base))
   return error
      ? {
           error: true,
           info: {
              message: `must be a valid base ${base} integer`,
              data: { base },
           },
        }
      : { error: false, result }
}
