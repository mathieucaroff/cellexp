export interface Policy {
   /** [just one more assert. probably equal to boiledContentMaxLevel] */
   contentMaxLevel: number
   /** [boiledContent -> content] */
   boiledContentMinLevel: number
   /** [draw -> boiledContent] */
   boiledContentMaxLevel: number
}
