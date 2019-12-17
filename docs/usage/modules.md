# Modules

**Table of Contents**

[[toc]]

Modules are auto-configured to have just the right set of mutations, actions and getters.
Generated modules always manage their own loading state, so you don't have to worry about
that. They also know as much as possible about communicating with your backend, leaving you free
to worry about less boring things like creating awesome user experiences.

## State

The basic state structure is different depending on whether we're dealing
with a collection or a single item. Additionally, `vuex-json-api` offers
the capability to handle multiple sets of a collection, in which case all of the
below is a little more complicated.

<mermaid>
  graph TD
  R[Routes for Module]-->StateDecider
  StateDecider{Module has `list`-Route}-->|True|SColl
  StateDecider-->|False|SSingle
  SColl[Initial state for a collection resource endpoint]-->S
  SSingle[Initial state for a single-resource endpoint]-->S
  S[State]
</mermaid>

**Base state for items**

<<< @/src/module/state/item.js

**Base state for collections**

<<< @/src/module/state/collection.js

### The fields

**item/items**:

This is the container for the normalized resource objects of the
module. If the module is not a collection, there will always only
be one item, thus it's singularized.

**initial**:

Once any data-changing mutation is applied to the state,
the store will automatically copy the affected resource object
into `initial`. This is always either empty or a map of `id => ResourceObject`

**currentPage/totalPages**:

If the API responses contain pagination information in `meta`
this will be stored in these properties and subsequently
used/updated upon navigation

## Mutations

### Default Mutations

| Name         | Description                                            |
|--------------|--------------------------------------------------------|
| reset        | Reset the state of the module to it's initial state    |
| set          | Set the data for **one** object                        |
| update       | Change a property of an object                         |
| startLoading | Enable the loading state of the module*                |
| endLoading   | Disable the loading state of the module*               |

_On the loading state_: Loading state may only indicate loading of a subset
of the module.

### Additional Mutations

In addition to the above, some module types may have more mutations:

- Modules that represent a collection resource get a
  `setPagination` mutation which handles pagination meta
  information according to JSON:API v1.1

- Modules which have a `DELETE` route registered to them get a `remove`
  mutation

### Calling mutations without dispatching an action

The short answer is "don't do it". Here be dragons and stuff.
The longer answer is that you can of course call mutations (by mapping
them with `mapMutations`) in your Vue components but you probably
shouldn't. The mutations created by this library handle several
intricate edge cases based on agreed-upon input parameters which
the actions provided by this library take care in passing.
If you're willing to pay very close attention to the parameters
any particular mutation expects, go ahead. If not, be aware of
the possibly destructive consequences.

## Actions

| Name     | Description                  |
|----------|------------------------------|
| get      | Get a single item            |
| reset    | Reset the module state       |
| list     | Get a list of items          |
| set      | Set an item's data           |
| update   | Update an item on the server |

<mermaid>
graph TD
Builder-- add actions to Module -->Route
Route-->CollDec
CollDec{isCollection}-->list
Route-->CreateDec
CreateDec{allowsCreation}-->create
Route-->ModDec
ModDec{allowsModification}-->update
ModDec-->set
</mermaid>

## Getters
