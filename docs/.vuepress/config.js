const path = require('path')

module.exports = {
  title: 'Json:Api for Vuex',
  description: 'Automagic Json:Api integration for Vuex',
  themeConfig: {
    nav: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Development',
        link: '/development/'
      },
      {
        text: 'Reference',
        link: '/reference/'
      },
      {
        text: 'Usage',
        link: '/usage/'
      }
    ],
    repo: 'eFrane/vuex-json-api',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    displayAllHeaders: true,
    activeHeaderLinks: true,
    sidebar: 'auto'
  },
  evergreen: true,
  serviceWorker: true,
  plugins: [
    'mermaidjs',
    ['pressdocs', {
      'languages': {
        'js': {
          sourceDir: path.resolve(__dirname + '/../../src'),
          path: '/reference/',
        }
      }
    }]
  ]
}
