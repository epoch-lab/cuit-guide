// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import { h } from "vue";
// @ts-ignore
import { createPinia } from 'pinia'; // 新增

import LabList from "./components/LabList.vue";
import HomeExitDetector from "./components/HomeExitDetector.vue";
import AsideRouter from "./components/AsideRouter.vue";
import "./style.css";
import SharePoster from "./components/SharePoster.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // 'aside-outline-before': () => h(CustomAside), // 目录前
      'aside-outline-after': () => h(AsideRouter),  // 目录后
      // 'aside-ads-before': () => h(CustomAside),     // 广告位前
      // 'aside-ads-after': () => h(CustomAside),      // 广告位后
      'doc-footer-before': () => h(SharePoster),
      'layout-bottom': () => h(HomeExitDetector)
    });
  },
  enhanceApp({ app, router, siteData }) {
    // 配置 Pinia
    const pinia = createPinia();
    app.use(pinia);

    app.component("LabList", LabList);
  },
} satisfies Theme;
