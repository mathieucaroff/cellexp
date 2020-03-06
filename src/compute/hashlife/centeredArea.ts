import { Pair } from '../../util/RectType'

/**
 * Area specified by the position of it's center, and it's horizontal and vertical sizes (width and height)
 *
 * If the width is even, it's evenly split on each side of the center. If the width is odd, the negative side is favored. Same goes for the height.
 */
export interface CenteredArea {
   center: Pair
   /**
    * @property {} size.x width
    * @property {} size.y height
    */
   size: Pair
}
