## Navigation Panning Design

This will require the following:

- A Keyboard manager

  - Can be set to use either key or code, not both
  - ~~Refuse to subscribe two events on the same handle~~
    - ~~Allow the second function only if it mentions the first one,
      and tell in what order they should be executed
      "`next()`"~~
      - No this just sucks. Let's just accept to re-engineer the application.
  - Can be discarded
  - -> Reuse the keyboard manager of JsTetris? (jst.acq.js)
    - Re-reading it will be sufficient

- A Mouse manager
  - Exposes a click subscription interface
  - Exposes a drag / drop subscription interface
  - Adds / removes mousemove listener on mousedown / mouseup
    - Record the position of the mouse on mousedown (offsetX, offsetY)
    - Forwards mousemove information to the subscriber

### Keyboard manager

Time estimate: 4h
2020-01-15T22:34+01 -> 2020-01-15T23:06+01 :: writing `display/keyboardManager.ts`
2020-01-15T23:06+01 -> 2020-01-16T00:09+01 :: moving arrows and centering them (2x the expected time)
2020-01-16T00:09+01 -> 2020-01-16T00:22+01 :: moving the display block to the top (.7x the expected time)
2020-01-16T00:23+01 -> 2020-01-16T00:30+01 :: changing the button symbols (.7x the expected time)
2020-01-16T07:13+01 -> 2020-01-16T07:45+01 :: disabling arrow that cannot be used (1.5x the expected time)
:: Move key logic to display.tsx

#### Todo

- ~~Disable keys that cannot be used [20 min]~~
- Move key logic to display.tsx, and use the hub to send events [40 min]
  - Prevent logic from moving generation below 0 [5 min - included]
- Adding a file in `display/` which does binding of the keyboard keys between the manager and the hub [30 min]
- Reconfigure now.sh to have a shorter address for :develop builds

#### Design

- Hook keydown on the right element
- Allow to subscribe a function to a keypress
- Allow to subscribe two functions to the keydown and the keyup events

(no: Allow to query the state of any key)

- Allow to remove a subscription
