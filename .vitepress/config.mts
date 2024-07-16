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
        link: "/Readme.md",
      },

      {
        text: "实验室",
        link: "/实验室/实验室",
        collapsed: false,
        items: [
          { text: "回声开发实验室", link: "/实验室/epoch/回声开发实验室" },
          {
            text: "道格安全研究实验室",
            link: "/实验室/D0g3/道格安全研究实验室",
          },
        ],
      },
      {
        text: "学习相关",
        collapsed: false,
        items:[
          {text:"选课",items:[]},
          {text:"作业",items:[]},
          {text:"期末",items:[]},
          {text:"考研",items:[]},
          {text:"就业",items:[]},
          {text:"绩点",items:[]},
          {text:"转专业",items:[]},
        ]
      },
      {
        text: "学院概况",
        collapsed: true,
        items: [
          {
            text: "龙泉驿校区",
            collapsed: false,
            items: [
              { text: "物流学院" },
              { text: "管理学院" },
              { text: "文化艺术学院" },
              { text: "统计学院" },
            ],
          },
          { text: "航空港校区",
            collapsed: true,
            items: [
              {text: "大气科学学院"},
              {text: "计算机学院"},
              {text:"区块链产业学院" ,link:"/学院概况/航空港校区/区块链产业学院"},
              {text: "软件工程学院"},
              {text:"网络空间安全学院"},
              {text:"自动化学院"},
              {text:"电子工程学院"},
              {text:"通信工程学院"},
              {text:"光电工程学院"},
              {text:"资源环境学院"},
              {text:"外国语学院"}
            ]
           },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/epoch-lab/cuit-guide" },
    ],
  },
});
