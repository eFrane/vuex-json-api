# API

## Functions

<dl>
<dt><a href="#createVuexStore">`createVuexStore(staticModules, router)`</a> ⇒ <code>Promise.&lt;Store&gt;</code></dt>
<dd><p>Create Vuex Store with API Plugin</p>
</dd>
<dt><a href="#getAction">`getAction(api, moduleName)`</a></dt>
<dd><p>Get a resource from a</p>
</dd>
<dt><a href="#listAction">`listAction(api, moduleName)`</a></dt>
<dd><p>Get a resource list</p>
</dd>
<dt><a href="#removeMutation">`removeMutation(isCollection)`</a></dt>
<dd><p>Remove a ResourceObject from a module&#39;s item(s)</p>
<p>As with most mutations, the behaviour of deletion is slightly
different depending on wether we&#39;re dealing with a collection or
a single item.</p>
<p>If we&#39;re working on a collection, this mutation has to called as
<code>commit(&#39;module/remove&#39;, id)</code>, while, when working with an item,
calling <code>commit(&#39;module/remove&#39;)</code> is sufficient. For convenience,
any payload given is ignored when in item-only operation.</p>
</dd>
<dt><a href="#resetMutation">`resetMutation(isCollection)`</a></dt>
<dd><p>Proxy for resetting a Module</p>
</dd>
<dt><a href="#setMutation">`setMutation(store, isCollection)`</a></dt>
<dd><p>Proxy for setting Resource Objects on a Module</p>
<p>Depending on the type of module (collection or single item)
setting has two different behaviours and thus also two different
signatures.</p>
<p>The <code>Vuex.commit</code>-Syntaxes for those different styles are</p>
<ul>
<li><code>commit(&#39;module/set&#39;, object)</code> for single item modules and</li>
<li><code>commit(&#39;module/set&#39;, { id, object })</code> for collection-type modules</li>
</ul>
<p>Setting an object results in it being added to or updated in
the <code>item</code>/<code>items</code> property of the module state.</p>
</dd>
<dt><a href="#initialState">`initialState(isCollection)`</a></dt>
<dd><p>Return a new Object representing the initial state of a module</p>
<p>The state is returned from inside a self-calling closure to
make absolutely sure we get pristine objects. This is a safety
measure to guard against unintended cross-module reference bindings.</p>
<h2 id="the-fields">The fields</h2>
<p><strong>item/items</strong>:</p>
<p>This is the container for the normalized resource objects of the
module. If the module is not a collection, there will always only
be one item, thus it&#39;s singularized.</p>
<p><strong>initial</strong>:</p>
<p>Once any data-changing mutation is applied to the state,
the store will automatically copy the affected resource object
into <code>initial</code>. This is always either empty or a map of <code>id =&gt; ResourceObject</code></p>
<p><strong>currentPage/totalPages</strong></p>
<p>If the API responses contain pagination information in <code>meta</code>
this will be stored in these properties and subsequently
used/updated upon navigation</p>
</dd>
<dt><a href="#isCollection">`isCollection(apiMethods)`</a></dt>
<dd><p>Check whether the api supports collections</p>
</dd>
<dt><a href="#createVueInstance">`createVueInstance(store, components, mountedCallback)`</a> ⇒ <code>Promise.&lt;Vue&gt;</code></dt>
<dd></dd>
<dt><a href="#prepareModuleHashMap">`prepareModuleHashMap(modules)`</a></dt>
<dd><p>Converts a module listing object (e.g. <code>{ myModule: myModule }</code>)
to the expected syntax for module registration.</p>
<p>By default, this Vuex usage interpretation expects non-api-bound
modules to have a <code>name</code>-property which defines their namespaced
name. This is necessary to facilitate auto-registration of the modules.</p>
<p>N.b.: There is no checking done to avoid overwrites of these modules
by later-to-be-initialized api-bound modules.</p>
</dd>
<dt><a href="#checkConfigProperty">`checkConfigProperty(config, property)`</a></dt>
<dd></dd>
<dt><a href="#initJsonApiPlugin">`initJsonApiPlugin(config)`</a></dt>
<dd><p>Initialize the API Plugin</p>
<p>May receive a configuration object but at least
needs a configured router.</p>
</dd>
</dl>

<a name="createVuexStore"></a>

## `createVuexStore(staticModules, router)` ⇒ <code>Promise.&lt;Store&gt;</code>
Create Vuex Store with API Plugin

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| staticModules | <code>object</code> | non-dynamic modules |
| router | <code>route.Router</code> |  |


* * *

<a name="getAction"></a>

## `getAction(api, moduleName)`
Get a resource from a

**Kind**: global function  

| Param | Type |
| --- | --- |
| api | <code>ResourcefulApi</code> | 
| moduleName | <code>String</code> | 


* * *

<a name="listAction"></a>

## `listAction(api, moduleName)`
Get a resource list

**Kind**: global function  

| Param | Type |
| --- | --- |
| api | <code>ResourcefulApi</code> | 
| moduleName | <code>String</code> | 


* * *

<a name="removeMutation"></a>

## `removeMutation(isCollection)`
Remove a ResourceObject from a module's item(s)

As with most mutations, the behaviour of deletion is slightly
different depending on wether we're dealing with a collection or
a single item.

If we're working on a collection, this mutation has to called as
`commit('module/remove', id)`, while, when working with an item,
calling `commit('module/remove')` is sufficient. For convenience,
any payload given is ignored when in item-only operation.

**Kind**: global function  

| Param | Type |
| --- | --- |
| isCollection | <code>Boolean</code> | 


* * *

<a name="resetMutation"></a>

## `resetMutation(isCollection)`
Proxy for resetting a Module

**Kind**: global function  

| Param | Type |
| --- | --- |
| isCollection | <code>Boolean</code> | 


* * *

<a name="setMutation"></a>

## `setMutation(store, isCollection)`
Proxy for setting Resource Objects on a Module

Depending on the type of module (collection or single item)
setting has two different behaviours and thus also two different
signatures.

The `Vuex.commit`-Syntaxes for those different styles are

- `commit('module/set', object)` for single item modules and
- `commit('module/set', { id, object })` for collection-type modules

Setting an object results in it being added to or updated in
the `item`/`items` property of the module state.

**Kind**: global function  

| Param | Type |
| --- | --- |
| store | <code>Vuex.Store</code> | 
| isCollection | <code>Boolean</code> | 


* * *

<a name="initialState"></a>

## `initialState(isCollection)`
Return a new Object representing the initial state of a module

The state is returned from inside a self-calling closure to
make absolutely sure we get pristine objects. This is a safety
measure to guard against unintended cross-module reference bindings.

## The fields

**item/items**:

This is the container for the normalized resource objects of the
module. If the module is not a collection, there will always only
be one item, thus it's singularized.

**initial**:

Once any data-changing mutation is applied to the state,
the store will automatically copy the affected resource object
into `initial`. This is always either empty or a map of `id => ResourceObject`

**currentPage/totalPages**

If the API responses contain pagination information in `meta`
this will be stored in these properties and subsequently
used/updated upon navigation

**Kind**: global function  

| Param | Type |
| --- | --- |
| isCollection | <code>Boolean</code> | 


* * *

<a name="isCollection"></a>

## `isCollection(apiMethods)`
Check whether the api supports collections

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| apiMethods | <code>object</code> | supported api methods (list, get, update, delete) |


* * *

<a name="createVueInstance"></a>

## `createVueInstance(store, components, mountedCallback)` ⇒ <code>Promise.&lt;Vue&gt;</code>
**Kind**: global function  
**Category**: Initialization  

| Param | Type |
| --- | --- |
| store | <code>Vuex.Store</code> | 
| components | <code>Vue</code> \| <code>object</code> | 
| mountedCallback | <code>function</code> | 


* * *

<a name="prepareModuleHashMap"></a>

## `prepareModuleHashMap(modules)`
Converts a module listing object (e.g. `{ myModule: myModule }`)
to the expected syntax for module registration.

By default, this Vuex usage interpretation expects non-api-bound
modules to have a `name`-property which defines their namespaced
name. This is necessary to facilitate auto-registration of the modules.

N.b.: There is no checking done to avoid overwrites of these modules
by later-to-be-initialized api-bound modules.

**Kind**: global function  
**Category**: Initialization  

| Param | Type |
| --- | --- |
| modules | <code>object</code> \| <code>array</code> | 


* * *

<a name="checkConfigProperty"></a>

## `checkConfigProperty(config, property)`
**Kind**: global function  
**Category**: Initialization  

| Param | Type |
| --- | --- |
| config | <code>object</code> | 
| property | <code>String</code> | 


* * *

<a name="initJsonApiPlugin"></a>

## `initJsonApiPlugin(config)`
Initialize the API Plugin

May receive a configuration object but at least
needs a configured router.

**Kind**: global function  
**Category**: Initialization  

| Param | Type | Description |
| --- | --- | --- |
| config | [<code>Router</code>](#Router) \| <code>object</code> | or router |


* * *

