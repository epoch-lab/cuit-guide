<template>
    <h1>照片 4:3 压缩转换</h1>
    <p>在处理照片之前，请确保人物居中、背景为白色</p>
    <p>提示：成都信息工程大学人脸系统对于照片的要求是 50kb~400kb，JPG 格式</p>
    <p>修改背景请前往：<a href="https://remove.bg" target="_blank">Remove.bg</a></p>

    <!-- 上传表单 -->
    <form @submit.prevent="handleSubmit">
        <input type="file" ref="fileInput" accept="image/*" required />
        <button type="submit">上传文件并转换</button>
    </form>

    <!-- 结果预览 -->
    <div v-if="previewUrl" style="margin-top:20px;">
        <h2>预览</h2>
        <img :src="previewUrl" style="width:200px; border:1px solid #ccc;" />
        <div style="margin-top:10px;">
            <a :href="previewUrl" download="converted.jpg">下载转换后的图片</a>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const fileInput = ref<HTMLInputElement | null>(null);
const previewUrl = ref<string>("");

// 处理图像
async function processImage(file: File): Promise<Blob> {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    await img.decode();

    const targetW = 600, targetH = 800, targetRatio = 3 / 4;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
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
    resized.getContext("2d")!.drawImage(canvas, 0, 0, targetW, targetH);

    // 二分压缩
    const minKB = 50, maxKB = 400;
    let qMin = 0.1, qMax = 0.95;
    let bestBlob: Blob | null = null;

    while (qMin <= qMax) {
        const qMid = (qMin + qMax) / 2;
        const blob: Blob = await new Promise((res) =>
            resized.toBlob((b) => res(b as Blob), "image/jpeg", qMid)
        );
        const sizeKB = blob.size / 1024;

        if (sizeKB >= minKB && sizeKB <= maxKB) {
            bestBlob = blob;
            break;
        }
        if (sizeKB > maxKB) {
            qMax = qMid - 0.01;
        } else {
            bestBlob = blob;
            qMin = qMid + 0.01;
        }
    }

    return bestBlob!;
}

// 提交表单
async function handleSubmit() {
    const file = fileInput.value?.files?.[0];
    if (!file) return;

    alert("正在处理，请稍候…");
    const blob = await processImage(file);
    previewUrl.value = URL.createObjectURL(blob);
    alert(`转换完成，大小约 ${(blob.size / 1024).toFixed(1)} KB`);
}
</script>
