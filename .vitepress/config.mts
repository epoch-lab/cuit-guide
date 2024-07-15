import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CUIT 指南",
  description: "CUIT 全攻略！",
  lang: "zh-CN",
  themeConfig: {
    editLink: {
      pattern: "https://github.com/epoch-lab/cuit-guide/edit/main/:path",
      text: "在 GitHub 上编辑此页面",
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    outline: {
      label: "页面导航",
    },

    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: "Intro",
        link: "/intro",
      },
      {
        text: "实验室",
        link: "/实验室/实验室.md",
        items: [{ text: "回声开发实验室", link: "/实验室/回声开发实验室.md" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/epoch-lab/cuit-guide" },
    ],
  },
});
