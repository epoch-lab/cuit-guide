<template>
    <div class="container">
        <header>
            <h1>照片 4:3 压缩转换</h1>
            <p>上传图片，自动裁剪并转换为标准尺寸 (600×800)</p>
        </header>

        <div class="app-content">
            <!-- 上传区域 -->
            <div class="upload-area" :class="{ highlight: isDragging }" @drop="onDrop" @dragover="onDragOver"
                @dragleave="onDragLeave">
                <div class="upload-icon">
                    <i class="fas fa-cloud-upload-alt"></i>
                </div>
                <div class="upload-text">
                    <h3>拖放图片到这里</h3>
                    <p>或者</p>
                </div>
                <input type="file" ref="fileInput" accept="image/*" class="file-input" @change="onFileSelected">
                <button class="browse-btn" @click="fileInput.click()">
                    <i class="fas fa-folder-open"></i> 浏览文件
                </button>
                <div class="selected-file" v-if="selectedFile">
                    已选择: <span>{{ selectedFile.name }}</span> ({{ formatFileSize(selectedFile.size) }})
                </div>
            </div>

            <!-- 转换按钮 -->
            <button class="convert-btn" @click="handleSubmit" :disabled="!hasSelectedFile || processing">
                <span v-if="!processing">转换图片</span>
                <span v-else>处理中...</span>
            </button>

            <!-- 加载指示器 -->
            <div class="loading" v-if="processing">
                <div class="spinner"></div>
            </div>

            <!-- 预览区域 -->
            <div class="preview-area" :class="{ visible: showPreview }" v-if="showPreview">
                <h2>转换结果预览</h2>
                <img :src="previewUrl" class="preview-image" style="max-width: 300px;">
                <div class="file-info">
                    <span>尺寸: 600×800px</span>
                    <span>格式: JPEG</span>
                    <span>大小: {{ convertedSize }}</span>
                </div>
                <a class="download-btn" :href="previewUrl" download="converted.jpg">
                    <i class="fas fa-download"></i> 下载图片
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
// 引用DOM元素
const fileInput = ref(null);

// 响应式状态
const previewUrl = ref("");
const selectedFile = ref(null);
const processing = ref(false);
const isDragging = ref(false);
const convertedSize = ref("");

// 计算属性
const hasSelectedFile = computed(() => !!selectedFile.value);
const showPreview = computed(() => !!previewUrl.value);

// 格式化文件大小
const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// 处理拖放事件
const onDragOver = (e) => {
    e.preventDefault();
    isDragging.value = true;
};

const onDragLeave = () => {
    isDragging.value = false;
};

const onDrop = (e) => {
    e.preventDefault();
    isDragging.value = false;

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        selectedFile.value = e.dataTransfer.files[0];
    }
};

// 处理文件选择
const onFileSelected = (e) => {
    if (e.target.files && e.target.files[0]) {
        selectedFile.value = e.target.files[0];
    }
};

// 处理图像
const processImage = (file) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const targetW = 600, targetH = 800, targetRatio = 3 / 4;

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const w = img.width, h = img.height, currentRatio = w / h;

            // 裁剪
            if (currentRatio > targetRatio) {
                const newW = h * targetRatio;
                const sx = (w - newW) / 2;
                canvas.width = newW;
                canvas.height = h;
                ctx.drawImage(img, sx, 0, newW, h, 0, 0, newW, h);
            } else {
                const newH = w / targetRatio;
                const sy = (h - newH) / 2;
                canvas.width = w;
                canvas.height = newH;
                ctx.drawImage(img, 0, sy, w, newH, 0, 0, w, newH);
            }

            // 缩放
            const resized = document.createElement("canvas");
            resized.width = targetW;
            resized.height = targetH;
            resized.getContext("2d").drawImage(canvas, 0, 0, targetW, targetH);

            // 二分压缩
            const minKB = 50, maxKB = 400;
            let qMin = 0.1, qMax = 0.95;
            let bestBlob = null;

            const compress = () => {
                if (qMin <= qMax) {
                    const qMid = (qMin + qMax) / 2;
                    resized.toBlob((blob) => {
                        const sizeKB = blob.size / 1024;

                        if (sizeKB >= minKB && sizeKB <= maxKB) {
                            resolve(blob);
                        } else if (sizeKB > maxKB) {
                            qMax = qMid - 0.01;
                            compress();
                        } else {
                            bestBlob = blob;
                            qMin = qMid + 0.01;
                            compress();
                        }
                    }, "image/jpeg", qMid);
                } else {
                    resolve(bestBlob);
                }
            };

            compress();
        };
    });
};

// 显示提示信息
const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) {
            document.body.removeChild(toast);
        }
    }, 3000);
};

// 提交表单
const handleSubmit = async () => {
    if (!selectedFile.value) return;

    processing.value = true;
    previewUrl.value = "";

    try {
        const blob = await processImage(selectedFile.value);
        previewUrl.value = URL.createObjectURL(blob);
        convertedSize.value = formatFileSize(blob.size);

        // 显示完成提示
        showToast(`转换完成！大小: ${convertedSize.value}`);
    } catch (error) {
        console.error("Error processing image:", error);
        showToast("处理图片时出现错误，请重试。");
    } finally {
        processing.value = false;
    }
};

</script>


<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.container {
    width: 100%;
    max-width: 800px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
}

header {
    background: linear-gradient(90deg, #3498db, #8e44ad);
    color: white;
    padding: 25px;
    text-align: center;
}

header h1 {
    font-weight: 600;
    font-size: 28px;
    margin-bottom: 10px;
}

header p {
    opacity: 0.9;
}

.app-content {
    padding: 30px;
}

.upload-area {
    border: 2px dashed #3498db;
    border-radius: 12px;
    padding: 40px 20px;
    text-align: center;
    margin-bottom: 25px;
    transition: all 0.3s;
    background: #f8f9fa;
}

.upload-area:hover {
    background: #e8f4fc;
    border-color: #2980b9;
}

.upload-area.highlight {
    background: #d6eaf8;
    border-color: #2980b9;
}

.upload-icon {
    font-size: 50px;
    color: #3498db;
    margin-bottom: 15px;
}

.upload-text {
    margin-bottom: 20px;
}

.upload-text h3 {
    color: #2c3e50;
    margin-bottom: 8px;
}

.upload-text p {
    color: #7f8c8d;
    font-size: 14px;
}

.file-input {
    display: none;
}

.browse-btn {
    display: inline-block;
    background: #3498db;
    color: white;
    padding: 12px 25px;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 500;
    transition: all 0.3s;
    border: none;
    outline: none;
}

.browse-btn:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
}

.selected-file {
    margin-top: 15px;
    font-size: 14px;
    color: #7f8c8d;
}

.selected-file span {
    font-weight: 500;
    color: #2c3e50;
}

.convert-btn {
    display: block;
    width: 100%;
    background: linear-gradient(90deg, #2ecc71, #1abc9c);
    color: white;
    padding: 16px;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;
    border: none;
    outline: none;
    transition: all 0.3s;
    margin-top: 20px;
    box-shadow: 0 5px 15px rgba(46, 204, 113, 0.3);
}

.convert-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(46, 204, 113, 0.4);
}

.convert-btn:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.preview-area {
    margin-top: 40px;
    text-align: center;
    padding: 25px;
    border-radius: 12px;
    background: #f8f9fa;
    border: 1px solid #e0e0e0;
    transition: all 0.3s;
}

.preview-area.visible {
    animation: fadeIn 0.5s ease;
}

.preview-area h2 {
    color: #2c3e50;
    margin-bottom: 20px;
    font-weight: 600;
}

.preview-image {
    margin: 0 auto;
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    border: 1px solid #e0e0e0;
}

.download-btn {
    margin-top: 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #3498db;
    color: white;
    padding: 12px 25px;
    border-radius: 50px;
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.3s;
    border: none;
    outline: none;
}

.download-btn:hover {
    background: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.4);
    color: #fff;
}

.download-btn i {
    margin-right: 8px;
}

.file-info {
    display: flex;
    justify-content: space-between;
    margin-top: 25px;
    color: #7f8c8d;
    font-size: 14px;
}

.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid rgba(52, 152, 219, 0.2);
    border-radius: 50%;
    border-top-color: #3498db;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.toast {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #27ae60;
    color: white;
    padding: 12px 25px;
    border-radius: 50px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    animation: toastIn 0.3s ease, toastOut 0.3s ease 2.7s;
    z-index: 1000;
}

@keyframes toastIn {
    from {
        opacity: 0;
        transform: translate(-50%, 20px);
    }

    to {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}

@keyframes toastOut {
    from {
        opacity: 1;
        transform: translate(-50%, 0);
    }

    to {
        opacity: 0;
        transform: translate(-50%, 20px);
    }
}

@media (max-width: 600px) {
    .app-content {
        padding: 20px;
    }

    header {
        padding: 20px;
    }

    header h1 {
        font-size: 24px;
    }

    .upload-area {
        padding: 30px 15px;
    }
}
</style>
