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
        link: '/guide/'
      },
      {
        text: 'Development',
        link: '/development.html',
        items: [
          'Contributing',
          '/contributing/'
        ]
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
  plugins: {
    'mermaidjs': {},

    '@vuepress/active-header-links': {},

    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: true
    }
  }
}
