# Commit verb list

This files lists domain and verbs to use in commits. See the [commit format description](./commit-format.md).

## domain

### external

- project
  - activity
  - reqs
  - spec
  - design
  - etude
  - diapo
- package
- doc

### discovery

- proto

### modules

- scripts
- src

- data -- partially generated data, along with their generation script
- simulator
  - compute
  - display
- state
- ui
  - editor -- rule editor
  - control -- simulation configurator
- util
- www
- info

## verbe

### differencial verbs

- add
- change -- replace something by something else
- delete
- update -- add / change / delete
- bump -- increase a counter

### progress verbs

- carry -- from WIP to WIP
- complete -- reach a form of completness
- improve -- from finished to finished

### goal verbs

- fix
- bugfix
- typofix
- rewrite -- a lot was thrown away and recreated

### refactor verbs

- clarify
- clean
- move
- reclarify ("refactor")
- reclean ("refactor")
- remove (factor out)
- rename
- reordre
- restructure
- simplify

### documentation verbs

- explain
- extend
- doc-change
- doc-clean

## moods

### used moods

- `+` big / major
- `-` small / minor
- `~` work in progress
- `;` part of an unfinished series of commits
- `!` last of a series of commits

### unused moods

- `#` fix
- `&` feature
- `$` quantified / measured
- `@` inside
- `%`, `^`, `*`, `_`, `=`
- `:`, `\`, `|`, `,`, `.`, `/`, `?`
