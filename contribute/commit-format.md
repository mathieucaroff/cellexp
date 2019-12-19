# Commit format

> domain (context verb): description
>
> keywords
>
> long-description

or, alternatively:

> domain (**verb object**): description
>
> keywords
>
> long-description

Domains, verbs and moods are listed in the [commit word list](./commit-word-list.md).

---

***WIP***

*The format presented in this document is a recommendation. Feel free to
follow it strictly, loosly or not at all depending on the context, your mood
or your opinion.*

## Summary

- Removing useless delimiters
- Glossary
- Structure of a commit message
  - General: the context form
  - Alternative: the object form
- Case and punctuation
- Multeity
- Optional parts

## Removing useless delimiters

All parts of the commit message format are optional, with some exceptions (listed in [Optional parts](#user-content--optional-parts), below). When a delimiter becomes useless because some parts are ommited, remove it.

Format example with long-description:

> domain (context)
>
> long-description

Other format examples:

> domain (context verb): description
>
> domain: description
>
> context: description
>
> context verb: description
>
> domain
>
> context
>
> domain (verb context): description
>
> verb context: description
>
> verb context

## Glossary

commit message head: the first line of a commit message

commit message body: the part of a commit message after the first blank line

multeity: putting several instances of a thing, where a single instance is
expected

## Structure of a commit message

### General: the context form

```THE_COMMIT_MESSAGE_FORMAT
domain (context verb): description

keywords

long-description
```

where

domain is one of a finite list of domains defined and described in a document of
the project (you can use new domain names, you just need to define them in that
document too)

verb is one of a finite list of actions defined in a document of the project

context, together with the domain, describes _where the change takes place_; it
defines a scope

context is one of:

- a file name
- a partial path or full path to a file or directory in the project
  - either way, it must be written in a relative path style, i.e. without a
    leading slash
- a noun describing some part of the repository

keywords are not restricted to a list, but it is good to have a list of the
common keywords to settle which ones to pick among synonyms

description is any other information you want to provide, but respecting the
commit message header length limit of 50 characters

long-description holds more detailed information about the commit

### Alternative: the object form

```
domain (verb context): description

keywords

long-description
```

With this second commit message form, the context is in second position and is called context-object and may be referred to as object.

This form means that the verb does not apply only partially to the
context-object, but applies completely to it. It applies to the totality of what
is designated by the context-object. By contrast, with the "Context form", the
verb applies only to a part of what is designated by the context, and the
context designates the container of what the verb affects.

In the object form, the context-object is expected to clearly designate the
affected part of the application. By contrast, the context form tolerates more
ambiguous contexts when using a noun as context.

A typical example of use of the object form is when adding a file to version
control, or removing one:

```
add README.md
```

```
package (add jest)
```

## Case and punctuation

`domain`, `verb` and `description` shall start with a lowercase letter.
`description` shall have no period.
`full-description` may adopt any style, though using full sentence with capital
letter and period is recommended.

## Multeity

Avoid using multeity. If you must do it, use a comma-separated list.

Multeity is most acceptable with the verb(s), and is the least acceptable with
the context(s), whose singularity is defining.

## Optional parts

Everything is optional, but:

- put at least a domain or a context
- no verb without a context

---

All parts are optional, with the two following limits:

- the domain and the context may not be simultaneously omitted. At least one of
  them must be present
- if the context is omitted, the there may not be any verb

Whenever a group becomes empty, the punctuation used to delimit that group shall
be ommitted. See [Removing useless delimiters](#user-content--removing-useless-delimiters).

## Copyleft

This file is dedicated to public domain (CC0 1.0).
