export class ApiError extends Error {
  constructor (message) {
    super(message)

    this.name = 'ApiError'
  }
}

export class NotFoundApiError extends ApiError {
  constructor (message, errorInfo = null) {
    super(message)

    this.name = 'NotFoundApiError'
    this.errorInfo = errorInfo
  }

  hasErrorInfo () {
    return this.errorInfo !== null && this.errorInfo !== undefined
  }
}
