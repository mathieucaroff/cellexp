## CellExp Navigation Specification

## Panning

The panning feature can be served via an **inorganic**, numeric interface, allowing to enter the location to display. While such an interface handles well the needs of precision panning, and fast remote access, it is also slow to use and attention-demanding.

There are some cases where it's nice to be able to pan around without having to
select a field and type in it. We expect that more than 50% of these cases can
be served by allowing to click-and-pan (click and drag), moving the image to
follow the pointer. Some more cases can be served with the keyboard arrows, or
alternatively, on phone, with panning arrow buttons, placed near the display,
probably at it's top. These kind of interfaces can be labelled of **organic**
for their greater ease of use, eventhough their possibilities are more limited.

### Panning Specification

#### Inorganic panning

It is possible to set the currently displayed location via text fields. This
corresponds to the features (**Fconfig-post-t** and **Fconfig-post-x**, defined
in `doc-project-fr/etude/fonctionnalite.md`).

#### Drag to pan

The feature is described above. The image is moved to follow the pointer or the
finger while the mouse is clicked or while the finger is held down
(**Fnav-pan-drag**).

#### Arrow navigation

Support the following arrows for horizontal movement (**Fnav-pan-horiz**):

- `<`, `>`, [ArrowLeft, ArrowRight] to perform small moves toward the left or
  right.
- `<<`, `>>`, [Home, End], to go to the left end and right end of the ribbon.
  These arrows are disabled if the ribbon doesn't have a border in the direction
  of the arrow.
- `::` (no keyboard key) to go to the center, for ribbons which have borders
  on both sides.
- `⬵`, `⤁` (no keyboard key) to move by left or right by one whole display
  size.

Support the following arrows for vertical movement (**Fnav-pan-vert**):

- `^`, `v`, [ArrowUp, ArrowDown] to perform small moves up or down.
- `⇞`, `⇟`, [PageUp, PageDown] to move up or down by one whole display size.
- `⏏` (no keyboard key) to go back to the top of the simulation

Note about `<`, `>`, `⬵`, and `⤁`: Over ribbons that have borders, it's not possible to go past the borders.

Note about `^` and `⇞`: Going up past the beginning is not possible: `posT` doesn't go below 0.

Credit to Xahlee's work on [Unicode Arrows](http://xahlee.info/comp/unicode_arrows.html).

#### Panning and autoscrolling (playing)

While play is on, **Fnav-pan-drag-vert** will be disabled, while **Fnav-pan-drag-horiz** is still usable.

Using any horizontal arrow will be possible and will have the expected
horizontal move effect.

Using any vertical arrow will be possible and will stop autoscrolling and have the expected vertical move effect.
