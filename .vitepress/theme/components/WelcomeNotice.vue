<!--
  欢迎通知组件 —— 移动端 overlay 与桌面端 toast 二合一，UA 自动识别
-->
<template>
  <!-- Transition name 跟随平台：modal（缩放淡入）/ toast（上滑） -->
  <Transition :name="isMobile ? 'modal' : 'toast'">
    <!-- v-if 控制挂载，v-show 等待图片；移动端点击遮罩关闭 -->
    <div
      v-if="show"
      v-show="imageReady"
      :class="isMobile ? 'outer-overlay' : 'outer-toast'"
      @click="isMobile && close()"
    >
      <div :class="isMobile ? 'card-modal' : 'card-toast'" @click.stop>

        <!-- 移动端：右上角 × 关闭 -->
        <button v-if="isMobile" class="modal-close" @click="close" aria-label="关闭弹窗">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <!-- 桌面端折叠态：问候文本 + 上箭头展开 -->
        <div v-if="!isMobile && !expanded" class="greeting" @click="expanded = true">
          <span class="greeting-text">{{ title }} {{ description.slice(0, 36) }}...</span>
          <button class="toggle-btn">
            <span class="vpi-chevron-up caret-icon" />
          </button>
        </div>

        <!-- 共用内容区：移动端始终可见，桌面折叠时隐藏 -->
        <div class="body" :class="{ 'body-hidden': !isMobile && !expanded }">
          <div class="image">
            <img
              :src="imageUrl"
              :alt="imageAlt"
              @load="handleImageLoad"
              @error="handleImageLoad"
            />
          </div>
          <h2 class="title">{{ title }}</h2>
          <p class="desc">{{ description }}</p>
          <div class="partycode">{{ partycode }}</div>
          <!-- 桌面端展开：下箭头收起 -->
          <button v-if="!isMobile && expanded" class="toggle-btn" @click="expanded = false">
            <span class="vpi-chevron-right caret-icon icon-rotated" />
          </button>
        </div>

        <!-- 底部操作栏：桌面等宽分隔 / 移动端圆角按钮 -->
        <div v-if="!isMobile" class="footer-toast">
          <a
            :href="qqGroupUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-join"
            @click="handleConfirm"
          >{{ confirmText }}</a>
          <div class="split" />
          <button class="btn-later" @click="close">{{ cancelText }}</button>
        </div>
        <div v-else class="modal-actions">
          <a
            :href="qqGroupUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary"
            @click="handleConfirm"
          >{{ confirmText }}</a>
          <button class="btn-secondary" @click="close">{{ cancelText }}</button>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

interface Props {
  imageUrl: string;
  imageAlt?: string;
  title: string;
  description: string;
  partycode?: string;
  confirmText: string;
  qqGroupUrl: string;
  cancelText: string;
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: "欢迎图片",
  partycode: "",
});

const emit = defineEmits<{
  (e: "close"): void;
  (e: "confirm"): void;
}>();

// ──── 状态 ────
const isMobile = ref(false);   // UA 检测，onMounted 设定
const show = ref(false);       // DOM 挂载开关
const imageReady = ref(false); // 图片就绪后显示
const expanded = ref(false);   // 桌面端折叠/展开

let autoHideTimer: ReturnType<typeof setTimeout> | null = null; // 桌面 10s 定时器

// ──── 公开方法 ────

/*
  open()：打开通知，重置状态
  移动端锁定 body 滚动
*/
const open = () => {
  show.value = true;
  imageReady.value = false;
  expanded.value = false;
  isMobile.value = /Android|iPhone|iPad|iPod|webOS|BlackBerry|Windows Phone/i.test(
    navigator.userAgent,
  );
  if (isMobile.value) {
    document.body.style.overflow = "hidden";
  }
};

/*
  handleImageLoad()：图片加载完成/失败
  桌面端在图片就绪后才启动 10s 自动关闭
*/
const handleImageLoad = () => {
  imageReady.value = true;
  if (!isMobile.value) {
    startAutoHide();
  }
};

const close = () => {
  show.value = false;
  document.body.style.overflow = "";
  clearAutoHide();
  emit("close");
};

const handleConfirm = () => {
  emit("confirm");
  close();
};

// ──── 桌面端 10s 自动关闭 ────

const startAutoHide = () => {
  clearAutoHide();
  autoHideTimer = setTimeout(() => {
    close();
  }, 10000);
};

const clearAutoHide = () => {
  if (autoHideTimer !== null) {
    clearTimeout(autoHideTimer);
    autoHideTimer = null;
  }
};

// ──── 键盘 ────

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    close();
  }
};

// ──── 生命周期 ────

onMounted(() => {
  document.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeydown);
  document.body.style.overflow = "";
  clearAutoHide();
});

defineExpose({ open, close });
</script>

<style scoped>
/* ── 1. 移动端遮罩 ── */
.outer-overlay {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

/* 居中卡片，最大 500px，可滚动 */
.card-modal {
  position: relative;
  background: var(--vp-c-bg);
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid var(--vp-c-divider);
}

/* 右上角圆形 × 按钮 */
.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 40px;
  height: 40px;
  border: none;
  background: var(--vp-c-bg-soft);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--vp-c-text-2);
  z-index: 1;
}

.modal-close:hover {
  background: var(--vp-c-bg-mute);
  color: var(--vp-c-text-1);
  transform: scale(1.05);
}

/* ── 2. 桌面端通知条 ── */
/* 外层不拦截点击，卡片自身处理事件 */
.outer-toast {
  pointer-events: none;
}

/* 固定右下角 380px */
.card-toast {
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 380px;
  background: var(--vp-c-bg);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  overflow: hidden;
  pointer-events: auto;
}

/* ── 3. 折叠问候条 ── */
.greeting {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 20px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  user-select: none;
  gap: 8px;
}

.greeting-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── 4. 共用内容区 ── */
.body {
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.body-hidden {
  display: none;
}

.image {
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
}

.image img {
  max-width: 220px;
  max-height: 40vh;
  width: auto;
  height: auto;
  border-radius: 12px;
  object-fit: contain;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 12px 0;
  line-height: 1.3;
}

.desc {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin: 0 0 12px 0;
  line-height: 1.6;
}

.partycode {
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-brand);
}

/* ── 5. 图标与折叠按钮 ── */
.caret-icon {
  color: var(--vp-c-brand);
  width: 20px;
  height: 20px;
  display: block;
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.body .toggle-btn {
  align-self: flex-end;
  margin-top: 12px;
}

.icon-rotated {
  transform: rotate(90deg);
}

/* ── 6. 桌面端底部操作栏 ── */
.footer-toast {
  display: flex;
  border-top: 1px solid var(--vp-c-divider);
}

.btn-join,
.btn-later {
  flex: 1;
  padding: 12px 0;
  border: none;
  background: transparent;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s;
  line-height: 1.4;
}

.btn-join:hover,
.btn-later:hover {
  background: var(--vp-c-bg-soft);
}

.btn-join {
  color: var(--vp-c-brand);
}

.btn-later {
  color: var(--vp-c-text-2);
}

.split {
  width: 1px;
  background: var(--vp-c-divider);
}

/* ── 7. 移动端操作按钮 ── */
.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0 32px 32px;
}

.btn-primary,
.btn-secondary {
  text-align: center;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1px solid transparent;
  min-width: 120px;
}

.btn-primary {
  background: var(--vp-c-brand);
  color: white;
  border: 1px solid var(--vp-c-brand);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-color: var(--vp-c-divider);
}

.btn-primary:hover {
  background: var(--vp-c-brand, rgba(var(--vp-c-brand), 0.9));
  border-color: var(--vp-c-divider-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  filter: saturate(1.1);
}

.btn-secondary {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

.btn-secondary:hover {
  background: var(--vp-c-bg-mute);
  border-color: var(--vp-c-divider-light);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  filter: saturate(1.1);
}

/* ── 8. 动效 ── */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .card-modal,
.modal-leave-to .card-modal {
  transform: scale(0.9) translateY(20px);
}

.toast-enter-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* ── 9. 响应式（移动端小屏 ≤ 640px） ── */
@media (max-width: 640px) {
  .card-modal {
    margin: 0 16px;
    max-width: none;
  }

  .body {
    padding: 24px 20px;
  }

  .image img {
    max-width: 160px;
    max-height: 160px;
  }

  .title {
    font-size: 20px;
  }

  .desc {
    font-size: 14px;
  }

  .modal-actions {
    flex-direction: column;
    padding: 0 20px 24px;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}

/* ── 10. 暗色模式 ── */
.dark .card-modal {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.dark .card-toast {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.dark .image img {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
</style>
