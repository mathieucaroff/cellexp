@include "./util.ne"

@include "./common.ne"

@include "./borderPostProcessor.ne"

# Group implements quantified
group -> element:+ {% ([elementList]) => {
   return {
      type: 'group',
      content: elementList,
      quantity: 1,
      width: sum(elementList),
   }
} %}

# Element implements quantified
element ->
  maybeQuantified[simpleState] {% first %}
| maybeQuantified[bracketed[stochasticState]] {% first %}
| quantified[parenthesized[group]] {% first %}

# State implements quantified
simpleState -> stateNumber {% simpleState %}
stochasticState -> maybeQuantified[qStateNumber]:+ {% stochasticState %}

# StateNumber
stateNumber -> "0" {% zero %} | "1" {% one %}

# QStateNumber implements quantified
qStateNumber -> stateNumber {% withQuantity %}
