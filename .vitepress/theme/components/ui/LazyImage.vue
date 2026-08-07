<template>
    <img 
        ref="imgRef"
        :src="currentSrc" 
        :alt="alt" 
        :class="[
            'lazy-image',
            { 'loading': !loaded, 'loaded': loaded, 'error': hasError }
        ]"
        @load="onLoad"
        @error="onError"
        v-bind="$attrs"
    />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

interface Props {
    src: string
    alt: string
    placeholder?: string
    loading?: 'lazy' | 'eager'
}

const props = withDefaults(defineProps<Props>(), {
    placeholder: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+',
    loading: 'lazy'
})

const loaded = ref(false)
const hasError = ref(false)
const currentSrc = ref(props.placeholder)

const observer = ref<IntersectionObserver | null>(null)
const imgRef = ref<HTMLImageElement | null>(null)

const onLoad = () => {
    loaded.value = true
    hasError.value = false
}

const onError = () => {
    hasError.value = true
    loaded.value = false
    // 错误时显示默认头像
    currentSrc.value = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2Y0ZjRmNCIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iMC4zZW0iPkVycm9yPC90ZXh0Pjwvc3ZnPg=='
}

const loadImage = () => {
    if (props.src && props.src !== props.placeholder) {
        currentSrc.value = props.src
    }
}

onMounted(() => {
    if (props.loading === 'eager') {
        loadImage()
        return
    }

    // 创建 Intersection Observer 用于懒加载
    observer.value = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    loadImage()
                    if (observer.value && imgRef.value) {
                        observer.value.unobserve(imgRef.value)
                    }
                }
            })
        },
        {
            rootMargin: '50px' // 提前50px开始加载
        }
    )

    // 需要等到下一个tick确保DOM已经渲染
    setTimeout(() => {
        if (observer.value && imgRef.value) {
            observer.value.observe(imgRef.value)
        }
    }, 0)
})

// 监听src变化
watch(() => props.src, () => {
    loaded.value = false
    hasError.value = false
    currentSrc.value = props.placeholder
    if (props.loading === 'eager') {
        loadImage()
    }
})

// 清理
onBeforeUnmount(() => {
    if (observer.value) {
        observer.value.disconnect()
    }
})

// 暴露ref给父组件
defineExpose({
    imgRef
})
</script>

<script lang="ts">
import { onBeforeUnmount } from 'vue'

export default {
    inheritAttrs: false
}
</script>

<style scoped>
.lazy-image {
    transition: opacity 0.3s ease, filter 0.3s ease;
    background-color: var(--vp-c-bg-soft);
}

.lazy-image.loading {
    opacity: 0.7;
    filter: blur(1px);
}

.lazy-image.loaded {
    opacity: 1;
    filter: none;
}

.lazy-image.error {
    opacity: 0.5;
    filter: grayscale(100%);
}
</style>
