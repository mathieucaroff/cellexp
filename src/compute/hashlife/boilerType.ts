export interface Boiler {
   marginLeft: number
   marginRight: number
   marginTop: number
   boil: BoilerFunction
}

export type BoilerFunction = (input: Content) => BoiledContent

export type Content = number[][]

export type BoiledContent = BoiledPoint[][]

export interface BoiledPoint {
   state: number
   patternNumber: number
}
