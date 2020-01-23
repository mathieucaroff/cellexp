## Cellexp Specification Thinking Draft for navigation

## Panning

Options :

- Drag and drop on the display
  - Add inertia
  - Drag and drop but accelerated (acceleration factor)
- Arrows on the sides of the display
  - Arrows inside the rendering area
  - Arrows outside the rendering area
- Scroll bars
- Minimap?
- Keyboard arrows

There seem to be few useable options among the above:

- Drag and drop
- Keyboard arrows

### Keyboard keys

- Use up the keyboard keys
- Probably use up the `home` and `end` keys too
- Requires the user to try using them to discover the feature
- New behaviour than when a text field is selected, so it'd be better to limit
  them to when the display component is selected (/ focused ~)
- Allows going from one border to the other (`home` / `end`)
- Allows precise fast navigation
- **Unavailable on phones**

### Drag and drop panning

- Use up the mouse or touchscreen
  - But **Fshow-propagation** and **Fca-divine-intervention** also require it
- Slow to navigate large distances, such as to go from one border to the other
  - Maybe add a minimap? Maybe propose a "scroll anywhere" mode or a "click to jump" mode
    - Problems with the minimap, with the "click to jump" behavior for infinit maps
    - Let's only implement a "scroll anywhere" mode
    - Problem with the "scroll anywhere" mode: when the map is big, it becomes
      unprecise.
- User needs to click in the display to discover the feature

What about panning arrows at the top of the display?

-- Stop
