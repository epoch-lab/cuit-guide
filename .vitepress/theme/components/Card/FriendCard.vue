<template>
    <div class="friend-card" :class="{ 'template-card': isTemplate }" @click="navigateToUrl">
        <!-- 内容层 -->
        <div class="card-content">
            <!-- 上半部分：头像 + 个人信息 -->
            <div class="card-header">
                <div class="avatar-wrapper">
                    <div class="avatar-ring"></div>
                    <LazyImage 
                        :src="props.friend.avatar" 
                        :alt="props.friend.name" 
                        class="friend-avatar"
                        loading="lazy"
                    />
                    <div class="avatar-year">{{ props.friend.enrollmentYear }}</div>
                </div>
                <div class="friend-info">
                    <div class="name-section">
                        <h1 class="friend-name">{{ props.friend.name }}</h1>
                    </div>
                    <div class="friend-meta" :class="{ 'expanded': directionsExpanded }">
                        <span class="meta-tag major-tag">{{ props.friend.major }}</span>
                        <span v-for="(direction, index) in displayedDirections" 
                              :key="index" 
                              class="meta-tag direction-tag">
                            {{ direction }}
                        </span>
                        <button 
                            v-if="hasMoreDirections" 
                            @click.stop="toggleDirections"
                            class="meta-tag more-tag"
                            :aria-label="directionsExpanded ? '收起技术方向' : '展开更多技术方向'"
                        >
                            {{ directionsExpanded ? '收起' : `+${hiddenDirectionsCount}` }}
                        </button>
                    </div>
                </div>
            </div>
            
            <!-- 下半部分：描述 -->
            <div class="card-footer">
                <div class="friend-description" :class="{ 'expanded': isExpanded }">
                    <div class="description-text">{{ props.friend.description }}</div>
                    <button 
                        v-if="shouldShowExpandButton" 
                        @click.stop="toggleExpanded"
                        class="expand-button"
                        :aria-label="isExpanded ? '收起描述' : '展开描述'"
                    >
                        <span class="expand-text">{{ isExpanded ? '收起' : '展开' }}</span>
                        <svg class="expand-icon" :class="{ 'rotated': isExpanded }" viewBox="0 0 12 12">
                            <path d="M6 9L1.5 4.5L2.5 3.5L6 7L9.5 3.5L10.5 4.5L6 9Z" fill="currentColor"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue'
import LazyImage from '../ui/LazyImage.vue'

const props = defineProps({
    friend: {
        type: Object,
        required: true,
        validator: (val: any) => ['name', 'link', 'avatar', 'description', "enrollmentYear", "major", "technicalDirection"].every(key => key in val)
    },
    isTemplate: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['template-click', 'layout-change'])

// 展开状态管理
const isExpanded = ref(false)
const directionsExpanded = ref(false)

// 最大可见方向数量（固定值，简化布局）
const maxVisibleDirections = 2

// 判断是否需要显示展开按钮（描述长度超过60个字符）
const shouldShowExpandButton = computed(() => {
    return props.friend.description && props.friend.description.length > 60
})

// 技术方向显示逻辑
const displayedDirections = computed(() => {
    if (directionsExpanded.value) {
        return props.friend.technicalDirection
    }
    return props.friend.technicalDirection.slice(0, maxVisibleDirections)
})

const hasMoreDirections = computed(() => {
    return props.friend.technicalDirection.length > maxVisibleDirections
})

// 计算隐藏的方向数量
const hiddenDirectionsCount = computed(() => {
    return props.friend.technicalDirection.length - maxVisibleDirections
})

// 触发布局重排的函数
const triggerLayoutUpdate = () => {
    // 等待 DOM 更新完成后触发重排
    nextTick(() => {
        setTimeout(() => {
            emit('layout-change');
        }, 50);
    });
};

// 切换展开状态
const toggleExpanded = () => {
    isExpanded.value = !isExpanded.value
    triggerLayoutUpdate()
}

const toggleDirections = () => {
    directionsExpanded.value = !directionsExpanded.value
    triggerLayoutUpdate()
}

const navigateToUrl = () => {
    // 如果是模板卡片，触发复制事件
    if (props.isTemplate) {
        emit('template-click', props.friend);
        return;
    }
    
    // 正常的链接跳转
    if (props.friend.link.startsWith('http')) {
        window.open(props.friend.link, '_blank');
    } else {
        window.open(`https://${props.friend.link}`, '_blank');
    }
}
</script>

<style scoped>
.friend-card {
    display: flex;
    cursor: pointer;
    position: relative;
    border-radius: 16px;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    overflow: hidden;
    margin: 0 auto;
    width: 100%;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.friend-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.2) 50%, 
        transparent 100%);
    transition: left 0.8s ease;
    z-index: 1;
}

.friend-card:hover {
    border-color: var(--vp-c-divider);
    background: var(--vp-c-bg-soft);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
}

.friend-card:hover::before {
    left: 100%;
}

/* 模板卡片特殊样式 */
.template-card {
    border: 1px dashed var(--vp-c-brand);
    background: var(--vp-c-bg);
}

.template-card:hover {
    border-color: var(--vp-c-brand-dark);
    background: var(--vp-c-bg-soft);
}

.card-content {
    position: relative;
    z-index: 2;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 16px;
}

.card-header {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    margin-bottom: 6px;
}

.card-footer {
    margin-top: 6px;
    border-top: 1px solid var(--vp-c-divider-light);
}

.avatar-wrapper {
    position: relative;
    flex-shrink: 0;
}

.avatar-ring {
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6b7280 0%, #9ca3af 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
    z-index: 1;
}

.friend-card:hover .avatar-ring {
    opacity: 1;
}

.friend-avatar {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    background: var(--vp-c-bg);
    border: 2px solid var(--vp-c-bg);
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
    z-index: 2;
}

.avatar-year {
    position: absolute;
    bottom: -2px;
    right: -2px;
    min-width: 20px;
    height: 16px;
    background: var(--vp-c-text-1);
    color: var(--vp-c-bg);
    border: 2px solid var(--vp-c-bg);
    border-radius: 8px;
    font-size: 9px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 3px;
    z-index: 3;
}

.friend-card:hover .friend-avatar {
    transform: rotate(360deg);
}

.friend-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
    max-width: calc(100% - 76px); /* 减去头像宽度(60px) + gap(12px) + 边距(4px) */
    overflow: hidden;
}

.name-section {
    display: flex;
    align-items: center;
}

.friend-name {
    font-size: 16px;
    font-weight: 600;
    color: var(--vp-c-text-1);
    margin: 0;
}

/* 标签样式 */
.friend-meta {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: nowrap;
    overflow: hidden;
    transition: all 0.3s ease;
    min-width: 0;
    width: 100%; /* 确保占满父容器宽度 */
}

.friend-meta.expanded {
    flex-wrap: wrap;
    overflow: visible;
    height: auto; /* 允许垂直扩展，但不影响水平宽度 */
}

.meta-tag {
    display: inline-flex;
    align-items: center;
    padding: 3px 8px;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 500;
    white-space: nowrap;
    transition: all 0.3s ease;
    border: none;
    cursor: default;
    flex-shrink: 0;
    height: 20px;
}

.major-tag {
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    border: 1px solid var(--vp-c-divider);
    position: relative;
    font-weight: 500;
}

.major-tag::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
    border-radius: 1px;
}

.direction-tag {
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-2);
    border-radius: 6px;
    max-width: 120px; /* 限制最大宽度 */
    overflow: hidden;
    text-overflow: ellipsis;
}

.more-tag {
    background: var(--vp-c-brand-soft);
    color: var(--vp-c-brand);
    cursor: pointer;
    font-weight: 600;
    flex-shrink: 0; /* 防止展开按钮被压缩 */
    min-width: auto; /* 允许按钮根据内容调整大小 */
}

.more-tag:hover {
    background: var(--vp-c-brand);
    color: white;
}

.friend-description {
    font-size: 13px;
    line-height: 1.5;
    color: var(--vp-c-text-2);
    margin: 0;
    position: relative;
}

.description-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    transition: all 0.3s ease;
}

.friend-description.expanded .description-text {
    display: block;
    -webkit-line-clamp: unset;
    line-clamp: unset;
}

.expand-button {
    display: flex;
    align-items: center;
    gap: 4px;
    background: none;
    border: none;
    color: var(--vp-c-brand);
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;
    padding: 4px 0;
    margin-top: 6px;
    transition: all 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.expand-button:hover {
    color: var(--vp-c-brand-dark);
}

.expand-text {
    transition: color 0.3s ease;
}

.expand-icon {
    width: 12px;
    height: 12px;
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    flex-shrink: 0;
}

.expand-icon.rotated {
    transform: rotate(180deg);
}

.expand-button:focus {
    outline: 2px solid var(--vp-c-brand);
    outline-offset: 2px;
    border-radius: 4px;
}

/* 暗色模式设置 */
:root.dark .friend-card {
    background: var(--vp-c-bg-soft);
    border-color: var(--vp-c-divider);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

:root.dark .friend-card:hover {
    background: var(--vp-c-bg-mute);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    border-color: var(--vp-c-divider-light);
}

:root.dark .friend-card::before {
    background: linear-gradient(90deg, 
        transparent 0%, 
        rgba(255, 255, 255, 0.05) 50%, 
        transparent 100%);
}

:root.dark .template-card {
    border-color: var(--vp-c-brand-light);
    background: var(--vp-c-bg-soft);
}

:root.dark .template-card:hover {
    border-color: var(--vp-c-brand);
    background: var(--vp-c-bg-mute);
}

:root.dark .major-tag {
    background: var(--vp-c-bg-mute);
    color: var(--vp-c-text-1);
    border-color: var(--vp-c-divider-light);
}

:root.dark .direction-tag {
    background: var(--vp-c-bg-mute);
    color: var(--vp-c-text-2);
}

:root.dark .avatar-year {
    background: var(--vp-c-text-1);
    color: var(--vp-c-bg-soft);
}

/* 响应式设置 */
@media (max-width: 768px) {
    .card-content {
        padding: 14px;
    }

    .card-header {
        gap: 10px;
        margin-bottom: 6px;
    }

    .friend-avatar {
        width: 52px;
        height: 52px;
    }

    .avatar-status {
        width: 12px;
        height: 12px;
        bottom: 1px;
        right: 1px;
    }

    .friend-name {
        font-size: 15px;
    }

    .year-badge {
        padding: 4px 8px;
        font-size: 10px;
    }

    .friend-tag {
        padding: 4px 8px;
        font-size: 11px;
        gap: 4px;
    }

    .tag-dot {
        width: 4px;
        height: 4px;
    }

    .friend-description {
        font-size: 12px;
    }

    .card-footer {
        margin-top: 6px;
    }
}

@media (max-width: 480px) {
    .card-content {
        padding: 12px;
    }

    .card-header {
        gap: 8px;
        margin-bottom: 6px;
    }


    .name-section {
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
    }

    .friend-avatar {
        width: 48px;
        height: 48px;
    }

    .friend-name {
        font-size: 14px;
        margin: 0;
    }

    .year-badge {
        padding: 3px 6px;
        font-size: 9px;
    }

    .friend-tags {
        gap: 6px;
    }

    .friend-tag {
        padding: 3px 6px;
        font-size: 10px;
    }

    .card-footer {
        margin-top: 6px;
    }

    .friend-description {
        font-size: 11px;
    }

    .expand-button {
        font-size: 10px;
        margin-top: 4px;
    }

    .expand-icon {
        width: 10px;
        height: 10px;
    }
}
</style>
