export class ApiError extends Error {
  constructor (message) {
    super(message)

    this.name = 'ApiError'
  }
}

export class NotFoundApiError extends ApiError {
  constructor (message) {
    super(message)

    this.name = 'NotFoundApiError'
  }
}
