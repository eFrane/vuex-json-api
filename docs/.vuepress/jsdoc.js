// YARN_SILENT=1 yarn jsdoc2md -f 'src/**/*' --private -l js --name-format --separators --template docs/.vuepress/jsdoctemplate.handlebars > docs/code/README.md
const fs = require('fs')
const path = require('path')
const jsdoc2md = require('jsdoc-to-markdown')
const handlebars = require('handlebars')


function loadTemplate (templateName) {
  const relativeTemplateName = `docs/.vuepress/templates/jsdoc/${templateName}.handlebars`
  if (fs.existsSync(relativeTemplateName)) {
    const templateData = fs.readFileSync(relativeTemplateName, { encoding: 'utf-8' })
    return handlebars.compile(templateData)
  }

  return null
}

handlebars.registerHelper('jsDocBlock', function () {
  const template = loadTemplate(`kind.${this.kind}`)
  if (template) {
    return template(this)
  }

  return `**MISSING JSDOC TEMPLATE FOR DOC BLOCK KIND ${this.kind}**`
})

const dirs = ['classes', 'functions']
dirs.forEach(dir => {
  const relDir = `docs/code/${dir}`
  if (!fs.existsSync(relDir))
  fs.mkdirSync(relDir)
})

const templateData = jsdoc2md.getTemplateDataSync({
  files: path.resolve('src/**/*.js')
})

documentClasses(templateData)
// documentFunctions(templateData)

/**
 *
 * @param {Object} templateData
 */
function documentClasses (templateData) {
  const classes = templateData.reduce((classNames, identifier) => {
    if (identifier.kind === 'class') classNames.push(identifier.name)
    return classNames
  }, [])

  const classIndexData = {
    classes: {}
  }

  for (const cls of classes) {
    classIndexData.classes[cls] = {
      name: cls,
      link: cls + '.html'
    }
  }

  const classTemplate = loadTemplate('class')
  classes.forEach(className => {
    const fileName = `docs/code/classes/${className}.md`
    const classData = templateData
      .filter(jsdocBlock => jsdocBlock.memberof === className)
      .sort((a, b) => {
        return a.order < b.order ? -1 : 1
      })

    classData.forEach(classData => {
      if (classData.kind === 'class') {
        classIndexData.classes[className].description = classData.description
      }
    })

    console.log(`rendering ${className} to ${fileName}`)
    const context = { className, classData }
    fs.writeFileSync(fileName, classTemplate(context))
  })

  console.log('rendering index for class documentation')
  fs.writeFileSync('docs/code/classes/README.md', loadTemplate('classindex')(classIndexData))
}

/**
 *
 * @param {Object} templateData
 */
function documentFunctions (templateData) {
  const functionNames = templateData.reduce((functionNames, identifier) => {
    if (identifier.kind === 'function') functionNames.push(identifier.name)
    return functionNames
  }, [])

  console.dir(functionNames)
}
