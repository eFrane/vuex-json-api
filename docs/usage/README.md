# Usage

## Structure

This library offers a plugin for Vuex which integrates with a Json:Api Server.
The general plugin structure is:

<mermaid>
graph TD
Plugin-->ResourcefulAPI
Plugin-->Router
Router-->ResourcefulAPI
ResourcefulAPI-->API
ResourcefulAPI-->Builder
</mermaid>
