<template>
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
</template>

<script setup lang="ts">
// 无需任何逻辑
</script>

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
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
    min-width: 0;
}

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
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
    }

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
