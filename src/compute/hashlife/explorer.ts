/**
 * See dispacth schema READEMD.md
 *
 * Explorer is able to go through the cell tree with the following methods:
 *
 * - request (which caches image-s in imageMap)
 * - putBoildedContent (which caches boiledContent-s in boiledContentMap)
 * - putContent
 *
 * It is responsible of caching the intermediate results for `boiledContent` and
 * `image`, and discarding these when needed.
 */
export let createExplorer = () => {
   return {}
}
