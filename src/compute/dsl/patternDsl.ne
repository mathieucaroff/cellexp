@include "./partial/common.ne"

@include "./patternPostprocessor.ne"

main -> pattern {% first %}

pattern -> flag group {% pattern %}

flag -> [!^=#] {% flag %}

group -> none element:+ {% group('visible') %}
hiddenGroup -> ":?" element:+ {% group('hidden') %}

none -> null
# `none` Will produce one empty array when used
# while `null` is purely omitted from the output

element ->
  maybeQuantified[stateSingle] {% first %}
| maybeQuantified[bracketed[stateSet]] {% first %}
| quantified[parenthesized[group]] {% first %}
| maybeQuantified[parenthesized[hiddenGroup]] {% first %}

stateSingle -> (state) {% patternSet %}

stateSet -> state:+ {% patternSet %}

state -> "0" {% zero %} | "1" {% one %}
