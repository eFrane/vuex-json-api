import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import cors from 'cors'

import BaseController from 'fake-json-api-server/src/baseController'
import dataset from 'fake-json-api-server/src/dataset'

import toolkit from 'fake-json-api-server/src/toolkit'

const assign = toolkit.assign
const pick = toolkit.pick

function formatRequest (request) {
  return {
    requestBody: request.body,
    queryParams: request.query,
    params: request.params
  }
}

function dataToResponse ([ status, headers, responseText ], response) {
  response
    .status(status)
    .set(headers)
    .json(responseText === '""' ? undefined : JSON.parse(responseText))
}

export class JsonApiServerAdapter {
  constructor (serverConfig) {
    this.app = express()

    this.app.use(bodyParser.json({ type: 'application/*+json' }))
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(multer({ storage: multer.memoryStorage() }).any())
    this.app.use(cors())

    serverConfig = assign({
      baseApiUrl: '/',
      port: 3000,
      resources: {},
      getResourceSlug: (resourceName) => {
        return resourceName
      }
    }, serverConfig)

    dataset.import(serverConfig.resources)

    for (let resourceType in serverConfig.resources) {
      let config = serverConfig.resources[resourceType]

      let ResourceController = BaseController.extend({
        resourceType: resourceType
      })

      let resourceSlug = serverConfig.getResourceSlug(resourceType)
      let resourceController = new ResourceController(pick({}, config, ['filters', 'validationRules']))
      let resourceUrl = serverConfig.baseApiUrl + resourceSlug

      // Index
      this.app.get(resourceUrl, (request, response) => {
        dataToResponse(
          resourceController.list(formatRequest(request)),
          response
        )
      })

      // Show
      this.app.get(resourceUrl + '/:id', (request, response) => {
        dataToResponse(
          resourceController.show(request.params.id, formatRequest(request)),
          response
        )
      })

      // Create
      this.app.post(resourceUrl, (request, response) => {
        dataToResponse(
          resourceController.create(formatRequest(request)),
          response
        )
      })

      // Update
      this.app.post(resourceUrl + '/:id', (request, response) => {
        dataToResponse(
          resourceController.edit(request.params.id, formatRequest(request)),
          response
        )
      })

      this.app.put(resourceUrl + '/:id', (request, response) => {
        dataToResponse(
          resourceController.edit(request.params.id, formatRequest(request)),
          response
        )
      })

      this.app.patch(resourceUrl + '/:id', (request, response) => {
        dataToResponse(
          resourceController.edit(request.params.id, formatRequest(request)),
          response
        )
      })

      // Delete
      this.app.delete(resourceUrl + '/:id', (request, response) => {
        dataToResponse(
          resourceController.delete(request.params.id, formatRequest(request)),
          response
        )
      })
    }
  }

  getApp () {
    return this.app
  }
}
