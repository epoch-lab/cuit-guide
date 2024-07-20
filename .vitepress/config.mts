import { DefaultTheme, defineConfig } from "vitepress";
// import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';
// https://vitepress.dev/reference/site-config

// const sidebarExample: DefaultTheme.SidebarItem[] = [

//     ]

export default defineConfig({
  title: "CUIT 指南",
  description: "CUIT 全攻略！",
  lang: "zh-CN",
  ignoreDeadLinks: true, // 防止因死链而失败

  // vite: {
  //   plugins: [
  //     // add plugin
  //     AutoSidebar({
  //       // You can also set options to adjust sidebar data
  //       // see option document below
  //       collapsed: false,
  //       path:'/',
  //       sideBarItemsResolved: ()=>sidebarExample,
  //     })
  //   ]
  // },
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbmdlcnByaW50Ij48cGF0aCBkPSJNMTIgMTBhMiAyIDAgMCAwLTIgMmMwIDEuMDItLjEgMi41MS0uMjYgNCIvPjxwYXRoIGQ9Ik0xNCAxMy4xMmMwIDIuMzggMCA2LjM4LTEgOC44OCIvPjxwYXRoIGQ9Ik0xNy4yOSAyMS4wMmMuMTItLjYuNDMtMi4zLjUtMy4wMiIvPjxwYXRoIGQ9Ik0yIDEyYTEwIDEwIDAgMCAxIDE4LTYiLz48cGF0aCBkPSJNMiAxNmguMDEiLz48cGF0aCBkPSJNMjEuOCAxNmMuMi0yIC4xMzEtNS4zNTQgMC02Ii8+PHBhdGggZD0iTTUgMTkuNUM1LjUgMTggNiAxNSA2IDEyYTYgNiAwIDAgMSAuMzQtMiIvPjxwYXRoIGQ9Ik04LjY1IDIyYy4yMS0uNjYuNDUtMS4zMi41Ny0yIi8+PHBhdGggZD0iTTkgNi44YTYgNiAwIDAgMSA5IDUuMnYyIi8+PC9zdmc+",
      },
    ],
  ],
  themeConfig: {
    editLink: {
      pattern: "https://github.com/epoch-lab/cuit-guide/edit/main/:path",
      text: "在 GitHub 上编辑此页面",
    },
    search: {
      provider: "local",
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
        text: "这是做什么的?",
        link: "/Readme",
      },
      {
        text: "地图",
        collapsed: false,
        items: [
          {
            text: "航空港校区",
            link: "/地图/校园地图/航空港校区/航空港地图",
          },
          {
            text: "龙泉驿校区",
            link: "/地图/校园地图/龙泉驿校区/龙泉驿地图",
          },
        ],
      },
      {
        text: "学习相关",
        collapsed: false,
        link: "/学习相关/index",
        items: [
          {
            text: "技术",
            items: [
              { text: "算法", link: "/学习相关/技术/算法/hello-algo" },
              { text: "CTF", link: "/学习相关/技术/CTF/hello_ctf" },
            ],
          },
          { text: "选课", items: [] },
          { text: "期末", items: [] },
          {
            text: "考研",
            items: [
              {
                text: "19级马学长",
                items: [
                  {
                    text: "一丢丢考研建议",
                    link: "/学习相关/考研/19级马学长上岸西南交大/一丢丢考研建议",
                  },
                  {
                    text: "复试面试建议",
                    link: "/学习相关/考研/19级马学长上岸西南交大/复试面试建议",
                  },
                ],
              },
              { text: "回声考研合集", items: [] },
              {
                text: "DSA考研合集",
                items: [
                  {
                    text: "DSA考研经验分享",
                    link: "/学习相关/考研/DSA考研合集/test",
                  },
                ],
              },
            ],
          },
          {
            text: "就业",
            items: [
              {
                text: "如何准备算法",
                link: "/学习相关/就业/如何准备算法/如何准备算法",
              },
            ],
          },
          { text: "绩点", items: [] },
          { text: "转专业", items: [] },
        ],
      },
      {
        text: "认知",
        collapsed: false,
        items: [
          {
            text: "提问的智慧",
            link: "/认知/如何提问/README-zh_CN",
          },
        ],
      },
      {
        text: "资源",
        collapsed: false,
        link: "/资源/index",
        items: [
          {
            text: "前端",
            items: [{ text: "组件库", link: "/资源/前端/组件库" }],
          },
          {
            text: "常用工具",
            items: [
              { text: "国内大模型", link: "/资源/常用工具/国内大模型" },
              { text: "流程图制作", link: "/资源/常用工具/流程图制作" },
              { text: "文件格式转换", link: "/资源/常用工具/文件格式转换.md" },
            ],
          },
        ],
      },
      {
        text: "常见的基本信息",
        collapsed: false,
        items: [
          {
            text: "cuit学校邮箱有什么用?",
            link: "常见的基本信息/cuit学校邮箱/cuit学校邮箱",
          },
        ],
      },
      {
        text: "友链",
        collapsed: false,
        link: "/友链/index",
        items: [
          { text: "cuit_shring", link: "/友链/cuit_shring/cuit_sharing" },
          { text: "UneedRun", link: "/友链/UneedRun/UneedRun" },
        ],
      },
      {
        text: "Book",
        collapsed: false,
        link: "/Book/index",
        items: [
          {
            text: "计算机基础",
            items: [
              {
                text: "使用git",
                link: "/Books/计算机基础/使用git",
              },
            ],
          },
        ],
      },
      {
        text: "校级组织",
        collapsed: false,
        items: [
          {
            text: "党委宣传部融媒体中心",
            link: "/校级组织/党委宣传部融媒体中心/融媒体中心",
          },
          { text: "校团委社团管理部" },
        ],
      },
      {
        text: "实验室",
        link: "/实验室/实验室",
        collapsed: false,
        items: [
          { text: "回声开发实验室", link: "/实验室/Epoch/回声开发实验室" },
          {
            text: "道格安全研究实验室",
            link: "/实验室/D0g3/道格安全研究实验室",
          },
          {
            text: "三叶草安全技术小组",
            link: "实验室/Syclover/三叶草安全技术小组",
          },
          {
            text: "异步开发实验室",
            link: "实验室/Async/异步开发实验室",
          },
          {
            text: "数据结构与算法实验室",
            link: "实验室/DSA/数据结构与算法实验室",
          },
          {
            text: "ACM",
            link: "实验室/ACM/ACM",
          },
        ],
      },
      {
        text: "社团",
        items: [
          { text: "学生回声开发实验室", link: "/实验室/Epoch/回声开发实验室" },
          {
            text: "学生道格安全研究实验室",
            link: "/实验室/D0g3/道格安全研究实验室",
          },
          {
            text: "学生三叶草技术小组",
            link: "实验室/Syclover/三叶草安全技术小组",
          },
          { text: "学生异步开发实验室", link: "实验室/Async/异步开发实验室" },
        ],
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
          {
            text: "航空港校区",
            collapsed: true,
            items: [
              { text: "大气科学学院" },
              { text: "计算机学院" },
              {
                text: "区块链产业学院",
                link: "/学院概况/航空港校区/区块链产业学院",
              },
              { text: "软件工程学院" },
              { text: "网络空间安全学院" },
              { text: "自动化学院" },
              { text: "电子工程学院" },
              { text: "通信工程学院" },
              { text: "光电工程学院" },
              { text: "资源环境学院" },
              { text: "外国语学院" },
            ],
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/epoch-lab/cuit-guide" },
    ],
  },
});
