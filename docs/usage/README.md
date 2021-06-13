# Usage

## Structure

This library offers a plugin for Vuex which integrates with a [<jsonapi />](https://jsonapi.org) Server.
The general plugin structure is:

<mermaid>
graph LR
Plugin-->ResourcefulAPI
Plugin-->Router
Router-->ResourcefulAPI
ResourcefulAPI-->API
ResourcefulAPI-->Builder
</mermaid>
