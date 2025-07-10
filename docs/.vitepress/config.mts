import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN', //语言，可选 en-US
  title: "修罗轻鸿主题使用手册",
  description: "让您快速上手修罗程序以及轻鸿主题使用。",
  titleTemplate: ':title - 修罗轻鸿主题使用手册',
  cleanUrls:true, //开启纯净链接
  //fav图标
  head: [
    ['link',{ rel: 'icon', href: '/logo.png'}],
  ],
  themeConfig: {
    outline: { 
      level: [2,4], // 显示2-4级标题
      // level: 'deep', // 显示2-6级标题
      label: '当前页大纲' // 文字显示
    },
    //返回顶部文字修改
    returnToTopLabel:'返回顶部', 
    //侧边栏文字更改(移动端)
    sidebarMenuLabel:'目录',
    //页脚
    footer: { 
      message: 'Released under the MIT License.', 
      // copyright: 'Copyright © 2019-2023 present Evan You', 
      // 自动更新时间
      copyright: `Copyright ©${new Date().getFullYear()} present ZAESKY`, 
    },
    //本地搜索
    search: { 
      provider: 'local'
    }, 
    //左上角logo
    logo: '/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],
     //侧边栏
    sidebar: [
      {
        //分组标题1
        text: '介绍',
        collapsed: false,
        items: [
          { text: '前言', link: '/preface' },
        ],
      },
      {
        //分组标题2
        text: '基础配置',
        collapsed: false,
        items: [
          { text: '快速上手', link: '/getting-started' },
          { text: '配置', link: '/configuration' },
          { text: '页面', link: '/page' },
          { text: 'Frontmatter', link: '/frontmatter' },
        ],
      },
      {
        //分组标题3
        text: '进阶玩法',
        collapsed: false,
        items: [
          { text: 'Markdown', link: '/markdown' },
          { text: '静态部署', link: '/assets' },
        ],
      },
    ],
  }
})
