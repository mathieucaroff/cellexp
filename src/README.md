# Cellular Automaton Explorer 1D - src

This README file presents the structure of the project, the responsibility of each module, the interfaces and the event model in the project.

## Content

- [Structure](#structure)
  - [UI layer](#ui-layer)
  - [Display layer](#display-layer)
  - [Compute layer](#compute-layer)
- [Modules](#modules)
  - [Directory structure overview](#directory-structure-overview)
  - [compute](#compute)
  - [display](#display)
  - [state](#state)
  - [ui](#ui)
    - [ui-control](#ui-control)
    - [ui-editor](#ui-editor)
  - [util](#util)
  - [www](#www)
- [Event model](#event-model)

## Structure

The project is structured in layers. Each layer is aware of the layer directly below it, it. A layer is always a module, though a module is not always
a layer.

Layers:

```txt
ui
|
display
|
compute
```

### UI layer

The UI is written in React. It reads and alter the state of the display layer.

### Display layer

The display layer uses MobX to trigger recomputes and rerenders when the display needs to be updated. The display layer includes the state of the application.

A part of the state of the display layer is directly writable, this part is managed by the `state` module. Another part can only be written to by the methods exposed by the display class, see `display/act.ts`.

### Compute layer

The compute layer offers an interface to compute an elementary rule given its number.

## Modules

This part describe the each module and their responsibility

### Directory structure overview

```
/compute -- the entry point is `compute.ts`
/data -- all files are entry points
/display -- the entry point is `display.ts`
/state -- all files are entry points
/ui/control -- all files at the root are entry points
/ui/editor -- the entry point is `Editor.tsx`
/ui/info --  all files at the root are entry points
/util -- each file is meant to be imported as needed from anywhere -- they are all entry points.
/www -- this is the entry point of the application, used by the build system
      | - the html entry point is `page.html`
      | - the TypeScript entry point is `start.ts`
```

### compute

Computation of various cellular automata.

**compute** is responsible for the state and the cache of the cellular automaton, especially the initialization of the automaton.

### display

Display 1D or 2D cellular automata. Consumes information relative to the navigation. For instance: the area being displayed, the zoom level, the size of the canvas.

**display** is responsible for autoscrolling down.
**display** is responsible for holding the canvas and the drawing context.
**display** queries the compute module to obtain the values to display.
**display** holds intermediate draw results to allow efficient draw operations.

### state

Declares the shape of the global state, and the default state.

### ui

Gathers the ui components.

#### ui-control

Provide a UI to configure the display (position, zoom) and the cellular
automaton initialization. Allow to do live changes to the automata.

#### ui-editor

Describe the cellular automaton rule and allow to change it.
Changing the cellular automaton can be done by changing inputting its rule number

### util

Misc utilitary files.

### www

Contains the html entry file, along with the typescript entry file. Also contains the instanciation of global objects (the React context).

## Event model

The communication between modules is purely based on MobX. Running the update
functions is done by MobX. Whenever a MobX-managed state that is has been read
by the update function is modified, MobX re-runs the said function. Update
functions are declared to MobX using the `autorun` endpoint.

The application does not use any other tool for inter-module communication.

The UI part of the application is written in React. It uses the `observer` component decorator, from the `mobx-react-lite` to get the components to
automatically re-render whenever a state that they consume is modified. Note
that most of the time, they are the own author of said modification.
