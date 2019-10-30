# Router

## `StaticRouter(routes)`
Generates a Router with a set of manual configured Routes.

| Param | Type | Description |
| --- | --- | --- |
| routes | <code>Array</code> | accepts Array of Route-Objects (see Routes) |


***


## `Route`
A Route is a POJO to configure the specific endpoint in relation to the baseUrl.

| Param | Type | Description |
| --- | --- | --- |
| module | <code>String</code> | has to match the name of the requested type |
| action | <code>String</code> | see supported [apiMethods][1] |
| url | <code>String</code> | can be relative (to the baseUrl) or absolute (then it will bypass the "module name check" and create a storeModule named like the defined by the module param. independet of the type given by the response). |
| parameters | <code>Array</code> | (Optional) |


[1]: /code/#isCollection
