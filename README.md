# Cellexp - Cellular Automaton Explorer 1d

A cellular automaton (CA) explorer to understand and unveil properties of CAs in 1D.

[![Cellexp preview](doc/img/cellexp-screencap.png)](https://cellexp.now.sh)

## Try it out

The first version of Cellexp has been [deployed to Now.sh](https://cellexp.now.sh) (aka Zeit.co).

## Alternatives

- [ECAX](https://www.xanxys.net/ecax/) - Zoom, Navigation, Compute-on-demand
- [ECA Canvas](http://www.cs.swan.ac.uk/~csandy/research/play/ca/) - Size, Border, Random
- [Celldemo](http://devinacker.github.io/celldemo/) - Autoscrolling, Impuse, Random proportion,
- [WoflramAlpha](https://www.wolframalpha.com/input/?i=rule+110) - Description (symétries, propriétés, classe), Propagation differentielle

## Study and roadmap

Find the french presentation of the projet in [doc-projet-fr](./doc-project-fr/).

### Feature list

#### Planned features

(including some optional features)

The number preceding the feature name is the number of the release it's expected
to be shipped in. A feature when it has been shipped in a release.

- [x] (1) **Fca-compute**
- [x] (1) **Fca-show**
- [x] (1) **Fca-size**
- [x] (1) **Fca-theme**
- [x] (1) **Fconfig-hot**
- [x] (1) **Fconfig-size**
- [x] (1) **Fconfig-speed**
- [x] (1) **Fconfig-theme**
- [x] (1) **Fedit-bases**
- [x] (1) **Fnav-speed**
- [x] (2) **Fconfig-pause**
- [ ] (2) **Fconfig-pos-t**
- [ ] (2) **Fconfig-pos-x**
- [ ] (2) **Fconfig-step-by-step**
- [ ] (2) **Fconfig-zoom**
- [ ] (2) **Fnav-custom-resize**
- [ ] (2) **Fnav-jump**
- [ ] (2) **Fnav-pan-horiz**
- [ ] (2) **Fnav-pan-vert**
- [x] (2) **Fnav-pause**
- [ ] (2) **Fnav-step**
- [ ] (3) **Fca-border**
- [ ] (3) **Fconfig-border**
- [ ] (3) **Fconfig-pattern-grid**
- [ ] (3) **Fconfig-pattern-horiz**
- [ ] (3) **Fpattern-grid**
- [ ] (3) **Fpattern-horiz**
- [ ] (3) **Fpattern-select**
- [ ] (4) **Finfo-condensed**
- [ ] (4) **Finfo-ignore**
- [ ] (4) **Finfo-linear**
- [ ] (4) **Finfo-totalistic**
- [x] (4) **Fload-symmetry**
- [ ] (5) **Fnav-zoom**
- [ ] (5) **Fpattern-110**

#### Unplanned optional features

- [ ] **Fca-custom-redimension**
- [ ] **Fconfig-custom-redimension**
- [ ] **Fconfig-custom-resize**
- [ ] **Fconfig-reason**
- [ ] **Fnav-resize**
- [ ] **Fscripting**

## Release calendar

The releases are planned for the following dates:

1. (2019-01-05)
2. (2019-01-19)
3. (2019-02-02)
4. (2019-02-16)
5. (2019-03-01)

## Prototypes

### CAE1D Flasher

Find it in git with tag `rm-flasher`.

This prototype resided in `prototype/image-data`. It served to prove that there
was way to make JS rendering fast enough that we could rely solely on JS for
the rendering.

N.B: This uses the `ctx.putImageData` API.

The prototype has been deployed to [cae1d-flasher.now.sh](cae1d-flasher.now.sh).
It may or may not still be online today.

### GLSL Sandbox

Find it in git with tag `rm-glslsandbox`.

This prototype served to prove that the bare minimum communication between JS
and WebGL was possible and efficient enough to be used in the project.

The WebGL prototype was written on glslsandbox.com. It should be available as
specimen [#58247.4](http://glslsandbox.com/e#58247.4).

N.B: move your mouse around or nothing will be happen.

### Babylon

This prototype proved Babylon way too slow to be used as a rendering engine for
the project.

Find it in git with tag `rm-babylon`. (It's really boring though.)

## Other tags for deleted sources

The tag `rm-measure` was set before the removal of the `measure/` folder.
That folder contained some `.putImageData` related speed measures. It's not very
interesting.
