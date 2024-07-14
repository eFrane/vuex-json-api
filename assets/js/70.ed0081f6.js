(window.webpackJsonp=window.webpackJsonp||[]).push([[70],{212:function(t,a,e){"use strict";e.r(a);var s=e(3),n=function(t){t.options.__data__block__={mermaid_382ee14d:"  graph TD\n  R[Routes for Module]--\x3eStateDecider\n  StateDecider{Module has `list`-Route}--\x3e|True|SColl\n  StateDecider--\x3e|False|SSingle\n  SColl[Initial state for a collection resource endpoint]--\x3eS\n  SSingle[Initial state for a single-resource endpoint]--\x3eS\n  S[State]\n"}},r=Object(s.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"modules"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#modules"}},[t._v("#")]),t._v(" Modules")]),t._v(" "),a("p",[a("strong",[t._v("Table of Contents")])]),t._v(" "),a("p"),a("div",{staticClass:"table-of-contents"},[a("ul",[a("li",[a("a",{attrs:{href:"#state"}},[t._v("State")]),a("ul",[a("li",[a("a",{attrs:{href:"#the-fields"}},[t._v("The fields")])])])]),a("li",[a("a",{attrs:{href:"#mutations"}},[t._v("Mutations")]),a("ul",[a("li",[a("a",{attrs:{href:"#default-mutations"}},[t._v("Default Mutations")])]),a("li",[a("a",{attrs:{href:"#additional-mutations"}},[t._v("Additional Mutations")])]),a("li",[a("a",{attrs:{href:"#calling-mutations-without-dispatching-an-action"}},[t._v("Calling mutations without dispatching an action")])])])]),a("li",[a("a",{attrs:{href:"#actions"}},[t._v("Actions")]),a("ul",[a("li",[a("a",{attrs:{href:"#get"}},[t._v("get")])]),a("li",[a("a",{attrs:{href:"#reset"}},[t._v("reset")])]),a("li",[a("a",{attrs:{href:"#list"}},[t._v("list")])]),a("li",[a("a",{attrs:{href:"#set"}},[t._v("set")])]),a("li",[a("a",{attrs:{href:"#update"}},[t._v("update")])])])]),a("li",[a("a",{attrs:{href:"#getters"}},[t._v("Getters")])])])]),a("p"),t._v(" "),a("p",[t._v("Modules are auto-configured to have just the right set of mutations, actions and getters.\nGenerated modules always manage their own loading state, so you don't have to worry about\nthat. They also know as much as possible about communicating with your backend, leaving you free\nto worry about less boring things like creating awesome user experiences.")]),t._v(" "),a("h2",{attrs:{id:"state"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#state"}},[t._v("#")]),t._v(" State")]),t._v(" "),a("p",[t._v("The basic state structure is different depending on whether we're dealing\nwith a collection or a single item. Additionally, "),a("code",[t._v("vuex-json-api")]),t._v(" offers\nthe capability to handle multiple sets of a collection, in which case all of the\nbelow is a little more complicated.")]),t._v(" "),a("Mermaid",{attrs:{id:"mermaid_382ee14d",graph:t.$dataBlock.mermaid_382ee14d}}),a("p",[a("strong",[t._v("Base state")])]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" collection "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("loading")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("items")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("initial")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("currentPage")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("totalPages")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("urlInfo")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("options")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" item "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("loading")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("item")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("initial")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("options")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")])])])]),a("h3",{attrs:{id:"the-fields"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#the-fields"}},[t._v("#")]),t._v(" The fields")]),t._v(" "),a("p",[a("strong",[t._v("item/items")]),t._v(":")]),t._v(" "),a("p",[t._v("This is the container for the normalized resource objects of the\nmodule. If the module is not a collection, there will always only\nbe one item, thus it's singularized.")]),t._v(" "),a("p",[a("strong",[t._v("initial")]),t._v(":")]),t._v(" "),a("p",[t._v("Once any data-changing mutation is applied to the state,\nthe store will automatically copy the affected resource object\ninto "),a("code",[t._v("initial")]),t._v(". This is always either empty or a map of "),a("code",[t._v("id => ResourceObject")])]),t._v(" "),a("p",[a("strong",[t._v("currentPage/totalPages")]),t._v(":")]),t._v(" "),a("p",[t._v("If the API responses contain pagination information in "),a("code",[t._v("meta")]),t._v("\nthis will be stored in these properties and subsequently\nused/updated upon navigation")]),t._v(" "),a("h2",{attrs:{id:"mutations"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mutations"}},[t._v("#")]),t._v(" Mutations")]),t._v(" "),a("h3",{attrs:{id:"default-mutations"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#default-mutations"}},[t._v("#")]),t._v(" Default Mutations")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("reset")]),t._v(" "),a("td",[t._v("Reset the state of the module to it's initial state")])]),t._v(" "),a("tr",[a("td",[t._v("set")]),t._v(" "),a("td",[t._v("Set the data for "),a("strong",[t._v("one")]),t._v(" object")])]),t._v(" "),a("tr",[a("td",[t._v("update")]),t._v(" "),a("td",[t._v("Change a property of an object")])]),t._v(" "),a("tr",[a("td",[t._v("startLoading")]),t._v(" "),a("td",[t._v("Enable the loading state of the module*")])]),t._v(" "),a("tr",[a("td",[t._v("endLoading")]),t._v(" "),a("td",[t._v("Disable the loading state of the module*")])])])]),t._v(" "),a("p",[a("em",[t._v("On the loading state")]),t._v(": Loading state may only indicate loading of a subset\nof the module.")]),t._v(" "),a("h3",{attrs:{id:"additional-mutations"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#additional-mutations"}},[t._v("#")]),t._v(" Additional Mutations")]),t._v(" "),a("p",[t._v("In addition to the above, some module types may have more mutations:")]),t._v(" "),a("ul",[a("li",[a("p",[t._v("Modules that represent a collection resource get a\n"),a("code",[t._v("setPagination")]),t._v(" mutation which handles pagination meta\ninformation according to JSON:API v1.1")])]),t._v(" "),a("li",[a("p",[t._v("Modules which have a "),a("code",[t._v("DELETE")]),t._v(" route registered to them get a "),a("code",[t._v("remove")]),t._v("\nmutation")])])]),t._v(" "),a("h3",{attrs:{id:"calling-mutations-without-dispatching-an-action"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#calling-mutations-without-dispatching-an-action"}},[t._v("#")]),t._v(" Calling mutations without dispatching an action")]),t._v(" "),a("p",[t._v('The short answer is "don\'t do it". Here be dragons and stuff.\nThe longer answer is that you can of course call mutations (by mapping\nthem with '),a("code",[t._v("mapMutations")]),t._v(") in your Vue components but you probably\nshouldn't. The mutations created by this library handle several\nintricate edge cases based on agreed-upon input parameters which\nthe actions provided by this library take care in passing.\nIf you're willing to pay very close attention to the parameters\nany particular mutation expects, go ahead. If not, be aware of\nthe possibly destructive consequences.")]),t._v(" "),a("h2",{attrs:{id:"actions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#actions"}},[t._v("#")]),t._v(" Actions")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Name")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("get")]),t._v(" "),a("td",[t._v("Get a single item")])]),t._v(" "),a("tr",[a("td",[t._v("reset")]),t._v(" "),a("td",[t._v("Reset the module state")])]),t._v(" "),a("tr",[a("td",[t._v("list")]),t._v(" "),a("td",[t._v("Get a list of items")])]),t._v(" "),a("tr",[a("td",[t._v("set")]),t._v(" "),a("td",[t._v("Set an item's data")])]),t._v(" "),a("tr",[a("td",[t._v("update")]),t._v(" "),a("td",[t._v("Update an item on the server")])])])]),t._v(" "),a("mermaid",[t._v("\ngraph TD\nBuilder-- add actions to Module --\x3eRoute\nRoute--\x3eCollDec\nCollDec{isCollection}--\x3elist\nRoute--\x3eCreateDec\nCreateDec{allowsCreation}--\x3ecreate\nRoute--\x3eModDec\nModDec{allowsModification}--\x3eupdate\nModDec--\x3eset\n")]),t._v(" "),a("h3",{attrs:{id:"get"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#get"}},[t._v("#")]),t._v(" get")]),t._v(" "),a("h3",{attrs:{id:"reset"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#reset"}},[t._v("#")]),t._v(" reset")]),t._v(" "),a("h3",{attrs:{id:"list"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#list"}},[t._v("#")]),t._v(" list")]),t._v(" "),a("p",[t._v("instead of an Id-String, you can pass an Object with an Id-Key and and option key.")]),t._v(" "),a("table",[a("thead",[a("tr",[a("th",[t._v("Available Options")]),t._v(" "),a("th",[t._v("Description")])])]),t._v(" "),a("tbody",[a("tr",[a("td",[a("code",[t._v("sendUnchangedAttributes")])]),t._v(" "),a("td",[t._v("If you want to send explicit attributes that are not (necessarily) changed. (accepts an string or array of attributes)")])]),t._v(" "),a("tr",[a("td",[a("code",[t._v("sendFullAttributes")])]),t._v(" "),a("td",[t._v("To send whole Attributes insead of the changed delta of an Array or Object. (accepts an string or array of attributes)")])])])]),t._v(" "),a("h3",{attrs:{id:"set"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#set"}},[t._v("#")]),t._v(" set")]),t._v(" "),a("h3",{attrs:{id:"update"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#update"}},[t._v("#")]),t._v(" update")]),t._v(" "),a("h2",{attrs:{id:"getters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#getters"}},[t._v("#")]),t._v(" Getters")])],1)}),[],!1,null,null,null);"function"==typeof n&&n(r);a.default=r.exports}}]);