# Hashlife

## Draw dispatch schema

- Each `V` separates a cell level (an automaton `|`) from it's child.

```
| me.request(area, draw, output)
V
| me.request
V
| me.request
V
| {@policy.imageLevel} ->>
| request.output({ image: me.image, area })
| me.image =>> request.draw(me.boiledContent)
| me.boiledContent <=> me.putBoiledContent
V
| me.putBoiledContent
V
| me.putBoiledContent
V
| {@policy.boilLevel} ->>
| me.boiledContent =>> boil(me.content)
| me.content <=> me.putContent(area, draw, output)
V
| me.putContent
V
| me.putContent
V
GROUND me.putContent
```
