<script setup>
import { onMounted, onUnmounted } from "vue";
console.log("龙泉驿地图");
// import AMapLoader from "@amap/amap-jsapi-loader";


const loadMap = async () => {
  const AMapLoader = await import("@amap/amap-jsapi-loader");
  try {
    const AMap = await AMapLoader.load({
      key: "6a691c3f68c403b9483594450c4f45f0",
      version: "2.0",
      plugins: ["AMap.Scale"],
    });
    const map = new AMap.Map("container", {
      // 设置地图容器id
      viewMode: "3D", // 是否为3D地图模式
      zoom: 17.5, // 初始化地图级别
      center: [104.305406, 30.606364], // 初始化地图中心点位置
      terrain: true, //开启地形图
    });
  } catch (e) {
    console.log(e);
  }
}
onMounted(async () => {
  if (typeof window !== "undefined") {
    window._AMapSecurityConfig = {
      securityJsCode: "8468351a95a828e0700d4aaa085c3551",
    };
  }
  await loadMap();
  // await loadMapAndPlugins();
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<template>
  <div id="cont">
    <div id="container"></div>
  </div>
</template>
<style lang="scss">
#cont { 
  width: 70vw;
  height: 95vh;
}
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 100%;
}
</style>
