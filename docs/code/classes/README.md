# Available Classes

## Builder

JsonApi-based module builder for Vuex

This module builder will create a vuex module based on the assumption of
working with valid json api resources.

- the proposed json api 1.1 pagination style meta attributes
  (-> https://jsonapi.org/format/1.1/#fetching-pagination)

<a href="Builder.html">Builder</a>
## FosJsRoutingRouter

Pluggable api router if you're using Symfony and the FosJsRouting Bundle

<a href="FosJsRoutingRouter.html">FosJsRoutingRouter</a>
## JsonApiRouter

A simple router implementation querying a json:api endpoint which delivers all
necessary route information

The endpoint must return a list of Route objects:

```json
{
    "data": [
        {
            "type": "Route",
            "id": "api.route.list",
            "attributes": {
                "parameters": [],
                "url": "api/route",
                "method": "list"
            }
       },
       {
           "type": "Route",
           "id": "api.route.get",
           "attributes": {
               "parameters": [
                   "id"
               ],
               "url": "api/route/{id}",
               "method": "get"
           }
       }
    ]
}
```

To initialize this router, simply `new` it with the desired fetch path,
e.g. `new JsonApiRouter('/api/route')`.

<a href="JsonApiRouter.html">JsonApiRouter</a>
## Route



<a href="Route.html">Route</a>
## Router

Basic router implementation for the ResourcefulApi.

Automagically creating api bound modules builds on
an understanding of the available routes. To
easily instantiate a Store bound to an endpoint,
route information for that endpoint must be provided.

Since every endpoint is implemented differently and
the choice where this route information comes from
should be left to the endpoint developer, this
library only assumes that route loading is usually an
asynchronous process which eventually returns and
has a set of keyed-by-name `Route` objects in
`this.routes`.

<a href="Router.html">Router</a>
## StaticRouter

Static router

It may be desirable to not do an additional request
for getting the api routes and instead bake them into
the code. To this avail, the `StaticRouter` can be
initialized with a POJO of { id, url, parameters }
whereas parameters are parts of the url which can be replaced.

<a href="StaticRouter.html">StaticRouter</a>
