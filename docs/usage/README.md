# Usage

## Structure

This library offers a plugin for Vuex which integrates with a Json:Api Server.
The general plugin structure is:

<mermaid>
graph LR
Plugin-->ResourcefulAPI
Plugin-->Router
Router-->ResourcefulAPI
ResourcefulAPI-->API
ResourcefulAPI-->Builder
</mermaid>

## Modules

Modules are auto-configured to have just the right set of mutations, actions and getters.
Generated modules always manage their own loading state, so you don't have to worry about
that. They also know as much as possible about communicating with your backend, leaving free
to worry about less boring things like creating awesome user experiences.

### State

<<< @/src/module/State.js

### Module Builder Decision Graphs

### Initial state

<mermaid>
  graph TD
  R[Routes for Module]-->StateDecider
  StateDecider{Module has `list`-Route}-->|True|SColl
  StateDecider-->|False|SSingle
  SColl[Initial state for a collection resource endpoint]-->S
  SSingle[Initial state for a single-resource endpoint]-->S
  S[State]
</mermaid>

### Actions and Mutations
