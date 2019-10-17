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
