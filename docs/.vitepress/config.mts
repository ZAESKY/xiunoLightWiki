import { defineConfig } from 'vitepress'
import { nav } from './configs'
import timeline from "vitepress-markdown-timeline";
import taskLists from 'markdown-it-task-checkbox';
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
  lastUpdated: true, //首次配置不会立即生效，需git提交后爬取时间戳
  themeConfig: {
     //自定义上下页名
    docFooter: { 
      prev: '上一页', 
      next: '下一页', 
    }, 
    //上次更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      },
    },
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
    nav,

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
  },
  //markdown配置
  markdown: {
    //时间线
    config: (md) => {
      md.use(taskLists); //todo
      md.use(timeline);
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`; 
          return htmlResult;
      },
      // 代码组中添加图片
      md.use((md) => {
        const defaultRender = md.render
        md.render = (...args) => {
          const [content, env] = args
          const currentLang = env?.localeIndex || 'root'
          const isHomePage = env?.path === '/' || env?.relativePath === 'index.md'  // 判断是否是首页

          if (isHomePage) {
            return defaultRender.apply(md, args) // 如果是首页，直接渲染内容
          }
          // 调用原始渲染
          let defaultContent = defaultRender.apply(md, args)
          // 替换内容
          if (currentLang === 'root') {
            defaultContent = defaultContent.replace(/提醒/g, '提醒')
              .replace(/建议/g, '建议')
              .replace(/重要/g, '重要')
              .replace(/警告/g, '警告')
              .replace(/注意/g, '注意')
          } else if (currentLang === 'ko') {
            // 韩文替换
            defaultContent = defaultContent.replace(/提醒/g, '알림')
              .replace(/建议/g, '팁')
              .replace(/重要/g, '중요')
              .replace(/警告/g, '경고')
              .replace(/注意/g, '주의')
          }
          // 返回渲染的内容
          return defaultContent
        }

        // 获取原始的 fence 渲染规则
        const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules) ?? ((...args) => args[0][args[1]].content);

        // 重写 fence 渲染规则
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
          const token = tokens[idx];
          const info = token.info.trim();

          // 判断是否为 md:img 类型的代码块
          if (info.includes('md:img')) {
            // 只渲染图片，不再渲染为代码块
            return `<div class="rendered-md">${md.render(token.content)}</div>`;
          }

          // 其他代码块按默认规则渲染（如 java, js 等）
          return defaultFence(tokens, idx, options, env, self);
        };
      })

    }
  },
})
