module.exports = {
  title: 'Yellowsea blog',
  base: '/huanghaiblog/',
  extraWatchFiles: ['**/*.md', '**/*.vue', '**/*.js', '**/*.html'],
  themeConfig: {
    nav: [
      { text: '前端', link: '/front/' },
      { text: 'git', link: '/git' }
    ],
    sidebar: [
      {
        title: 'html',
        path: '/front/',
        collapsable: false,
        sidebarDepth: 1
      },
      {
        title: 'css',
        path: '/front/css',
        collapsable: false,
        sidebarDepth: 1
      },
      {
        title: 'js',
        path: '/front/js',
        collapsable: false,
        sidebarDepth: 1
      }
    ]
  }
}
