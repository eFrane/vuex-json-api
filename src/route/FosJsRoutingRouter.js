import { Route } from './Route'
import { Router } from './Router'

/**
 * Pluggable api router if you're using Symfony and the FosJsRouting Bundle
 *
 * @see https://github.com/isychev/fos-routing/
 * @see https://github.com/FriendsOfSymfony/FOSJsRoutingBundle
 */
export class FosJsRoutingRouter extends Router {
  constructor(fosRouter, options = {}) {
    super()

    this.fosRouter = fosRouter
    this.routeExtractionOptions = Object.assign({
      prefix: '',
      resourceNamePattern: '[a-b]+',
      routePatterns: {
        resourceRoute: '{prefix}_{resourceName}_{action}'
      },
      actionPatterns: {
        list: 'list',
        get: 'get',
        create: 'create',
        replace: 'replace',
        update: 'update',
        delete: 'delete'
      }
    }, options)
  }

  async updateRoutes () {
    // TODO: extract routes from fosRouter based on naming scheme or something
    this.fosRouter.map(route, name => {
      if (this.matchRouteName(name)) {
        let route = Route.fromPojo()
        this.addRoute()
      }
    })
  }

  matchRouteName (name) {

  }

  prepareResourceMatchRegex () {
    let pattern = this.routeExtractionOptions.routePatterns.resourceRoute
      .replace(
        '{prefix}',
        this.routeExtractionOptions.prefix
      )
      .replace(
        '{resourceName}',
        `(?<resourceName>${this.routeExtractionOptions.resourceNamePattern})`
      )
      .replace(
        '{action}',
        `(?<action>${Object.values(this.routeExtractionOptions.actionPatterns).join('|')})`
      )

    return new RegExp(pattern)
  }
}
