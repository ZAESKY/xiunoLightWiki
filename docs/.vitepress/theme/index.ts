/* .vitepress/theme/index.ts */
import DefaultTheme from 'vitepress/theme'
import './style/index.css'
import Linkcard from "./components/Linkcard.vue"
import update from "./components/update.vue"
import ArticleMetadata from "./components/ArticleMetadata.vue"
// 只需添加以下一行代码，引入时间线样式
import "vitepress-markdown-timeline/dist/theme/index.css";
import mediumZoom from 'medium-zoom';
import { onMounted, watch, nextTick } from 'vue';
import { useData,useRoute } from 'vitepress';
import { h } from 'vue' // h函数
// 组件
import bsz from "./components/bsz.vue";
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js';
import backtotop from "./components/backtotop.vue";
import { NProgress } from 'nprogress-v2/dist/index.js'; // 进度条组件
import 'nprogress-v2/dist/index.css'; // 进度条样式
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
export default {
    Layout() {
    return h(DefaultTheme.Layout, null, {

      // 指定组件使用layout-bottom插槽
      'layout-bottom': () => h(bsz),
      'doc-footer-before': () => h(backtotop),
    })
  },
  extends: DefaultTheme,
  // ...DefaultTheme, //或者这样写也可
  setup() {
    const route = useRoute();
    const initZoom = () => {
      // mediumZoom('[data-zoomable]', { background: 'var(--vp-c-bg)' }); // 默认
      mediumZoom('.main img', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );

     // Get frontmatter and route
    const { frontmatter } = useData();
        
    // giscus配置
    giscusTalk({
      repo: 'ZAESKY/xiunoLightWiki', //仓库
      repoId: 'R_kgDOPJv5Pw', //仓库ID
      category: 'General', // 讨论分类
      categoryId: 'DIC_kwDOPJv5P84Csx_B', //讨论分类ID
      mapping: 'pathname',
      inputPosition: 'bottom',
      lang: 'zh-CN',
      }, 
      {
        frontmatter, route
      },
      //默认值为true，表示已启用，此参数可以忽略；
      //如果为false，则表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );
  },
  enhanceApp({app,router }) { 
    // 注册全局组件
    app.component('Linkcard' , Linkcard)
    app.component('update' , update)
    app.component('ArticleMetadata' , ArticleMetadata)
    if (inBrowser) {
        NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChanged = () => {
        busuanzi.fetch()
        NProgress.done() // 停止进度条
      }
    }
  }
}