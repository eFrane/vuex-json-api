# Requests

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
