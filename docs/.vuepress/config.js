module.exports = {
  title: 'Yellowsea blog',
  base: '/huanghaiblog/',
  themeConfig: {
    nav: [
      { text: '前端', link: '/font' },
      { text: 'webpack', link: '/webpack' },
      { text: 'git', link: '/git' }
    ],
    sidebar: {
      '/font': ['html.html']
    }
  }
}
