<template>
    <div class="friend-card" @click="navigateToUrl">
        <!-- 模糊背景层 -->
        <!-- 废案 -->
        <div class="card-background">
            <img :src="props.friend.avatar" :alt="props.friend.name" class="bg-image" loading="lazy" aria-hidden="true">
        </div>

        <!-- 内容层 -->
        <div class="card-content">
            <div class="avatar-wrapper">
                <div class="breathing-ring"></div>
                <img :src="props.friend.avatar" :alt="props.friend.name" class="friend-avatar" loading="lazy">
            </div>
            <div class="friend-info">
                <h1 class="friend-name">{{ props.friend.name }}</h1>
                <div class="friend-tags">
                    <div v-for="(tag, index) in formattedTags" :key="index" class="friend-tag">
                        {{ tag }}
                    </div>
                </div>
                <div class="friend-description">
                    {{ props.friend.description }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    friend: {
        type: Object,
        required: true,
        validator: (val: any) => ['name', 'link', 'avatar', 'description', "enrollmentYear", "major", "technicalDirection"].every(key => key in val)
    },
})

const formattedTags = computed(() => [
    `${props.friend.enrollmentYear} 级`,
    `${props.friend.major} 专业`,
    `${props.friend.technicalDirection} 方向`
])

const navigateToUrl = () => {
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
    align-items: center;
    cursor: pointer;
    --card-bg: linear-gradient(135deg, #e6f4ff 0%, #b3d9ff 100%);
    /* 浅蓝色渐变 */
    --card-border: var(--vp-c-divider);
    --card-shadow: var(--vp-shadow-1);
    --card-hover-shadow: var(--vp-shadow-3);
    --tag-bg: var(--vp-c-gray-soft);

    position: relative;
    min-height: 200px;
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    margin: 0 auto;
}

.card-background {
    position: absolute;
    inset: 0;
    z-index: 1;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: var(--dark-gradient);
        mix-blend-mode: multiply;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
}

.bg-image {
    width: 170px;
    height: 100%;
    object-fit: cover;
    filter: blur(20px) brightness(0.8);
    opacity: 0.6;
    transition: filter 0.3s ease;
}

.card-content {
    position: relative;
    z-index: 1;
    background: var(--card-bg);
    backdrop-filter: saturate(180%) blur(4px);
    width: 520px;
    height: 100%;
    display: flex;
    padding: 16px;
    border: 1px solid var(--card-border);
    border-radius: inherit;
    box-shadow: var(--card-shadow);
    margin: 0;
}

.friend-card:hover {
    box-shadow: var(--card-hover-shadow);
}

.friend-card:hover .bg-image {
    filter: blur(15px) brightness(0.85);
}

.friend-avatar {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
    transition: transform 0.3s ease;
    box-shadow: var(--vp-shadow-1);
    padding: 4px;
    border: 6px solid #4592fe;
}

.friend-avatar:hover {
    transform: scale(1.03);
}

.friend-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
}

.friend-name {
    font-size: 22px;
    font-weight: 600;
    color: var(--vp-c-text-1);
    margin-bottom: 8px;
}

/* TODO */
.friend-tags {
    display: flex;
    align-items: start;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 12px;
}

.friend-tag {
    background: var(--tag-bg);
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 12px;
    font-weight: 500;
    color: var(--vp-c-text-2);
    transition: background 0.25s ease;
}

.friend-description {
    font-size: 14px;
    line-height: 1.5;
    color: var(--vp-c-text-2);
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* 暗色模式设置 */
:root.dark .friend-card {
    --card-bg: linear-gradient(135deg, #513951 0%, #2a2a37 100%);
}

:root.dark .friend-avatar {
    border: 6px solid #ff79c6;
}

/* 响应式设置 */
@media ((max-width: 1450px)) {
    .friend-card {
        max-width: 500px;
        width: 100%;
    }
}

@media ((max-width: 540px)) or ((min-width: 775px) and (max-width: 1024px)) {
    .friend-card {
        max-width: 500px;
        width: 90%;
        height: auto;
    }

    .friend-avatar {
        width: 100px;
        height: 100px;
        margin: 12px;
    }

    .friend-tags {
        min-height: 75px;
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
        margin-bottom: 12px;
    }

    .bg-image {
        width: 140px;
        height: 180px;
    }

    .friend-info {
        margin: 12px;

        .friend-description {
            position: relative;
            width: calc(100% + 130px);
            right: 125px;
        }
    }

}
</style>
