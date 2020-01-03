# Cellular Automaton Explorer 1D - src

This README file describes the responsibilities of each **module**.

## Mcompute

Computation of various cellular automata. Perform pattern detection.

**Mcompute** is responsible for the state and the cache of the cellular automaton,
especially the initialisation of the automaton. It also holds the list of "divine intervention".

## Mdisplay

Display 1D or 2D cellular automata. Consumes information relative to the
navigation. For instance : the area being displayed, the zoom level, the size of the canvas.

**Mdisplay** is responsible for autoscrolling down.
**Mdisplay** is responsible for holding the canvas and the drawing context.
**Mdisplay** queries the compute module to obtain the values to display.
**Mdisplay** holds intermediate draw results to allow performant draw operations.

## Mstate

Declares the shape of the global state, and the default state.

## Mui

Gathers the ui components.

### Mui-control

Provide a UI to configure the display (position, zoom) and the cellular
automaton initialisation. Allow to do live changes to the automata.

### Mui-editor

Describe the cellular automaton rule and allow to change it.
Changing the cellular automaton can be done by changing inputting its rule number

## Mutil

Misc utilitary files.

## Mwww

Contains the html entry file, along with the typescript entry file. Also contains the instanciation of global objects (the React context).
