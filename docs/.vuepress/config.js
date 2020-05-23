module.exports = {
  title: 'Yellowsea blog',
  base: '/huanghaiblog/',
  extraWatchFiles: ['**/*.md', '**/*.vue', '**/*.js', '**/*.html'],
  themeConfig: {
    nav: [
      { text: '前端', link: '/front/' },
      { text: '示例demo', link: '/demo/' }
    ],
    sidebar: {
      '/front/': [
        {

          collapsable: false,
          sidebarDepth: 1,
          children: [
            { title: '布局', path: 'layout' }
          ]
        }
      ],
      '/demo/': [
        {

          collapsable: false,
          sidebarDepth: 1,
          children: [
            { title: '从零实现一个mvvm框架', path: 'mvvm' }
          ]
        }
      ]

    }
  }
}
