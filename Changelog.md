# v0.0.35

_2021-07-02_

- use correct mutation on save (@hwiem)
- do not add data object to resource on save (@hwiem)
- use correct mutation on restoreFromInitial (@hwiem)

# v0.0.34

_2021-06-14_

- Collection resources are now set all at once after list calls which
  significantly boosts loading performance. 


# v0.0.33
_2021-05-28_

- hasRelationship should work for all types of relationships (@mathisdemos)
- resource building should work for null relationships (@mathisdemos)
- move helpers to utils (@eFrane)

v0.0.31 / 2021-04-22
==================

  * pass resourceFull Object instead of undefined

v0.0.30 / 2021-04-20
====================

  * v0.0.30
  * docs: Remove bogus changelog entry
  * docs: Update changelog
  * ci: Fix husky
  * docs: Simplify the PR template
  * v0.0.29
  * docs: Keep a changelog
  * Merge pull request #184 from eFrane/dependabot/npm_and_yarn/docs/ssri-6.0.2
  * Merge pull request #185 from eFrane/pass_data_for_requests
  * fix(): pass data from actions
  * chore(deps): bump ssri from 6.0.1 to 6.0.2 in /docs
  * Merge pull request #183 from eFrane/dependabot/npm_and_yarn/eslint-plugin-vue-7.9.0
  * chore(deps-dev): bump eslint-plugin-vue from 7.8.0 to 7.9.0

0.0.30 / 2021-04-20
==================

  * ci: Fix husky
  * docs: Simplify the PR template
  * Merge pull request #185 from eFrane/pass_data_for_requests
  * chore(deps): bump ssri from 6.0.1 to 6.0.2 in /docs
  * Merge pull request #183 from eFrane/dependabot/npm_and_yarn/eslint-plugin-vue-7.9.0

v0.0.29 / 2021-04-15
====================

  * v0.0.29
  * docs: Keep a changelog
  * Merge pull request #182 from eFrane/f_pass_responses_from_actions
  * feat(): pass responses from actions
  * v0.0.28
  * docs: Keep a changelog
  * Merge pull request #179 from eFrane/b_fix_missing_apiMethods
  * Merge branch 'master' into b_fix_missing_apiMethods
  * chore(deps-dev): bump @babel/preset-env from 7.13.12 to 7.13.15
  * chore(deps-dev): bump @babel/core from 7.13.14 to 7.13.15
  * chore(deps-dev): bump eslint-plugin-jest from 24.3.4 to 24.3.5
  * chore(deps-dev): bump eslint from 7.23.0 to 7.24.0
  * fix: Linting
  * feat: Allow disabled/skipped tests
  * fix: Tests
  * feat: Use modern jest syntax
  * feat: Pass request parameters to api methods
  * Apply suggestions from code review
  * Merge pull request #176 from eFrane/dependabot/npm_and_yarn/babel/preset-env-7.13.15
  * chore(deps-dev): bump @babel/preset-env from 7.13.12 to 7.13.15
  * Merge pull request #177 from eFrane/dependabot/npm_and_yarn/babel/core-7.13.15
  * chore(deps-dev): bump @babel/core from 7.13.14 to 7.13.15
  * Merge pull request #175 from eFrane/dependabot/npm_and_yarn/eslint-plugin-jest-24.3.5
  * chore(deps-dev): bump eslint-plugin-jest from 24.3.4 to 24.3.5
  * Merge pull request #174 from eFrane/dependabot/npm_and_yarn/eslint-7.24.0
  * chore(deps-dev): bump eslint from 7.23.0 to 7.24.0
  * fix(): make Linter happy
  * fix(): make Linter happy
  * fix(): pass resourceProxy from presetModule to ModuleBuilder
0.0.29 / 2021-04-15
==================

  * Merge pull request #182 from eFrane/f_pass_responses_from_actions
  * feat(): pass responses from actions
  * v0.0.28
  * docs: Keep a changelog
  * Merge pull request #179 from eFrane/b_fix_missing_apiMethods
  * Merge branch 'master' into b_fix_missing_apiMethods
  * chore(deps-dev): bump @babel/preset-env from 7.13.12 to 7.13.15
  * chore(deps-dev): bump @babel/core from 7.13.14 to 7.13.15
  * chore(deps-dev): bump eslint-plugin-jest from 24.3.4 to 24.3.5
  * chore(deps-dev): bump eslint from 7.23.0 to 7.24.0
  * fix: Linting
  * feat: Allow disabled/skipped tests
  * fix: Tests
  * feat: Use modern jest syntax
  * feat: Pass request parameters to api methods
  * Apply suggestions from code review
  * Merge pull request #176 from eFrane/dependabot/npm_and_yarn/babel/preset-env-7.13.15
  * chore(deps-dev): bump @babel/preset-env from 7.13.12 to 7.13.15
  * Merge pull request #177 from eFrane/dependabot/npm_and_yarn/babel/core-7.13.15
  * chore(deps-dev): bump @babel/core from 7.13.14 to 7.13.15
  * Merge pull request #175 from eFrane/dependabot/npm_and_yarn/eslint-plugin-jest-24.3.5
  * chore(deps-dev): bump eslint-plugin-jest from 24.3.4 to 24.3.5
  * Merge pull request #174 from eFrane/dependabot/npm_and_yarn/eslint-7.24.0
  * chore(deps-dev): bump eslint from 7.23.0 to 7.24.0
  * fix(): make Linter happy
  * fix(): make Linter happy
  * fix(): pass resourceProxy from presetModule to ModuleBuilder

v0.0.28 / 2021-04-15
====================

  * v0.0.28
  * docs: Keep a changelog
  * fix: Linting
  * feat: Allow disabled/skipped tests
  * fix: Escape the linting error by rewriting the conditional
  * fix: Tests
  * feat: Use modern jest syntax
  * feat: Pass request parameters to api methods
  * Merge pull request #173 from eFrane/fix_build_missing_modules
  * Update src/module/helpers/missingModule.js
  * pass resourceFull Object instead of {}
  * Merge pull request #172 from eFrane/dependabot/npm_and_yarn/babel/core-7.13.14
  * Merge pull request #171 from eFrane/dependabot/npm_and_yarn/husky-6.0.0
  * Merge pull request #170 from eFrane/dependabot/npm_and_yarn/eslint-plugin-jest-24.3.4
  * chore(deps-dev): bump @babel/core from 7.13.13 to 7.13.14
  * chore(deps-dev): bump husky from 5.2.0 to 6.0.0
  * chore(deps-dev): bump eslint-plugin-jest from 24.3.2 to 24.3.4
  * Merge pull request #167 from eFrane/dependabot/npm_and_yarn/babel/preset-env-7.13.12
  * chore(deps-dev): bump @babel/preset-env from 7.13.10 to 7.13.12
  * Merge pull request #169 from eFrane/dependabot/npm_and_yarn/qs-6.10.1
  * Merge pull request #168 from eFrane/dependabot/npm_and_yarn/babel/core-7.13.13
  * Merge pull request #166 from eFrane/dependabot/npm_and_yarn/eslint-plugin-vue-7.8.0
  * Merge pull request #165 from eFrane/dependabot/npm_and_yarn/json-api-normalizer-1.0.4
  * Merge pull request #164 from eFrane/dependabot/npm_and_yarn/eslint-7.23.0
  * docs: Add a note about the current unstableness
  * chore(deps): bump qs from 6.10.0 to 6.10.1
  * chore(deps-dev): bump @babel/core from 7.13.10 to 7.13.13
  * chore(deps-dev): bump eslint-plugin-vue from 7.7.0 to 7.8.0
  * chore(deps): bump json-api-normalizer from 1.0.3 to 1.0.4
  * chore(deps-dev): bump eslint from 7.22.0 to 7.23.0
  * Merge pull request #162 from eFrane/dependabot/npm_and_yarn/eslint-plugin-jest-24.3.2
  * Merge pull request #161 from eFrane/dependabot/npm_and_yarn/husky-5.2.0
  * Merge pull request #160 from eFrane/dependabot/npm_and_yarn/qs-6.10.0
  * Merge pull request #163 from eFrane/b_fix_this_context-1
  * fix(): this-context.
  * chore(deps-dev): bump eslint-plugin-jest from 24.3.1 to 24.3.2
  * chore(deps-dev): bump husky from 5.1.3 to 5.2.0
  * chore(deps): bump qs from 6.9.6 to 6.10.0
  * build: Remove lock file for demo
  * Merge pull request #158 from eFrane/dependabot/npm_and_yarn/eslint-7.22.0
  * Merge pull request #157 from eFrane/dependabot/npm_and_yarn/eslint-plugin-jest-24.3.1
  * Merge pull request #156 from eFrane/dependabot/npm_and_yarn/babel/core-7.13.10
  * Merge pull request #155 from eFrane/dependabot/npm_and_yarn/babel/preset-env-7.13.10
  * Merge pull request #159 from eFrane/dependabot/npm_and_yarn/json-api-normalizer-1.0.3
  * chore(deps): bump json-api-normalizer from 1.0.1 to 1.0.3
  * chore(deps-dev): bump eslint from 7.21.0 to 7.22.0
  * chore(deps-dev): bump eslint-plugin-jest from 24.1.8 to 24.3.1
  * chore(deps-dev): bump @babel/core from 7.13.8 to 7.13.10
  * chore(deps-dev): bump @babel/preset-env from 7.13.9 to 7.13.10
  * docs: Switch badge to GH Workflow
  * ci: Remove jest step from committing
  * ci: Re-init husky
  * Merge pull request #154 from eFrane/dependabot/add-v2-config-file
  * ci: Change versioning strategy
  * Create Dependabot config file
  * fix: Return promise instead of proxy
  * refactor: Use hasOwn
  * feat: Move resource type reasoning to the proxy
  * fix: ResourceProxy has methods in routes prop
  * Merge pull request #148 from eFrane/dependabot/npm_and_yarn/docs/elliptic-6.5.4
  * Merge pull request #147 from eFrane/dependabot/npm_and_yarn/eslint-plugin-vue-7.7.0
  * Merge pull request #146 from eFrane/dependabot/npm_and_yarn/eslint-plugin-jest-24.1.8
  * Merge pull request #145 from eFrane/dependabot/npm_and_yarn/babel/preset-env-7.13.9
  * chore(deps): bump elliptic from 6.5.3 to 6.5.4 in /docs
  * Merge pull request #144 from eFrane/dependabot/npm_and_yarn/husky-5.1.3
  * chore(deps-dev): bump eslint-plugin-vue from 7.6.0 to 7.7.0
  * chore(deps-dev): bump eslint-plugin-jest from 24.1.5 to 24.1.8
  * chore(deps-dev): bump @babel/preset-env from 7.13.8 to 7.13.9
  * chore(deps-dev): bump husky from 5.1.2 to 5.1.3
  * chore: yarn upgrade
  * Merge pull request #134 from eFrane/dependabot/npm_and_yarn/lint-staged-10.5.4
  * Merge pull request #137 from eFrane/dependabot/npm_and_yarn/husky-5.1.2
  * Merge pull request #138 from eFrane/dependabot/npm_and_yarn/vuex-3.6.2
  * Merge pull request #139 from eFrane/dependabot/npm_and_yarn/eslint-7.21.0
  * Merge pull request #136 from eFrane/dependabot/npm_and_yarn/babel-jest-26.6.3
  * Bump eslint from 7.20.0 to 7.21.0
  * Bump babel-jest from 26.3.0 to 26.6.3
  * Merge pull request #140 from eFrane/dependabot/npm_and_yarn/babel/preset-env-7.13.8
  * Merge pull request #141 from eFrane/dependabot/npm_and_yarn/json-api-normalizer-1.0.1
  * Merge pull request #142 from eFrane/dependabot/npm_and_yarn/eslint-plugin-promise-4.3.1
  * Merge pull request #143 from eFrane/dependabot/npm_and_yarn/jest-26.6.3
  * Bump jest from 26.4.2 to 26.6.3
  * Bump eslint-plugin-promise from 4.2.1 to 4.3.1
  * Bump json-api-normalizer from 1.0.0 to 1.0.1
  * Bump @babel/preset-env from 7.13.5 to 7.13.8
  * Bump vuex from 3.5.1 to 3.6.2
  * Bump husky from 5.1.1 to 5.1.2
  * Bump lint-staged from 10.3.0 to 10.5.4
  * ci: Remove travis configuration
  * Merge pull request #127 from eFrane/dependabot/npm_and_yarn/eslint-7.20.0
  * Bump eslint from 7.18.0 to 7.20.0
  * Merge pull request #132 from eFrane/dependabot/npm_and_yarn/axios-0.21.1
  * Merge pull request #130 from eFrane/dependabot/npm_and_yarn/husky-5.1.1
  * Merge pull request #131 from eFrane/dependabot/npm_and_yarn/ini-1.3.8
  * Bump husky from 4.3.8 to 5.1.1
  * Bump axios from 0.20.0 to 0.21.1
  * Bump ini from 1.3.5 to 1.3.8
  * Merge pull request #133 from eFrane/dependabot/npm_and_yarn/node-notifier-8.0.1
  * ci: Rename job
  * Bump node-notifier from 8.0.0 to 8.0.1
  * chore: Update snapshots
  * style: Fix lint errors
  * chore: Remove eslint-plugin-standard
  * ci: unignore yarn.lock
  * feat: Add CI workflow
  * ci: Remove pre-push hook for test run
  * Merge pull request #129 from eFrane/pass_response_through_delete_action
  * pass response through delete actions then
  * fix: merge conflicts in docs
  * Merge branch 'master' into m_master_pressdocs
  * Merge pull request #124 from eFrane/dependabot/npm_and_yarn/eslint-7.18.0
  * Bump eslint from 7.17.0 to 7.18.0
  * Merge pull request #123 from mathisdemos/patch-1
  * actually check if object is empty
  * only empty resource responses should be set directly
  * Merge pull request #122 from eFrane/dependabot/npm_and_yarn/eslint-7.17.0
  * 200 with no content is a valid response
  * Bump eslint from 7.16.0 to 7.17.0
  * Move a few more dependencies to docs
  * Add GH Pages action
  * Separate VuePress docs from main package.json
  * Merge pull request #121 from eFrane/dependabot/npm_and_yarn/eslint-7.16.0
  * Bump eslint from 7.15.0 to 7.16.0
  * Merge pull request #120 from eFrane/dependabot/npm_and_yarn/eslint-7.15.0
  * Bump eslint from 7.14.0 to 7.15.0
  * Merge pull request #119 from eFrane/dependabot/npm_and_yarn/eslint-config-standard-16.0.2
  * Bump eslint-config-standard from 15.0.0 to 16.0.2
  * Merge pull request #118 from eFrane/dependabot/npm_and_yarn/eslint-plugin-standard-5.0.0
  * Merge pull request #117 from eFrane/dependabot/npm_and_yarn/eslint-7.14.0
  * Bump eslint-plugin-standard from 4.1.0 to 5.0.0
  * Bump eslint from 7.11.0 to 7.14.0
  * Merge pull request #113 from eFrane/dependabot/npm_and_yarn/eslint-config-standard-15.0.0
  * Merge pull request #112 from eFrane/dependabot/npm_and_yarn/eslint-plugin-vue-7.1.0
  * Bump eslint-config-standard from 14.1.1 to 15.0.0
  * Bump eslint-plugin-vue from 6.2.2 to 7.1.0
  * Merge pull request #111 from eFrane/dependabot/npm_and_yarn/eslint-7.11.0
  * Bump eslint from 7.10.0 to 7.11.0
  * Merge pull request #109 from eFrane/dependabot/npm_and_yarn/eslint-7.10.0
  * Bump eslint from 7.9.0 to 7.10.0
  * Merge pull request #108 from eFrane/dependabot/npm_and_yarn/eslint-7.9.0
  * Merge pull request #106 from eFrane/f_fix_var_missmatch
  * delete accidentally committed file
  * Bump eslint from 7.8.1 to 7.9.0
  * Bump pressdocs
  * Move reference generation to pressdocs
  * Try moving stuff to pressdocs
  * fix name missmatch of variable
  * Merge branch 'master' into f_tryout_fix_for_dplan
  * Merge pull request #104 from eFrane/dependabot/npm_and_yarn/eslint-plugin-jest-24.0.0
  * Merge pull request #103 from eFrane/dependabot/npm_and_yarn/eslint-7.8.1
  * Bump eslint-plugin-jest from 23.20.0 to 24.0.0
  * Bump eslint from 7.7.0 to 7.8.1
  * Add a bunch of docblock related stuff
  * Add jsdoc based reference documentation
  * Update author name
  * Merge pull request #102 from eFrane/dependabot/npm_and_yarn/eslint-7.7.0
  * Bump eslint from 6.8.0 to 7.7.0
  * Bump preset-env to 7.9
  * Merge pull request #101 from eFrane/dependabot/npm_and_yarn/json-api-normalizer-1.0.0
  * Merge pull request #99 from eFrane/f_add_travis_status
  * Moved to travis-ci.com
  * Add travis status badge to readme
  * Bump json-api-normalizer from 0.4.16 to 1.0.0
  * Replace vue-hasOwn with our hasOwn
  * Merge pull request #97 from eFrane/dependabot/npm_and_yarn/babel-jest-26.0.1
  * Merge pull request #98 from eFrane/dependabot/npm_and_yarn/jest-26.0.1
  * Bump jest from 25.5.4 to 26.0.1
  * Bump babel-jest from 25.5.1 to 26.0.1
  * Merge pull request #96 from eFrane/dependabot/npm_and_yarn/eslint-config-standard-14.1.1
  * Merge pull request #95 from eFrane/f_performance_api
  * Bump eslint-config-standard from 14.1.0 to 14.1.1
  * Merge branch 'master' into f_performance_api
  * Merge pull request #94 from eFrane/f_rewrite_router
  * Use Performance Api instead of console.time
  * [doc] Update hasOwnProperty call to match standard style
  * convenience: extract hasOwnProperty to shorten call
  * refs #93: Get rid of saveAction test
  * Resolve ternary operator
  * Work on docs navigation
  * Merge branch 'master' into f_rewrite_router
  * WIP: Make test work again
  * Clarify router usage
  * Fix test: Method name changed
  * lint fixes
  * Merge branch 'master' into f_rewrite_router
  * Re-structuring documentation
  * Defer creation of resource proxy methods
  * Use map to register modules
  * Extend documentation
  * Use isAbsoluteUri
  * New unit test: JsonApiRouter
  * New unit test: StaticRouter
  * fix route action validation
  * New unit test: Router
  * New unit test: StaticRoute
  * New unit test: JsonApiRoute
  * Preserve trailing whitespace for markdown
  * New unit test: Route
  * Move input sanitation into root class
  * Extract specific route objects

0.0.28 / 2021-04-15
==================

  * fix: Linting
  * feat: Allow disabled/skipped tests
  * fix: Escape the linting error by rewriting the conditional
  * fix: Tests
  * feat: Use modern jest syntax
  * feat: Pass request parameters to api methods
  * Merge pull request #173 from eFrane/fix_build_missing_modules
  * Update src/module/helpers/missingModule.js
  * pass resourceFull Object instead of {}
  * Merge pull request #172 from eFrane/dependabot/npm_and_yarn/babel/core-7.13.14
  * Merge pull request #171 from eFrane/dependabot/npm_and_yarn/husky-6.0.0
  * Merge pull request #170 from eFrane/dependabot/npm_and_yarn/eslint-plugin-jest-24.3.4
  * chore(deps-dev): bump @babel/core from 7.13.13 to 7.13.14
  * chore(deps-dev): bump husky from 5.2.0 to 6.0.0
  * chore(deps-dev): bump eslint-plugin-jest from 24.3.2 to 24.3.4
  * Merge pull request #167 from eFrane/dependabot/npm_and_yarn/babel/preset-env-7.13.12


0.0.27 / 2021-04-10
==================

  * fix: Linting
  * feat: Allow disabled/skipped tests
  * fix: Escape the linting error by rewriting the conditional
  * fix: Tests
  * feat: Use modern jest syntax
  * feat: Pass request parameters to api methods
  * Merge pull request #173 from eFrane/fix_build_missing_modules
  * Update src/module/helpers/missingModule.js
  * pass resourceFull Object instead of {}
  * Merge pull request #172 from eFrane/dependabot/npm_and_yarn/babel/core-7.13.14
  * Merge pull request #171 from eFrane/dependabot/npm_and_yarn/husky-6.0.0
  * Merge pull request #170 from eFrane/dependabot/npm_and_yarn/eslint-plugin-jest-24.3.4
  * chore(deps-dev): bump @babel/core from 7.13.13 to 7.13.14
  * chore(deps-dev): bump husky from 5.2.0 to 6.0.0
  * chore(deps-dev): bump eslint-plugin-jest from 24.3.2 to 24.3.4
  * Merge pull request #167 from eFrane/dependabot/npm_and_yarn/babel/preset-env-7.13.12
  * chore(deps-dev): bump @babel/preset-env from 7.13.10 to 7.13.12
  * Merge pull request #169 from eFrane/dependabot/npm_and_yarn/qs-6.10.1
  * Merge pull request #168 from eFrane/dependabot/npm_and_yarn/babel/core-7.13.13
  * Merge pull request #166 from eFrane/dependabot/npm_and_yarn/eslint-plugin-vue-7.8.0
  * Merge pull request #165 from eFrane/dependabot/npm_and_yarn/json-api-normalizer-1.0.4
  * Merge pull request #164 from eFrane/dependabot/npm_and_yarn/eslint-7.23.0
  * docs: Add a note about the current unstableness
  * chore(deps): bump qs from 6.10.0 to 6.10.1
  * chore(deps-dev): bump @babel/core from 7.13.10 to 7.13.13
  * chore(deps-dev): bump eslint-plugin-vue from 7.7.0 to 7.8.0
  * chore(deps): bump json-api-normalizer from 1.0.3 to 1.0.4
  * chore(deps-dev): bump eslint from 7.22.0 to 7.23.0
  * Merge pull request #162 from eFrane/dependabot/npm_and_yarn/eslint-plugin-jest-24.3.2
  * Merge pull request #161 from eFrane/dependabot/npm_and_yarn/husky-5.2.0
  * Merge pull request #160 from eFrane/dependabot/npm_and_yarn/qs-6.10.0
  * Merge pull request #163 from eFrane/b_fix_this_context-1
  * fix(): this-context.
  * chore(deps-dev): bump eslint-plugin-jest from 24.3.1 to 24.3.2
  * chore(deps-dev): bump husky from 5.1.3 to 5.2.0
  * chore(deps): bump qs from 6.9.6 to 6.10.0
  * build: Remove lock file for demo
  * Merge pull request #158 from eFrane/dependabot/npm_and_yarn/eslint-7.22.0
  * Merge pull request #157 from eFrane/dependabot/npm_and_yarn/eslint-plugin-jest-24.3.1
  * Merge pull request #156 from eFrane/dependabot/npm_and_yarn/babel/core-7.13.10
  * Merge pull request #155 from eFrane/dependabot/npm_and_yarn/babel/preset-env-7.13.10
  * Merge pull request #159 from eFrane/dependabot/npm_and_yarn/json-api-normalizer-1.0.3
  * chore(deps): bump json-api-normalizer from 1.0.1 to 1.0.3
  * chore(deps-dev): bump eslint from 7.21.0 to 7.22.0
  * chore(deps-dev): bump eslint-plugin-jest from 24.1.8 to 24.3.1
  * chore(deps-dev): bump @babel/core from 7.13.8 to 7.13.10
  * chore(deps-dev): bump @babel/preset-env from 7.13.9 to 7.13.10
  * docs: Switch badge to GH Workflow
  * ci: Remove jest step from committing
  * ci: Re-init husky
  * Merge pull request #154 from eFrane/dependabot/add-v2-config-file
  * ci: Change versioning strategy
  * Create Dependabot config file
  * fix: Return promise instead of proxy
  * refactor: Use hasOwn
  * feat: Move resource type reasoning to the proxy
  * fix: ResourceProxy has methods in routes prop
  * Merge pull request #148 from eFrane/dependabot/npm_and_yarn/docs/elliptic-6.5.4
  * Merge pull request #147 from eFrane/dependabot/npm_and_yarn/eslint-plugin-vue-7.7.0
  * Merge pull request #146 from eFrane/dependabot/npm_and_yarn/eslint-plugin-jest-24.1.8
  * Merge pull request #145 from eFrane/dependabot/npm_and_yarn/babel/preset-env-7.13.9
  * chore(deps): bump elliptic from 6.5.3 to 6.5.4 in /docs
  * Merge pull request #144 from eFrane/dependabot/npm_and_yarn/husky-5.1.3
  * chore(deps-dev): bump eslint-plugin-vue from 7.6.0 to 7.7.0
  * chore(deps-dev): bump eslint-plugin-jest from 24.1.5 to 24.1.8
  * chore(deps-dev): bump @babel/preset-env from 7.13.8 to 7.13.9
  * chore(deps-dev): bump husky from 5.1.2 to 5.1.3
  * chore: yarn upgrade
  * Merge pull request #134 from eFrane/dependabot/npm_and_yarn/lint-staged-10.5.4
  * Merge pull request #137 from eFrane/dependabot/npm_and_yarn/husky-5.1.2
  * Merge pull request #138 from eFrane/dependabot/npm_and_yarn/vuex-3.6.2
  * Merge pull request #139 from eFrane/dependabot/npm_and_yarn/eslint-7.21.0
  * Merge pull request #136 from eFrane/dependabot/npm_and_yarn/babel-jest-26.6.3
  * Bump eslint from 7.20.0 to 7.21.0
  * Bump babel-jest from 26.3.0 to 26.6.3
  * Merge pull request #140 from eFrane/dependabot/npm_and_yarn/babel/preset-env-7.13.8
  * Merge pull request #141 from eFrane/dependabot/npm_and_yarn/json-api-normalizer-1.0.1
  * Merge pull request #142 from eFrane/dependabot/npm_and_yarn/eslint-plugin-promise-4.3.1
  * Merge pull request #143 from eFrane/dependabot/npm_and_yarn/jest-26.6.3
  * Bump jest from 26.4.2 to 26.6.3
  * Bump eslint-plugin-promise from 4.2.1 to 4.3.1
  * Bump json-api-normalizer from 1.0.0 to 1.0.1
  * Bump @babel/preset-env from 7.13.5 to 7.13.8
  * Bump vuex from 3.5.1 to 3.6.2
  * Bump husky from 5.1.1 to 5.1.2
  * Bump lint-staged from 10.3.0 to 10.5.4
  * ci: Remove travis configuration
  * Merge pull request #127 from eFrane/dependabot/npm_and_yarn/eslint-7.20.0
  * Bump eslint from 7.18.0 to 7.20.0
  * Merge pull request #132 from eFrane/dependabot/npm_and_yarn/axios-0.21.1
  * Merge pull request #130 from eFrane/dependabot/npm_and_yarn/husky-5.1.1
  * Merge pull request #131 from eFrane/dependabot/npm_and_yarn/ini-1.3.8
  * Bump husky from 4.3.8 to 5.1.1
  * Bump axios from 0.20.0 to 0.21.1
  * Bump ini from 1.3.5 to 1.3.8
  * Merge pull request #133 from eFrane/dependabot/npm_and_yarn/node-notifier-8.0.1
  * ci: Rename job
  * Bump node-notifier from 8.0.0 to 8.0.1
  * chore: Update snapshots
  * style: Fix lint errors
  * chore: Remove eslint-plugin-standard
  * ci: unignore yarn.lock
  * feat: Add CI workflow
  * ci: Remove pre-push hook for test run
  * Merge pull request #129 from eFrane/pass_response_through_delete_action
  * pass response through delete actions then
  * fix: merge conflicts in docs
  * Merge branch 'master' into m_master_pressdocs
  * Merge pull request #124 from eFrane/dependabot/npm_and_yarn/eslint-7.18.0
  * Bump eslint from 7.17.0 to 7.18.0
  * Merge pull request #123 from mathisdemos/patch-1
  * actually check if object is empty
  * only empty resource responses should be set directly
  * Merge pull request #122 from eFrane/dependabot/npm_and_yarn/eslint-7.17.0
  * 200 with no content is a valid response
  * Bump eslint from 7.16.0 to 7.17.0
  * Move a few more dependencies to docs
  * Add GH Pages action
  * Separate VuePress docs from main package.json
  * Merge pull request #121 from eFrane/dependabot/npm_and_yarn/eslint-7.16.0
  * Bump eslint from 7.15.0 to 7.16.0
  * Merge pull request #120 from eFrane/dependabot/npm_and_yarn/eslint-7.15.0
  * Bump eslint from 7.14.0 to 7.15.0
  * Merge pull request #119 from eFrane/dependabot/npm_and_yarn/eslint-config-standard-16.0.2
  * Bump eslint-config-standard from 15.0.0 to 16.0.2
  * Merge pull request #118 from eFrane/dependabot/npm_and_yarn/eslint-plugin-standard-5.0.0
  * Merge pull request #117 from eFrane/dependabot/npm_and_yarn/eslint-7.14.0
  * Bump eslint-plugin-standard from 4.1.0 to 5.0.0
  * Bump eslint from 7.11.0 to 7.14.0
  * Merge pull request #113 from eFrane/dependabot/npm_and_yarn/eslint-config-standard-15.0.0
  * Merge pull request #112 from eFrane/dependabot/npm_and_yarn/eslint-plugin-vue-7.1.0
  * Bump eslint-config-standard from 14.1.1 to 15.0.0
  * Bump eslint-plugin-vue from 6.2.2 to 7.1.0
  * Merge pull request #111 from eFrane/dependabot/npm_and_yarn/eslint-7.11.0
  * Bump eslint from 7.10.0 to 7.11.0
  * Merge pull request #109 from eFrane/dependabot/npm_and_yarn/eslint-7.10.0
  * Bump eslint from 7.9.0 to 7.10.0
  * Merge pull request #108 from eFrane/dependabot/npm_and_yarn/eslint-7.9.0
  * Merge pull request #106 from eFrane/f_fix_var_missmatch
  * delete accidentally committed file
  * Bump eslint from 7.8.1 to 7.9.0
  * Bump pressdocs
  * Move reference generation to pressdocs
  * Try moving stuff to pressdocs
  * fix name missmatch of variable
  * Merge branch 'master' into f_tryout_fix_for_dplan
  * Merge pull request #104 from eFrane/dependabot/npm_and_yarn/eslint-plugin-jest-24.0.0
  * Merge pull request #103 from eFrane/dependabot/npm_and_yarn/eslint-7.8.1
  * Bump eslint-plugin-jest from 23.20.0 to 24.0.0
  * Bump eslint from 7.7.0 to 7.8.1
  * Add a bunch of docblock related stuff
  * Add jsdoc based reference documentation
  * Update author name
  * Merge pull request #102 from eFrane/dependabot/npm_and_yarn/eslint-7.7.0
  * Bump eslint from 6.8.0 to 7.7.0
  * Bump preset-env to 7.9
  * Merge pull request #101 from eFrane/dependabot/npm_and_yarn/json-api-normalizer-1.0.0
  * Merge pull request #99 from eFrane/f_add_travis_status
  * Moved to travis-ci.com
  * Add travis status badge to readme
  * Bump json-api-normalizer from 0.4.16 to 1.0.0
  * Replace vue-hasOwn with our hasOwn
  * Merge pull request #97 from eFrane/dependabot/npm_and_yarn/babel-jest-26.0.1
  * Merge pull request #98 from eFrane/dependabot/npm_and_yarn/jest-26.0.1
  * Bump jest from 25.5.4 to 26.0.1
  * Bump babel-jest from 25.5.1 to 26.0.1
  * Merge pull request #96 from eFrane/dependabot/npm_and_yarn/eslint-config-standard-14.1.1
  * Merge pull request #95 from eFrane/f_performance_api
  * Bump eslint-config-standard from 14.1.0 to 14.1.1
  * Merge branch 'master' into f_performance_api
  * Merge pull request #94 from eFrane/f_rewrite_router
  * Use Performance Api instead of console.time
  * [doc] Update hasOwnProperty call to match standard style
  * convenience: extract hasOwnProperty to shorten call
  * refs #93: Get rid of saveAction test
  * Resolve ternary operator
  * Work on docs navigation
  * Merge branch 'master' into f_rewrite_router
  * WIP: Make test work again
  * Clarify router usage
  * Fix test: Method name changed
  * lint fixes
  * Merge branch 'master' into f_rewrite_router
  * Re-structuring documentation
  * Defer creation of resource proxy methods
  * Use map to register modules
  * Extend documentation
  * Use isAbsoluteUri
  * New unit test: JsonApiRouter
  * New unit test: StaticRouter
  * fix route action validation
  * New unit test: Router
  * New unit test: StaticRoute
  * New unit test: JsonApiRoute
  * Preserve trailing whitespace for markdown
  * New unit test: Route
  * Move input sanitation into root class
  * Extract specific route objects

v0.0.26 / 2020-03-10
====================

  * v0.0.26
  * Merge pull request #92 from eFrane/f_fix_saveAction
  * remove moduleName from saveAction again
  * Merge pull request #91 from eFrane/f_lint_staged
  * Fix path for deepMerge
  * Also run tests if related tests can be found
  * Lint with lint-staged 4 speed
  * Merge pull request #90 from eFrane/f_80_add_options_to_saveAction
  * refs #80: add and fix tests for saveActions
  * refs #80: move attributes-options to own method // fix them
  * refs #80: add deepMerge to saveOptions
  * refs #80: switch from if to switch
  * refs #80: add documentation
  * refs #80: add more saveAction test
  * refs #80: fix saveAction test
  * refs #80: call commit from module not root
  * Merge remote-tracking branch 'origin/f_80_add_options_to_saveAction' into f_80_add_options_to_saveAction
  * fix undefined meta
  * Merge pull request #89 from spiess-demos/f_refactor_saveOptions
  * remove unused fn argument
  * fix logical bug where changedItemState was _always_ assigned currentItemState...
  * do not change object that was passed by reference, instead, return a copy of the object
  * Check for applyable options a little more safely
  * refs #80: make sure changedItemState is not empty
  * refs #80: fix eslint errors
  * Merge branch 'master' into f_80_add_options_to_saveAction
  * Merge pull request #88 from eFrane/f_upgrade_jest
  * Upgrade jest and babel-jest in one go
  * Fix api module registration
  * Merge pull request #86 from eFrane/f_fix_resetting_preset_modules
  * Merge branch 'master' into f_fix_resetting_preset_modules
  * simplify code
  * make presetModuleName available via ModuleBuilder to be able to access the presetModule instead of the (parent)module
  * refs #80: WIP Test saveAction
  * refs #80: WIP add options for saveAction
  * Merge pull request #82 from mathisdemos/f_fix_api_module_registration
  * Merge branch 'master' into f_fix_api_module_registration
  * Merge pull request #81 from eFrane/dependabot/npm_and_yarn/husky-4.0.7
  * fix api module registration
  * refs #80: WIP add options for saveAction
  * Bump husky from 3.1.0 to 4.0.7
  * Merge pull request #77 from eFrane/dependabot/npm_and_yarn/eslint-plugin-node-11.0.0
  * Bump eslint-plugin-node from 10.0.0 to 11.0.0
  * Merge pull request #76 from eFrane/dependabot/npm_and_yarn/eslint-6.8.0
  * Bump eslint from 6.7.2 to 6.8.0
  * Merge pull request #73 from eFrane/dependabot/npm_and_yarn/eslint-6.7.2
  * Bump eslint from 6.7.1 to 6.7.2
  * Merge pull request #70 from eFrane/f_65_simplify_rel_attr
  * Merge branch 'master' into f_65_simplify_rel_attr
  * Merge remote-tracking branch 'origin/f_65_simplify_rel_attr' into f_65_simplify_rel_attr
  * refs #65: restore relationsship access
  * refs #65: add some more tests
  * refs #65: return error instead of null
  * Merge remote-tracking branch 'origin/master' into f_65_simplify_rel_attr
  * Merge pull request #72 from eFrane/dependabot/npm_and_yarn/eslint-6.7.1
  * Bump eslint from 6.6.0 to 6.7.1
  * Merge branch 'master' into f_65_simplify_rel_attr
  * Merge remote-tracking branch 'origin/master' into f_65_simplify_rel_attr
  * refs #65: minimal testing
  * Merge pull request #66 from eFrane/f_upgrade_mermaidjs_plugin
  * Upgrade vuepress-plugin-mermaidjs to 1.1.0
  * Merge pull request #68 from eFrane/alpha_releases
  * refs #65: draft shorthand-methods to get relationships
  * refs #65: draft shorthand-methods to get attributes

_Changelog starts at 0.0.26_
