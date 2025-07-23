<script setup>
import { onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import { useMapStore } from '../../../.vitepress/theme/stores/useMapStore';

console.log("航空港地图");

const map = ref(null);
const mapStore = useMapStore();
const markers = ref(new Map()); // 存储标记的 Map
const isCoordinatePickerEnabled = ref(false); // 坐标拾取模式开关

const loadMap = async () => {
  // 不这样引入，会报错;
  const AMapLoader = await import("@amap/amap-jsapi-loader");
  try {
    const AMap = await AMapLoader.load({
      key: "6a691c3f68c403b9483594450c4f45f0",
      version: "2.0",
      plugins: ["AMap.Scale"],
    });
    
    map.value = new AMap.Map("container", {
      // 设置地图容器 id
      viewMode: "3D", // 是否为 3D 地图模式
      zoom: 17, // 初始化地图级别
      center: [103.988272, 30.581158], // 初始化地图中心点位置
      terrain: true, //开启地形图
      rotation: 10, //地图顺时针旋转角度，修正校区位置
    });

    // 添加坐标拾取功能
    setupCoordinatePicker(AMap);

    // 地图加载完成后，添加现有标记
    addExistingMarkers(AMap);
    
  } catch (e) {
    console.log(e);
  }
};

// 设置坐标拾取功能
const setupCoordinatePicker = (AMap) => {
  // 为地图注册 click 事件获取鼠标点击出的经纬度坐标
  map.value.on('click', function(e) {
    // 获取点击位置的经纬度
    const lng = e.lnglat.getLng();
    const lat = e.lnglat.getLat();
    
    if (isCoordinatePickerEnabled.value) {
      // 坐标拾取模式：输出详细信息
      console.log('🗺️ 坐标拾取模式');
      console.log(`经度：${lng}`);
      console.log(`纬度：${lat}`);
      console.log(`坐标：[${lng}, ${lat}]`);
      console.log(`GeoJSON 格式：{"latitude": ${lat}, "longitude": ${lng}}`);
      console.log('-------------------');
      
      // 在地图上添加临时标记
      addTempMarker(AMap, lng, lat);
    } else {
      // 普通模式：简单输出
      console.log(`点击坐标：[${lng}, ${lat}]`);
    }
  });
};

// 添加临时标记（用于坐标拾取时的视觉反馈）
const addTempMarker = (AMap, lng, lat) => {
  // 移除之前的临时标记
  if (window.tempMarker) {
    map.value.remove(window.tempMarker);
  }
  
  // 创建临时标记
  const tempMarkerContent = `
    <div style="
      width: 20px;
      height: 20px;
      background: #ff4444;
      border: 2px solid white;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(255,68,68,0.6);
      position: relative;
    ">
      <div style="
        position: absolute;
        top: 22px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(255,68,68,0.9);
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        white-space: nowrap;
      ">
        拾取点
      </div>
    </div>
  `;
  
  window.tempMarker = new AMap.Marker({
    position: [lng, lat],
    content: tempMarkerContent,
    offset: new AMap.Pixel(-10, -10),
    title: `坐标：[${lng}, ${lat}]`
  });
  
  map.value.add(window.tempMarker);
  
  // 5 秒后自动移除临时标记
  setTimeout(() => {
    if (window.tempMarker) {
      map.value.remove(window.tempMarker);
      window.tempMarker = null;
    }
  }, 5000);
};

// 切换坐标拾取模式
const toggleCoordinatePicker = () => {
  isCoordinatePickerEnabled.value = !isCoordinatePickerEnabled.value;
  console.log(`🗺️ 坐标拾取模式：${isCoordinatePickerEnabled.value ? '开启' : '关闭'}`);
  
  if (isCoordinatePickerEnabled.value) {
    console.log('💡 提示：点击地图任意位置获取坐标');
  }
};

// 添加现有标记
const addExistingMarkers = (AMap) => {
  mapStore.selectedMarkers.forEach(markerData => {
    if (markerData.coordinates) {
      addMarkerToMap(AMap, markerData);
    }
  });
};

// 在地图上添加标记
const addMarkerToMap = (AMap, markerData) => {
  const { location, coordinates, color, isActive } = markerData;
  
  console.log(`添加标记：${location.name}, 激活状态：${isActive}`);
  
  // 创建标记内容
  const markerContent = `
    <div class="custom-content-marker" style="position: relative; width: 30px; height: 40px;">
      <div style="
        width: 30px;
        height: 30px;
        background-color: ${color};
        border: 2px solid white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ${isActive ? 'transform: scale(1.2); z-index: 1000;' : 'transform: scale(1.0); z-index: 100;'}
        transition: all 0.3s ease;
      ">
        <span style="color: white; font-size: 12px; font-weight: bold;">
          ${getLocationIcon(location.type)}
        </span>
      </div>
      <div style="
        position: absolute;
        top: 32px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        white-space: nowrap;
        pointer-events: none;
        transition: opacity 0.3s ease;
        ${isActive ? 'display: block; opacity: 1;' : 'display: none; opacity: 0;'}
      ">
        ${location.name}
      </div>
      <div class="close-btn" onclick="removeMarker('${markerData.id}')" style="
        position: absolute;
        top: -6px;
        right: -8px;
        width: 16px;
        height: 16px;
        font-size: 12px;
        background: #ff4d4f;
        border-radius: 50%;
        color: white;
        text-align: center;
        line-height: 16px;
        cursor: pointer;
        box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        transition: opacity 0.3s ease;
        ${isActive ? 'display: block; opacity: 1;' : 'display: none; opacity: 0;'}
      ">×</div>
    </div>
  `;

  const marker = new AMap.Marker({
    position: [coordinates.longitude, coordinates.latitude],
    content: markerContent,
    offset: new AMap.Pixel(-15, -40),
    title: location.name,
    zIndex: isActive ? 1000 : 100
  });

  // 添加点击事件
  marker.on('click', (e) => {
    // 阻止事件冒泡，避免触发地图点击事件
    e.stopPropagation();
    console.log(`点击标记：${location.name}`);
    mapStore.selectLocation(location);
  });

  // 将标记添加到地图
  map.value.add(marker);
  
  // 存储标记引用
  markers.value.set(markerData.id, marker);
  
  console.log('标记已添加到地图：', location.name, '激活状态：', isActive);
};

// 获取地点类型对应的图标
const getLocationIcon = (type) => {
  const iconMap = {
    '教学楼': '🏫',
    '食堂': '🍽️',
    '图书馆': '📚',
    '宿舍楼': '🏠',
    '体育设施': '⚽',
    '行政楼': '🏢',
    '实验楼': '🔬',
    '停车场': '🅿️',
    '活动中心': '🎭',
    '医疗服务': '🏥',    // 更新图标
    '会议设施': '🎤',    // 新增
    '综合楼': '🏢'       // 新增
  };
  return iconMap[type] || '📍';
};

// 移除标记
const removeMarker = (markerId) => {
  const marker = markers.value.get(markerId);
  if (marker && map.value) {
    map.value.remove(marker);
    markers.value.delete(markerId);
    mapStore.removeMarker(markerId);
  }
};

// 全局函数，供 HTML 中的 onclick 调用
if (typeof window !== 'undefined') {
  window.removeMarker = removeMarker;
}

// 监听 MapStore 中选中地点的变化
watch(
  () => mapStore.selectedLocation,
  (newLocation) => {
    if (newLocation && newLocation.coordinates && map.value) {
      // 移动地图中心到新选中的地点
      map.value.setCenter([newLocation.coordinates.longitude, newLocation.coordinates.latitude]);
      console.log('地图中心移动到：', newLocation.name);
    }
  },
  { deep: true }
);

// 监听 MapStore 中标记列表的变化
watch(
  () => [...mapStore.selectedMarkers], // 创建新数组引用确保响应式更新
  (newMarkers, oldMarkers) => {
    console.log('标记列表发生变化，重新渲染标记');
    if (!map.value) return;
    
    // 强制更新所有标记
    updateAllMarkers();
  },
  { deep: true, flush: 'post' }
);

// 更新所有标记
const updateAllMarkers = async () => {
  if (!map.value) return;
  
  console.log('开始更新所有标记状态');
  
  // 清除所有现有标记
  markers.value.forEach((marker, id) => {
    map.value.remove(marker);
  });
  markers.value.clear();
  
  // 等待 DOM 更新
  await nextTick();
  
  // 获取 AMap 构造函数
  const AMap = window.AMap;
  if (!AMap) return;
  
  // 重新添加所有标记
  mapStore.selectedMarkers.forEach(markerData => {
    if (markerData.coordinates) {
      addMarkerToMap(AMap, markerData);
    }
  });
  
  console.log('标记更新完成');
};

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
  if (map.value) {
    map.value.destroy();
  }
  // 清理临时标记
  if (window.tempMarker) {
    window.tempMarker = null;
  }
});
</script>

<template>
  <div id="cont">
    <div id="container"></div>
    
    <!-- 坐标拾取控制按钮 -->
    <div class="coordinate-picker-controls">
      <button 
        @click="toggleCoordinatePicker" 
        :class="['picker-btn', { active: isCoordinatePickerEnabled }]"
        title="切换坐标拾取模式"
      >
        {{ isCoordinatePickerEnabled ? '🎯 拾取模式' : '📍 普通模式' }}
      </button>
    </div>
  </div>
</template>

<style lang="scss">
#cont {
  height: 80vh;
  position: relative;
}

#container {
  padding: 0px;
  margin: 0px;
  max-width: 100%;
  height: 100%;
}

// 坐标拾取控制按钮
.coordinate-picker-controls {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
}

.picker-btn {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  color: #333;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &.active {
    background: #ff4444;
    color: white;
    border-color: #ff4444;
    
    &:hover {
      background: #ff3333;
    }
  }
}

// 自定义标记样式
.custom-content-marker:hover .close-btn {
  display: block !important;
  opacity: 1 !important;
}
</style>
