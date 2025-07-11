import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = [
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
    ]