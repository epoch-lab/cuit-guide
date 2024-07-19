<script setup>
import { onMounted, onUnmounted } from "vue";
console.log("航空港地图");
import AMapLoader from "@amap/amap-jsapi-loader";
let map = null;

const loadMap = async () => {
  try {
    const AMap = await AMapLoader.load({
      key: "6a691c3f68c403b9483594450c4f45f0",
      version: "2.0",
      plugins: ["AMap.Scale"],
    });
    map = new AMap.Map("container", {
      // 设置地图容器id
      viewMode: "3D", // 是否为3D地图模式
      zoom: 10, // 初始化地图级别
      center: [104.261238, 30.394949], // 初始化地图中心点位置
      terrain: true, //开启地形图
    });
  } catch (e) {
    console.log(e);
  }
};
let AMap = null;

onMounted(async () => {
  await loadMap();
  // await loadMapAndPlugins();
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<template>
  <div id="container"></div>
</template>
<style lang="scss">
#container {
  padding: 0px;
  margin: 0px;
  width: 800px;
  height: 800px;
}
</style>
