/**
 * Pluggable api router if you're using Symfony and the FosJsRouting Bundle
 *
 * @see https://github.com/isychev/fos-routing/
 * @see https://github.com/FriendsOfSymfony/FOSJsRoutingBundle
 */
export class FosJsRoutingRouter {
  constructor(fosRouter, options) {
    super()

    this.fosRouter = fosRouter
    this.routeExtractionOptions = options
  }

  async updateRoutes () {
    // TODO: extract routes from fosRouter based on naming scheme or something
  }
}
