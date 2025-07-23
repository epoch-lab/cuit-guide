import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import { resolve } from "path";

export default defineConfig({
  title: "CUIT 指南",
  description: "CUIT 全攻略！",
  lang: "zh-CN",
  ignoreDeadLinks: true, // 防止因死链而失败
  lastUpdated: true,
  // 排除这些文件夹不被 VitePress 构建处理
  srcExclude: ["**/packages/**", "**/Excludes/**", "**/vue-test/**"],
  vite: {
    resolve: {
      alias: {
        // 配置 @ 指向项目根目录
        "@": resolve(__dirname, "../"),
        // 配置 @theme 指向主题目录
        "@theme": resolve(__dirname, "./theme"),
        // 配置 @data 指向数据目录
        "@data": resolve(__dirname, "./theme/data"),
        // 配置 @components 指向组件目录
        "@components": resolve(__dirname, "./theme/components"),
        // 配置 @stores 指向状态管理目录
        "@stores": resolve(__dirname, "./theme/stores"),
        // 配置 @utils 指向工具函数目录
        "@utils": resolve(__dirname, "./theme/utils"),
      },
    },
    assetsInclude: ["*.json"],
  },
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZpbmdlcnByaW50Ij48cGF0aCBkPSJNMTIgMTBhMiAyIDAgMCAwLTIgMmMwIDEuMDItLjEgMi41MS0uMjYgNCIvPjxwYXRoIGQ9Ik0xNCAxMy4xMmMwIDIuMzggMCA2LjM4LTEgOC44OCIvPjxwYXRoIGQ9Ik0xNy4yOSAyMS4wMmMuMTItLjYuNDMtMi4zLjUtMy4wMiIvPjxwYXRoIGQ9Ik0yIDEyYTEwIDEwIDAgMCAxIDE4LTYiLz48cGF0aCBkPSJNMiAxNmguMDEiLz48cGF0aCBkPSJNMjEuOCAxNmMuMi0yIC4xMzEtNS4zNTQgMC02Ii8+PHBhdGggZD0iTTUgMTkuNUM1LjUgMTggNiAxNSA2IDEyYTYgNiAwIDAgMSAuMzQtMiIvPjxwYXRoIGQ9Ik08LjY1IDIyYy4yMS0uNjYuNDUtMS4zMi41Ny0yIi8+PHBhdGggZD0iTTkgNi44YTYgNiAwIDAgMSA5IDUuMnYyIi8+PC9zdmc+",
      },
    ],
    // Google Analytics
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-V2Y79RXRSK",
      },
    ],
    [
      "script",
      {},
      `function gtag(){dataLayer.push(arguments)}window.dataLayer=window.dataLayer||[],gtag("js",new Date),gtag("config","G-V2Y79RXRSK");`,
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
      { text: "实验室列表", link: "/实验室/lab-list.md" },
      { text: "校友友链", link: "/校友友链/index.md" },
      { text: "校园地图", link: "/地图/校园地图/航空港校区/index.md" },
      // { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: generateSidebar({
      manualSortFileNameByPriority: ["README.md"],
      collapsed: true,
      collapseDepth: 2,
      useFolderLinkFromIndexFile: true,
      sortMenusByName: false, // 禁用按名称排序
      sortMenusByFrontmatterOrder: true, // 启用按frontmatter中的order字段排序
      frontmatterOrderDefaultValue: 100, // 设置默认值，未指定order的项目将排在后面
      useTitleFromFrontmatter: true, // 启用从frontmatter获取标题
      frontmatterTitleFieldName: 'title', // 指定frontmatter中标题字段的名称
      // documentRootPath: '/src',
      // scanStartPath: null,
      // basePath: null,
      // resolvePath: null,
      // useTitleFromFileHeading: true,
      // useTitleFromFrontmatter: true,
      // frontmatterTitleFieldName: 'title',
      // useFolderTitleFromIndexFile: false,
      // useFolderLinkFromIndexFile: false,
      // hyphenToSpace: true,
      // underscoreToSpace: true,
      // capitalizeFirst: false,
      // capitalizeEachWords: false,
      // collapsed: true,
      // collapseDepth: 2,
      // sortMenusByName: true,
      // sortMenusByFrontmatterOrder: false,
      // sortMenusByFrontmatterDate: false,
      // sortMenusOrderByDescending: false,
      // sortMenusOrderNumericallyFromTitle: false,
      // sortMenusOrderNumericallyFromLink: false,
      // frontmatterOrderDefaultValue: 0,
      // manualSortFileNameByPriority: ['first.md', 'second', 'third.md'],
      // removePrefixAfterOrdering: false,
      // prefixSeparator: '.',
      // excludeFiles: ['first.md', 'secret.md'],
      // excludeFilesByFrontmatterFieldName: 'exclude',
      excludeFolders: ["Excludes", "vue-test", "packages"],
      // includeDotFiles: false,
      // includeRootIndexFile: false,
      // includeFolderIndexFile: false,
      // includeEmptyFolder: false,
      // rootGroupText: 'Contents',
      // rootGroupLink: 'https://github.com/jooy2',
      // rootGroupCollapsed: false,
      // convertSameNameSubFileToGroupIndexPage: false,
      // folderLinkNotIncludesFileName: false,
      // keepMarkdownSyntaxFromTitle: false,
      // debugPrint: false,
    }),

    socialLinks: [
      { icon: "github", link: "https://github.com/epoch-lab/cuit-guide" },
    ],
  },

  sitemap: {
    hostname: "https://guide.cuit.dev",
  },
});
