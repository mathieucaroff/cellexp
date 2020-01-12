## Navigation Panning Design

This will require the following:

- A Keyboard manager

  - Can be set to use either key or code, not both
  - Refuse to subscribe two events on the same handle
  - Can be discarded
  - -> Reuse the keyboard manager of JsTetris? (jst.acq.js)
    - Re-reading it will be sufficient

- A Mouse manager
  - Exposes a click subscription interface
  - Exposes a drag / drop subscription interface
  - Adds / removes mousemove listener on mousedown / mouseup
    - Record the position of the mouse on mousedown (offsetX, offsetY)
    - Forwards mousemove information to the subscriber
