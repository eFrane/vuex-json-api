export class ActiveRelationship {
  constructor (properties) {
    Object.assign(this, properties)

    this.get = new Proxy(() => {}, {
      apply (target, thisArg, argArray) {
        // TODO: think about how to actually get the stuff we want from here
        return 'get'
      }
    })

    this.list = new Proxy(() => {}, {
      apply (target, thisArg, argArray) {
        return 'list'
      }
    })
  }
}
