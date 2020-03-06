export let first = ([value]) => value
export let second = ([_, value]) => value

export let compose = (...fArgs) => (arg) => {
   let res = fArgs.reduce((acc, fun) => fun(acc), arg)
   return res
}

export let log = (name) => (f) => (value) => {
   let res = f(value)
   console.log(name, value, res)
   return res
}

export let either = (primary, alternative) => {
   if (primary !== null && primary !== undefined) {
      return primary
   } else {
      return alternative
   }
}
