export interface Rule {
   stateCount: number
   neighborhoodSize: number
   number: number
}

export let createElementaryRule = (number: number): Rule => {
   return {
      stateCount: 2,
      neighborhoodSize: 3,
      number,
   }
}
