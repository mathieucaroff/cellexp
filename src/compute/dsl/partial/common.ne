@include "./util.ne"

@{%
/**
 * If given a non-null quantity, adujst x's quantity and width accordingly
 */
let maybeQuantified = ([[element], maybeQuantity]) => {
   let quantity = either(maybeQuantity, 1)
   element.quantity *= quantity
   element.width *= quantity
   return element
}
%}

# Macros

## Parenthesing

parenthesized[X] -> "(" $X ")" {% compose(second, first) %}
bracketed[X] -> "[" $X "]" {% compose(second, first) %}

## Quantification

quantified[element] -> $element quantity {% maybeQuantified %}
maybeQuantified[element] -> $element quantity:? {% maybeQuantified %}

quantity -> "{" integer "}" {% second %}

# Integer
integer -> [0-9]:+ {% ([digitList]) => +digitList.join('') %}
