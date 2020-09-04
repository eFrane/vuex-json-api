'use strict'
const jsdoc2md = require('jsdoc-to-markdown')
const fs = require('fs')
const dmd = require('dmd')

module.exports = (options, ctx) => {
  return {
    name: 'jsdoc',
    additionalPages () {
      const srcDir = __dirname + '/../../../../src/'

      let doc = jsdoc2md.getTemplateDataSync({
        files: srcDir + '**/*.js'
      })

      return [
        {
          path: '/reference/',
          content: dmd(doc, { noCache: true, template: fs.readFileSync(__dirname + '/template.hbs', 'utf-8').toString() })
        }
      ]
    }
  }
}
