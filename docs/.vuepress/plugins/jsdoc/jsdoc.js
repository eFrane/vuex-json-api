'use strict'
const jsdoc2md = require('jsdoc-to-markdown')
const fs = require('fs')
const dmd = require('dmd')

module.exports = (options, ctx) => {
  return {
    name: 'jsdoc',
    additionalPages () {
      let doc = jsdoc2md.getTemplateDataSync({
        files: options.src + '/**/*.js'
      })

      const templatePath = __dirname + '/template.hbs'
      const template = fs.readFileSync(templatePath, 'utf-8').toString()

      return [
        {
          path: '/reference/',
          content: dmd(doc, { template })
        }
      ]
    }
  }
}
