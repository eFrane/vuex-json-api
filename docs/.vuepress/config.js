module.exports = {
  title: 'Json:Api for Vuex',
  description: 'Automagic Json:Api integration for Vuex',
  themeConfig: {
    nav: [
      {
        text: 'Documentation',
        link: '/'
      },
      {
        text: 'Development',
        link: '/development.html'
      }
    ],
    repo: 'eFrane/vuex-json-api',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    displayAllHeaders: true,
    activeHeaderLinks: true,
    sidebar: [
      ['/', 'Home'],
      '/configuration/',
      '/usage/'
    ]
  },
  evergreen: true
}
