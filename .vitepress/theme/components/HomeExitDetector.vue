<template>
  <WelcomeModal ref="modalRef" :image-url="modalConfig.imageUrl" :title="modalConfig.title"
    :description="modalConfig.description" :partycode="modalConfig.partycode" :confirm-text="modalConfig.confirmText"
    :cancel-text="modalConfig.cancelText" @close="handleModalClose" @confirm="handleModalConfirm" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vitepress'
import WelcomeModal from './WelcomeModal.vue'
import PartyImage from './images/party.svg'

interface ModalConfig {
  imageUrl?: string
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
}

const props = withDefaults(defineProps<{
  config?: ModalConfig
}>(), {
  config: () => ({})
})

const modalRef = ref()
const router = useRouter()

// 弹窗配置
const modalConfig = {
  imageUrl: PartyImage,
  title: '欢迎来到 CUIT 指南！',
  description: '这里汇集了成都信息工程大学的各种实用信息和资源，包括学习资料、技术社团、校友网络等。希望能为你的校园生活和职业发展提供帮助。记得收藏本站，随时查看最新内容！',
  confirmText: '开始探索',
  partycode: '用户反馈群：973721542',
  cancelText: '稍后再看',
  ...props.config
}

// 存储标识符
const STORAGE_KEY = 'cuit-guide-first-exit-shown'

// 检查是否已经显示过弹窗
const hasShownModal = () => {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true'
  } catch {
    return false
  }
}

// 标记已显示弹窗
const markModalShown = () => {
  try {
    sessionStorage.setItem(STORAGE_KEY, 'true')
  } catch {
    // 忽略存储错误
  }
}

// 判断是否在主页
const isHomePage = (path: string) => {
  return path === '/' || path === '/index.html' || path === ''
}

// 当前是否在主页
let wasOnHomePage = false

// 路由变化处理
const handleRouteChange = () => {
  const currentPath = router.route.path
  const isCurrentlyHome = isHomePage(currentPath)

  // 如果从主页离开到其他页面，且未显示过弹窗
  if (wasOnHomePage && !isCurrentlyHome && !hasShownModal()) {
    setTimeout(() => {
      modalRef.value?.openModal()
    }, 500) // 延迟500ms显示，确保页面切换完成
  }

  wasOnHomePage = isCurrentlyHome
}

// 弹窗关闭处理
const handleModalClose = () => {
  markModalShown()
}

// 弹窗确认处理
const handleModalConfirm = () => {
  markModalShown()
}

// 监听路由变化
onMounted(() => {
  // 初始化当前页面状态
  wasOnHomePage = isHomePage(router.route.path)

  // 监听路由变化
  router.onAfterRouteChanged = handleRouteChange
})

onUnmounted(() => {
  // 清理监听器
  if (router.onAfterRouteChanged === handleRouteChange) {
    router.onAfterRouteChanged = undefined
  }
})
</script>
