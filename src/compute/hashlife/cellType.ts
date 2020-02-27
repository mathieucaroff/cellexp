export interface BaseCell {
   id: number
   __table: Record<number, Cell>
}

export interface AirCell extends BaseCell {
   type: 'air'
   left: Cell
   right: Cell
   result: () => Cell
}

export type Atom = number[]

export interface GroundCell extends BaseCell {
   type: 'ground'
   left: Atom
   right: Atom
   result: () => Atom
   level: 0
}

export type Cell = AirCell | GroundCell

// hash:
// - (Air) concatenation of children ids
// - (Ground)
