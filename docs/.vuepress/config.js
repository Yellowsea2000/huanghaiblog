module.exports = {
  title: 'Yellowsea blog',
  base: '/huanghaiblog/',
  extraWatchFiles: ['**/*.md', '**/*.vue', '**/*.js', '**/*.html'],
  chainWebpack (config, isServer) {
    config.devServer
      .hot(true)
  },
  themeConfig: {
    nav: [
      { text: '前端', link: '/front/layout' },
      { text: '示例demo', link: '/demo/mvvm' },
      { text: "面试题收集", link: '/interview/a' }
    ],
    sidebar: {
      '/front/': [
        {

          collapsable: true,
          sidebarDepth: 1,
          children: [
            { title: '布局', path: 'layout' },
            { title: 'http', path: 'http' }
          ]
        }
      ],
      '/demo/': [
        {

          collapsable: true,
          sidebarDepth: 1,
          children: [
            { title: '从零实现一个mvvm框架', path: 'mvvm', collapsable: true }
          ]
        }
      ],
      '/interview/': [
        {

          collapsable: true,
          sidebarDepth: 1,
          children: [
            { title: '面试题1', path: 'a', collapsable: true }
          ]
        }
      ]

    }
  }
}
