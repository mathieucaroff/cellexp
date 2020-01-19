# Cellexp Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [v0.1.2] - 2020-01-19

### Added

- Zoom, between 1 and 50
- Mini control
  - It's an area below the render area of the display with buttons such as:
  - play / pause
  - single step
  - speed halving / doubling
  - zoom increase / decrease
  - panning
- Keyboard controls
  - When the render area is selected, the following keys are active:
  - Space does play/pause
  - Enter does a single step
  - `-` and `+` do zoom decrease and increase (`_` and `=` work too)
  - `[` and `]` do having and doubling the speed
  - `{`, `|` and `}` do go to the left end, the right end or the center
  - The directional arrows move the camera in the given direction by a twelfth
    of the width or the heigth of the camera
  - The Home / End / PageUp / PageDown keys move the camera by the full width or heigth of the camera
  - Note: There is no way to jump to the top for the time being
- Panning
  - With mouse
  - With keyboard arrows
  - With buttons in the mini control area
  - -- The possible movement are:
  - go left / right / up / down, small moves or big (page) moves
  - go to the left end / the right end / the center / the top
- Dark mode
  - By default the application is in dark mode. It can be set to light mode
    using the "App Theme" selector, in the "Application Config" section, at the bottom.
- Application theme
  - Besides the light / drak mode, the primary color of the application can be
    chosen among 8 options (5 in dark mode, 3 in light mode)
  - By default, the display theme follows the application theme, but it can be
    set to its own theme using the "Display Theme" selector

### Changed

- Speed
  - High limit raised from 99 to 999
  - Low limit raised from 0 to 1
- Border behaviour
  - The border now copies the state from the other side of the cellular space,
    making the state space (state band) a closed loop
- Layout
  - The display is now at the top
- Position (temporal)
  - Limit raised form 9_999 to 99_999
  - The field is now disabled while the automaton is playing
  - The field no longer starts erroring when the position goes above the limit
    while playing
- Rule number
  - The rule number is now shown in more places than before
- Improved the application layout for phones

## [v0.1.1] - 2020-01-05

### Added

- Version info
  - the version is displayed at the top right
- Github link
  - the link to the source code repository is present at the top right of the
    page

### Changed

- Improved layout and contrasts

## [v0.1.0] - 2020-01-05

### Added

- Suggested rules
- Different numerical bases to input a rule's number: 10, 2, 4, 16
- Indicate the rules that are symmetric to the current rule
  - Indicate if the rule is symmetric itself (self-symmetric)
  - Rules indicators are clickable
- Computing any cellular automaton
- Rule display
  - Color theme for cells
- Autoscrolling

  - Play / Pause button
  - Speed field
  - Reset button
  - Generation time indicator

- Setting the cellular automaton's size (computational width)
- Foldable pannels
- Reroll button: Change the random initialisation of the rule
- Setting the canvas height
