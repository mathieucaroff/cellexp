export let zero = () => 0
export let one = () => 1

export let cmZero = [1, 1] // 100% odds of getting 0
export let cmOne = [0, 1] // 100% odds of getting 1

export let sum = (list) => {
   return list.reduce((acc, elem) => acc + elem.width, 0)
}

export let emptyGroup = {
   type: 'group',
   content: [],
   quantity: 1,
   width: 0,
}

export let simpleState = ([input]) => {
   let cumulativeMap = input === 0 ? cmZero : cmOne // TODO

   return makeState(cumulativeMap)
}

export let withQuantity = ([input]) => {
   return {
      value: input,
      quantity: 1,
      width: 1,
   }
}

export let stochasticState = ([qStateList]) => {
   let cumulativeMap = [0, 0]

   // qStateList contains results produced by `withQuantity`

   qStateList.forEach(({ value, quantity }) => {
      cumulativeMap[value] += quantity
      if (value === 0) {
         cumulativeMap[1] += quantity
      }
   })

   return makeState(cumulativeMap)
}

export let makeState = (cumulativeMap) => ({
   type: 'state',
   cumulativeMap,
   total: cumulativeMap.slice(-1)[0],
   quantity: 1,
   width: 1,
})
