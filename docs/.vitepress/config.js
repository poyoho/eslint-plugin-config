/**
 * @type {import('vitepress').UserConfig}
 */
module.exports = {
  base: "/eslint-plugin-config/",
  lang: 'zh-CN',
  title: 'poyoho',
  description: 'eslint',
  markdown: {
    lineNumbers: true,
  },

  themeConfig: {
    docsDir: 'docs',
    logo: '/logo.svg',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',

    nav: [
      { text: '首页', link: '/index' },
      { text: 'rule', link: '/rules/index' },
      { text: 'stat', link: '/stats/index' },
    ],

    sidebar: {
      "/stats": require("./route/stats"),
      "/": require("./route/rules"),
    }
  }
}
