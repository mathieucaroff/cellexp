export interface Rule {
   dimension: number
   stateCount: number
   neighborhoodSize: number
   number: number
}

export let createElementaryRule = (number: number): Rule => {
   return {
      dimension: 1,
      stateCount: 2,
      neighborhoodSize: 3,
      number,
   }
}
