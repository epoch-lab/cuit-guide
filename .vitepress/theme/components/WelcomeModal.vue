<template>
  <Transition name="modal">
    <div v-if="showModal" v-show="imageReady" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <button class="modal-close" @click="closeModal" aria-label="关闭弹窗">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>

        <div class="modal-body">
          <!-- 图片部分 -->
          <div class="modal-image">
            <img
              :src="props.imageUrl"
              :alt="props.imageAlt"
              @load="handleImageLoad"
              @error="handleImageError"
            />
          </div>

          <!-- 文字内容 -->
          <div class="modal-text">
            <h2 class="modal-title">{{ props.title }}</h2>
            <div class="modal-description">{{ props.description }}</div>
            <div>{{ props.partycode }}</div>
          </div>

          <!-- 操作按钮 -->
          <div class="modal-actions">
            <a
              :href="props.qqGroupUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-primary"
              @click="handleConfirm"
            >
              {{ props.confirmText }}
            </a>
            <button class="btn-secondary" @click="closeModal">
              {{ props.cancelText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue'


interface Props {
  imageUrl: string
  imageAlt?: string
  title: string
  description: string
  partycode?: string
  confirmText: string
  qqGroupUrl: string
  cancelText: string
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: '欢迎图片',
  partycode: ''
})

const emit = defineEmits(['close', 'confirm'])

const showModal = ref(false)
const imageReady = ref(false)
const pendingOpen = ref(false)

// 显示弹窗
const openModal = () => {
  imageReady.value = false
  pendingOpen.value = true
  showModal.value = true
  document.body.style.overflow = 'hidden'
}
const handleImageLoad = () => {
  imageReady.value = true
  pendingOpen.value = false
}

const handleImageError = () => {
  imageReady.value = true
  pendingOpen.value = false
}

// 关闭弹窗
const closeModal = () => {
  showModal.value = false
  document.body.style.overflow = ''
  emit('close')
}

// 确认按钮
const handleConfirm = () => {
  emit('confirm')
  closeModal()
}

// 键盘事件监听
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeModal()
  }
}

// 生命周期
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})

// 暴露方法给父组件
defineExpose({
  openModal,
  closeModal
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-content {
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

.modal-body {
  padding: 32px;
  text-align: center;
}

.modal-image {
  margin-bottom: 24px;
  display: flex;
  justify-content: center
}

.modal-image img {
  max-width: 220px;
  max-height: 40vh;
  width: auto;
  height: auto;
  border-radius: 16px;
  object-fit: contain;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.modal-text {
  margin-bottom: 32px;
}

.modal-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 16px 0;
  line-height: 1.3;
}

.modal-description {
  font-size: 16px;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin: 0;
}

.modal-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
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

/* 动画效果 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9) translateY(20px);
}

/* 响应式设计 */
@media (max-width: 640px) {
  .modal-content {
    margin: 0 16px;
    max-width: none;
  }

  .modal-body {
    padding: 24px 20px;
  }

  .modal-image img {
    max-width: 160px;
    max-height: 160px;
  }

  .modal-title {
    font-size: 20px;
  }

  .modal-description {
    font-size: 14px;
  }

  .modal-actions {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }
}

/* 暗色模式适配 */
.dark .modal-content {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.dark .modal-image img {
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}
</style>
