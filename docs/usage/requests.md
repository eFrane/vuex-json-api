# Requests

## The two API classes

This library comes with two classes carrying "Api" in their name. One
is simply called `Api`. That is a very basic wrapper around the
[`axios`-Library][1] which is concerned with request configuration
and basic response and error handling. The second one listens to
`ResourcefulApi`. This one is the main server communication interface
used by the module's actions.

### Resource request methods

| Name    | Intention                    |
|---------|------------------------------|
| get     | Request a single resource    |
| list    | Request a list of resources  |
| create  | Create a new resource        |
| replace | Replace an existing resource |
| update  | Update an existing resource  |
| delete  | Delete an existing resource  |

## What happens during an action?

### Example

Given a properly routed API Endpoint `api/book/` which will return a list
of books, in the `book` module

<mermaid>
sequenceDiagram
  activate ResourcefulApi
  Module-xResourcefulApi: Get me a `book.list` please?
  activate Api
  ResourcefulApi-xApi: Hey, can you do a `GET` on books?
  deactivate Api
  ResourcefulApi-xModule: Here's your data
  deactivate ResourcefulApi
</mermaid>

[1]: https://github.com/axios/axios
