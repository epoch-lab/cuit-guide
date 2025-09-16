<template>
<<<<<<< HEAD
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
=======
    <div class="skeleton-card">
        <div class="skeleton-content">
            <!-- 上半部分：头像 + 信息 -->
            <div class="skeleton-header">
                <div class="skeleton-avatar"></div>
                <div class="skeleton-info">
                    <div class="skeleton-name-section">
                        <div class="skeleton-name"></div>
                        <div class="skeleton-badge"></div>
                    </div>
                    <div class="skeleton-tags">
                        <div class="skeleton-tag"></div>
                        <div class="skeleton-tag"></div>
                    </div>
                </div>
            </div>
            
            <!-- 下半部分：描述 -->
            <div class="skeleton-footer">
                <div class="skeleton-description">
                    <div class="skeleton-line"></div>
                    <div class="skeleton-line short"></div>
                </div>
            </div>
        </div>
    </div>
>>>>>>> 2081d2911ccf668b244b5b2e0f21fd506495410a
</template>

<script setup lang="ts">
// 无需任何逻辑
</script>

<<<<<<< HEAD
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
=======
<style scoped>
.skeleton-card {
    width: 100%;
    height: 180px;
    border-radius: 16px;
    overflow: hidden;
    margin: 0 auto;
    background: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider-light);
}

.skeleton-content {
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 100%;
    gap: 16px;
}

.skeleton-header {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    flex: 1;
}

.skeleton-footer {
    padding-top: 16px;
    border-top: 1px solid var(--vp-c-divider-light);
}

.skeleton-avatar {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background: linear-gradient(90deg, 
        var(--vp-c-bg-soft) 0%, 
        var(--vp-c-bg-soft-mute) 50%, 
        var(--vp-c-bg-soft) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    flex-shrink: 0;
}

.skeleton-info {
>>>>>>> 2081d2911ccf668b244b5b2e0f21fd506495410a
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
}

<<<<<<< HEAD
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
=======
.skeleton-name-section {
    display: flex;
    align-items: center;
    gap: 8px;
}

.skeleton-name {
    height: 20px;
    width: 120px;
    border-radius: 4px;
    background: linear-gradient(90deg, 
        var(--vp-c-bg-soft) 0%, 
        var(--vp-c-bg-soft-mute) 50%, 
        var(--vp-c-bg-soft) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.skeleton-badge {
    height: 16px;
    width: 40px;
    border-radius: 12px;
    background: linear-gradient(90deg, 
        #ff6b35 0%, 
        #f7931e 50%, 
        #ff6b35 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    animation-delay: 0.1s;
    opacity: 0.6;
}

.skeleton-tags {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
}

.skeleton-tag {
    height: 20px;
    border-radius: 6px;
    background: linear-gradient(90deg, 
        var(--vp-c-bg-soft) 0%, 
        var(--vp-c-bg-soft-mute) 50%, 
        var(--vp-c-bg-soft) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.skeleton-tag:nth-child(1) {
    width: 60px;
    animation-delay: 0.2s;
}

.skeleton-tag:nth-child(2) {
    width: 80px;
    animation-delay: 0.4s;
}

.skeleton-description {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.skeleton-line {
    height: 14px;
    border-radius: 3px;
    background: linear-gradient(90deg, 
        var(--vp-c-bg-soft) 0%, 
        var(--vp-c-bg-soft-mute) 50%, 
        var(--vp-c-bg-soft) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.skeleton-line:nth-child(1) {
    width: 90%;
    animation-delay: 0.1s;
}

.skeleton-line.short {
    width: 60%;
    animation-delay: 0.3s;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}

/* 移动端适配 */
@media (max-width: 768px) {
    .skeleton-card {
        height: 160px;
    }

    .skeleton-content {
        padding: 16px;
        gap: 12px;
    }

    .skeleton-header {
        gap: 12px;
    }

    .skeleton-avatar {
        width: 60px;
        height: 60px;
    }

    .skeleton-name {
        height: 18px;
        width: 100px;
    }

    .skeleton-badge {
        height: 14px;
        width: 35px;
    }

    .skeleton-tag {
        height: 18px;
    }

    .skeleton-line {
        height: 12px;
    }

    .skeleton-footer {
        padding-top: 12px;
    }
}

@media (max-width: 480px) {
    .skeleton-card {
        height: 150px;
    }

    .skeleton-content {
        padding: 14px;
        gap: 10px;
    }

    .skeleton-header {
        gap: 10px;
    }

    .skeleton-avatar {
        width: 52px;
        height: 52px;
    }

    .skeleton-name-section {
>>>>>>> 2081d2911ccf668b244b5b2e0f21fd506495410a
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
    }

<<<<<<< HEAD
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
=======
    .skeleton-name {
        height: 16px;
        width: 80px;
    }

    .skeleton-badge {
        height: 12px;
        width: 30px;
    }

    .skeleton-footer {
        padding-top: 10px;
    }
}
</style>
>>>>>>> 2081d2911ccf668b244b5b2e0f21fd506495410a
