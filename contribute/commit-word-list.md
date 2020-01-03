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

- simulator
  - compute
  - display
- ui
  - editor -- rule editor
  - control -- simulation configurator

## verbe

### differencial verbs

- add
- change -- replace something by something else
- delete
- update -- add / change / delete

### progress verbs

- carry -- from WIP to WIP
- complete -- reach a form of completness

### goal verbs

- fix
- bugfix
- typofix
- rewrite -- a lot was thrown away and recreated

### refactor verbs

- clarify
- clean
- reclarify ("refactor")
- reclean ("refactor")
- rename
- restructure

### documentation verbs

- explain
- doc-change
- doc-clean

## moods

### used moods

- `+` big / major
- `-` small / minor
- `~` work in progress

### unused moods

- `#` fix
- `&` feature
- `$` quantified / measured
- `@` inside
- `!`, `%`, `^`, `*`, `_`, `=`
- `;`, `:`, `\`, `|`, `,`, `.`, `/`, `?`
