# Router

This plugin contains several router implementations. The main purpose of
the router in vuex-json-api is to provide the resources for `ResourcefulApi`.
In effect, routes define the available modules by defining the possible
request space.

## Available Router implementations

### StaticRouter

Generates a Router with a set of manually configured Routes.

### JsonApiRouter

Generates a Router by requesting route data from a json:api endpoint.

## `Route`

A Route configures the specific endpoint in relation to the `baseUrl`.

| Param | Type | Description |
| --- | --- | --- |
| module | `String` | has to match the name of the requested type |
| action | `String` | see supported [apiMethods][1] |
| url | `String` | can be relative (to the baseUrl) or absolute (then it will bypass the "module name check" and create a storeModule named like the defined by the module param. independet of the type given by the response). |
| parameters | `Array` | (Optional) |

## I want my own router

If the provided router implementations don't suit your needs you can
always just extend the `Router` class and write your own. In the simplest
case, overriding `updateRoutes()` should do the trick.

[1]: /usage/requests.html#the-two-api-classes
