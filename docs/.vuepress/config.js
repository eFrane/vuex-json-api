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
        text: 'Guide',
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
    activeHeaderLinks: true
  },
  evergreen: true,
  serviceWorker: true,
  plugins: [
    'mermaidjs',
    require('./plugins/jsdoc/jsdoc')
  ]
}
