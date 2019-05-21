---
sidebar: auto
displayAllHeaders: true
activeHeaderLinks: true
---
## Publishing

To publish a new (development) version run

npm version patch

To increase the patch version and

npm publish

To post to npm.

## Developing

This project uses `yarn` for package management.

To install/update dependencies:

```sh
$ yarn
```

To run the local dev-environment:

```sh
$ yarn dev
```

To run the unit tests:

```
$ yarn test # for a single run
$ yarn test --watch # for continuous running
```

Tests are written with Jest + vue-test-utils.

## Proxy Objects for Vuex Mutations

To provide mutations for the api-bound modules, ES Proxy Objects are created
for the possible ways in which a module's state should be mutable. Note that
not all of the generated mutations may be intended for out-of-module use. But
since using mutations outside of vuex without going through an action first is
considered bad practice anyway, this should not pose a problem.

### The Proxy -> Mutation Parameter mapping

Given a Vuex mutation

```js
const module {
  mutations: {
    mutation (state, payload) {}
  }
}
```

callable by

```js
commit('module/mutation', payload)
```

can be created with the Proxy object

```js
const mutation = new Proxy(
  (state, payload) => {}, // give a base mutation function as input
  {
    /**
     * @param {object} target The object this mutation is being applied to, i.e. the above mutation function
     * @param {object} thisArg The current module instance
     * @param {Array} argArray The arguments of the above mutation function, argArray[0] == state, argArray[1] == payload
     **/
    apply: (target, thisArg, argArray) {
      const [ state, payload ] = argArray
    }
  }
)
```
