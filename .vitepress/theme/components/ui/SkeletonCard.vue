<template>
  <div class="friend-card skeleton-card">
    <!-- 内容层 -->
    <div class="card-content">
      <!-- 上半部分：头像 + 个人信息 -->
      <div class="card-header">
        <div class="avatar-wrapper">
          <div class="friend-avatar skeleton-avatar"></div>
          <div class="avatar-year skeleton-year"></div>
        </div>
        <div class="friend-info">
          <div class="name-section">
            <div class="friend-name skeleton-name"></div>
          </div>
          <div class="friend-meta">
            <div class="meta-tag major-tag skeleton-major"></div>
            <div class="meta-tag direction-tag skeleton-direction"></div>
            <div class="meta-tag direction-tag skeleton-direction"></div>
          </div>
        </div>
      </div>
      
      <!-- 下半部分：描述 -->
      <div class="card-footer">
        <div class="friend-description">
          <div class="description-text">
            <div class="skeleton-description-line"></div>
            <div class="skeleton-description-line"></div>
            <div class="skeleton-description-line short"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需任何逻辑
</script>

<script lang="ts">
export default {};
</script>

<style scoped>
/* 骨架屏卡片样式 */
.friend-card.skeleton-card {
    display: flex;
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
    margin-bottom: 8px;
}

.card-footer {
    margin-top: 6px;
    border-top: 1px solid var(--vp-c-divider-light);
}

.avatar-wrapper {
    position: relative;
    flex-shrink: 0;
}

/* 头像骨架屏 */
.friend-avatar.skeleton-avatar {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: var(--vp-c-bg-soft);
    border: 2px solid var(--vp-c-bg);
    z-index: 2;
    animation: skeleton-shimmer 2s infinite;
}

/* 年份标签骨架屏 */
.avatar-year.skeleton-year {
    position: absolute;
    bottom: -2px;
    right: -2px;
    width: 24px;
    height: 16px;
    background: var(--vp-c-bg-soft);
    border: 2px solid var(--vp-c-bg);
    border-radius: 8px;
    z-index: 3;
    animation: skeleton-shimmer 2s infinite;
}

.friend-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
}

.name-section {
    display: flex;
    align-items: center;
}

/* 姓名骨架屏 */
.friend-name.skeleton-name {
    height: 16px;
    width: 120px;
    background: var(--vp-c-bg-soft);
    border-radius: 4px;
    margin: 0;
    animation: skeleton-shimmer 2s infinite;
}

.friend-meta {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-wrap: nowrap;
    margin-top: 8px;
    overflow: hidden;
}

.meta-tag {
    display: inline-flex;
    align-items: center;
    padding: 2px 6px;
    border-radius: 8px;
    font-size: 10px;
    font-weight: 500;
    white-space: nowrap;
    flex-shrink: 0;
    height: 20px;
}

/* 专业标签骨架屏 */
.major-tag.skeleton-major {
    width: 80px;
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-divider);
    animation: skeleton-shimmer 2s infinite;
}

/* 技术方向标签骨架屏 */
.direction-tag.skeleton-direction {
    width: 60px;
    background: var(--vp-c-bg-soft);
    animation: skeleton-shimmer 2s infinite;
}

.direction-tag.skeleton-direction:nth-child(3) {
    width: 80px;
}

.friend-description {
    font-size: 13px;
    line-height: 1.5;
    color: var(--vp-c-text-2);
    margin: 0;
    position: relative;
}

.description-text {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

/* 描述文本骨架屏 */
.skeleton-description-line {
    height: 13px;
    background: var(--vp-c-bg-soft);
    border-radius: 3px;
    animation: skeleton-shimmer 2s infinite;
}

.skeleton-description-line:nth-child(1) {
    width: 100%;
}

.skeleton-description-line:nth-child(2) {
    width: 85%;
}

.skeleton-description-line.short {
    width: 60%;
}

/* 简单的闪动效果 */
@keyframes skeleton-shimmer {
    0% {
        opacity: 0.6;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0.6;
    }
}


/* 响应式设计 */
@media (max-width: 768px) {
    .card-content {
        padding: 14px;
    }

    .card-header {
        gap: 10px;
        margin-bottom: 6px;
    }

    .card-footer {
        padding-top: 6px;
    }

    .friend-avatar.skeleton-avatar {
        width: 52px;
        height: 52px;
    }

    .friend-name.skeleton-name {
        height: 15px;
        width: 100px;
    }

    .friend-description {
        font-size: 12px;
    }

    .skeleton-description-line {
        height: 12px;
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

    .card-footer {
        padding-top: 6px;
    }

    .name-section {
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
    }

    .friend-avatar.skeleton-avatar {
        width: 48px;
        height: 48px;
    }

    .friend-name.skeleton-name {
        height: 14px;
        width: 80px;
        margin: 0;
    }

    .major-tag.skeleton-major {
        width: 60px;
    }

    .direction-tag.skeleton-direction {
        width: 50px;
    }

    .direction-tag.skeleton-direction:nth-child(3) {
        width: 65px;
    }

    .friend-description {
        font-size: 11px;
    }

    .skeleton-description-line {
        height: 11px;
    }
}
</style>
