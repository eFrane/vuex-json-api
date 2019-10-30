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
      '/usage/',
      '/usage/modules.html',
      '/usage/requests.html',
      '/usage/router.html',
      '/usage/deep-dive.html'
    ]
  },
  evergreen: true,
  plugins: [
    "vuepress-plugin-mermaidjs", {}
  ],
}
