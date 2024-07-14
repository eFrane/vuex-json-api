(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{214:function(e,t,r){"use strict";r.r(t);var o=r(3),s=Object(o.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h1",{attrs:{id:"development"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#development"}},[e._v("#")]),e._v(" Development")]),e._v(" "),t("p",[e._v("As this library is basically a "),t("a",{attrs:{href:"https://vuex.vuejs.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vuex"),t("OutboundLink")],1),e._v("-Plugin, some\nunexpected weirdness may come the way of a developer. Most of which come\ndown to naming differences between the "),t("jsonapi"),e._v(" and the Vuex contexts:")],1),e._v(" "),t("ul",[t("li",[e._v("Resource types in "),t("jsonapi"),e._v(" are namespaced modules in Vuex")],1),e._v(" "),t("li",[e._v("This library makes rather extensive use of "),t("a",{attrs:{href:"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy",target:"_blank",rel:"noopener noreferrer"}},[e._v("Proxy"),t("OutboundLink")],1),e._v(" objects,\nmostly to keep Vuex's reactivity magic getting to places where it would\ndo more harm than good.")])]),e._v(" "),t("h2",{attrs:{id:"testing"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#testing"}},[e._v("#")]),e._v(" Testing")]),e._v(" "),t("p",[e._v("The test setup is based around "),t("a",{attrs:{href:"https://jestjs.io",target:"_blank",rel:"noopener noreferrer"}},[e._v("Jest"),t("OutboundLink")],1),e._v(",\n"),t("a",{attrs:{href:"http://www.wheresrhys.co.uk/fetch-mock/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Fetch Mock"),t("OutboundLink")],1),e._v(" and the "),t("a",{attrs:{href:"http://vue-test-utils.vuejs.org",target:"_blank",rel:"noopener noreferrer"}},[e._v("Vue Test Utils"),t("OutboundLink")],1),e._v(".")]),e._v(" "),t("p",[e._v("When testing interactions against a "),t("jsonapi"),e._v(", "),t("code",[e._v("tests/apiMock.js")]),e._v("\nprovides a few helpers:")],1),e._v(" "),t("table",[t("thead",[t("tr",[t("th",[e._v("Method")]),e._v(" "),t("th",[e._v("Description")])])]),e._v(" "),t("tbody",[t("tr",[t("td",[t("code",[e._v("initApiMockServer(): void")])]),e._v(" "),t("td",[e._v("Configures "),t("code",[e._v("fetch-mock")]),e._v(" with several correct "),t("jsonapi"),e._v(" responses")],1)]),e._v(" "),t("tr",[t("td",[t("code",[e._v("initApiMock(): ResourcefulApi")])]),e._v(" "),t("td",[e._v("Configures a "),t("code",[e._v("ResourcefulApi")]),e._v(" against the mock server methods")])]),e._v(" "),t("tr",[t("td",[t("code",[e._v("getVuexContextForResourceType(ResourcefulApi api, string type): { commit, dispatch, getters, state }")])]),e._v(" "),t("td",[e._v("Returns the Vuex context from a configured api module")])])])])])}),[],!1,null,null,null);t.default=s.exports}}]);