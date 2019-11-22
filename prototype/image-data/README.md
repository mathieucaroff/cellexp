# CAE1D Flasher

## What is it?

CAE1D Flasher / CAE1D Prototype 0 is an elementary cellular automton simulator.
It simulates the 256 elementary rules (0-255).

It can be used with the three following hash parameters:

- `#auto` - play various interesting rules one after the other
- `#rule=N` - where N is an integer (interpreted modulo 256) simulate the specified rule; you'll want to remove `#auto` as it'll likely bother you
- `#pause` - puts the simulator in pause; removing it resumes playing

### Local install

```
cd prototype/image-data
yarn install
```

### Develop locally

Run the typescript compiler:

```
yarn tsc --watch -p prototype/image-data
```

Run any local web server. Here's how to do it with python 3:

```
cd prototype/image-data && python -m http.server
```

### Deploy with `now`

_after `now login`_

```
cd prototype/image-data
yarn tsc
mkdir build
cp index.html index.js build
cd build
now --name cae1d-flasher .
```
