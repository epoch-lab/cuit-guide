<script setup lang="ts">
import {computed, nextTick, ref} from "vue";
import {useData} from "vitepress";
import {toPng} from "html-to-image";
import QRCode from "qrcode";

const {frontmatter, page, site} = useData();

const showDialog = ref(false);
const showQrCode = ref(true);
const copied = ref(false);
const generating = ref(false);

const posterRef = ref<HTMLElement | null>(null);
const qrCodeUrl = ref("");
const previewUrl = ref("");

const title = computed(() => {
  return frontmatter.value.title || page.value.title || site.value.title;
});

const rawUrl = ref("");
const displayUrl = ref("");

function refreshUrl() {
  if (typeof window === "undefined") {
    rawUrl.value = "";
    displayUrl.value = "";
    return;
  }

  rawUrl.value = window.location.href;
  displayUrl.value = decodeURI(window.location.href);
}


const shareText = computed(() => {
  return `我在 ${site.value.title} 中看到了『${title.value} 』感觉很不错，你也来看看吧～\n点击链接即可查看这篇文章：${displayUrl.value}`;
});

async function openDialog() {
  refreshUrl();
  showDialog.value = true;
  previewUrl.value = "";
  qrCodeUrl.value = "";
  await nextTick();
  await generatePoster();
}

function closeDialog() {
  showDialog.value = false;
}

async function generateQrCode() {
  if (!showQrCode.value) {
    qrCodeUrl.value = "";
    return;
  }

  qrCodeUrl.value = await QRCode.toDataURL(rawUrl.value, {
    width: 180,
    margin: 1,
  });
}

async function generatePoster() {
  if (!posterRef.value || generating.value) {
    return;
  }

  generating.value = true;

  try {
    await fillPosterContent();

    await generateQrCode();
    await nextTick();
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    previewUrl.value = await toPng(posterRef.value, {
      pixelRatio: 1,
      backgroundColor: "#ffffff",
      cacheBust: true,
      imagePlaceholder: "",
      skipFonts: true,
    });
  } catch (e) {
    console.error("生成分享图失败", e);
  } finally {
    generating.value = false;
  }
}

async function setQrCodeVisible(value: boolean) {
  if (showQrCode.value === value) {
    return;
  }

  showQrCode.value = value;
  await generatePoster();
}

async function copyShareText() {
  await navigator.clipboard.writeText(shareText.value);
  copied.value = true;

  window.setTimeout(() => {
    copied.value = false;
  }, 1200);
}

function downloadPoster() {
  if (!previewUrl.value) {
    return;
  }

  const link = document.createElement("a");
  link.href = previewUrl.value;
  link.download = `${title.value}-分享图.png`;
  link.click();
}


const posterContentRef = ref<HTMLElement | null>(null);

async function imageToDataUrl(src: string) {
  const resp = await fetch(src, {
    mode: "cors",
    cache: "force-cache",
  });

  if (!resp.ok) {
    throw new Error(`图片请求失败：${resp.status}`);
  }

  const blob = await resp.blob();

  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(String(reader.result));
    };

    reader.onerror = () => {
      reject(reader.error);
    };

    reader.readAsDataURL(blob);
  });
}

async function prepareImages(clonedDoc: HTMLElement) {
  const originalImgs = Array.from(document.querySelectorAll(".vp-doc img")) as HTMLImageElement[];
  const clonedImgs = Array.from(clonedDoc.querySelectorAll("img")) as HTMLImageElement[];

  await Promise.all(
    clonedImgs.map(async (img, index) => {
      const originalImg = originalImgs[index];

      const rect = originalImg?.getBoundingClientRect();
      const width = Math.round(rect?.width || originalImg?.naturalWidth || img.naturalWidth || 800);
      const height = Math.round(rect?.height || originalImg?.naturalHeight || img.naturalHeight || 450);

      img.removeAttribute("width");
      img.removeAttribute("height");

      img.style.width = "100%";
      img.style.height = "auto";
      img.style.maxHeight = "none";
      img.style.objectFit = "contain";
      img.style.background = "#f3f4f6";

      try {
        img.src = await imageToDataUrl(img.src);
      } catch (e) {
        console.warn("图片转 base64 失败，使用占位图：", img.src, e);
        img.src = createErrorImage(width, height);
        img.style.aspectRatio = `${width} / ${height}`;
      }
    })
  );
}

function createErrorImage(width = 800, height = 450) {
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="#f3f4f6"/>
  <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="#d1d5db" stroke-width="2"/>
  <text x="50%" y="48%" text-anchor="middle" fill="#6b7280" font-size="28" font-family="Arial, sans-serif">
    可能是跨域导致图片加载失败
  </text>
  <text x="50%" y="58%" text-anchor="middle" fill="#9ca3af" font-size="18" font-family="Arial, sans-serif">
    请访问原文查看
  </text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

async function fillPosterContent() {
  const doc = document.querySelector(".vp-doc") as HTMLElement | null;

  if (!doc || !posterContentRef.value) {
    return;
  }
  const clonedDoc = doc.cloneNode(true) as HTMLElement;
  clonedDoc.querySelectorAll(
    ".share-entry-button, .header-anchor, script, style"
  ).forEach((el) => el.remove());

  if (lastUpdated.value) {
    const updateNode = document.createElement("div");
    updateNode.className = "poster-article-update";
    updateNode.textContent = lastUpdated.value;
    Object.assign(updateNode.style, {
      margin: "16px 0 18px",
      color: "#6b7280",
      fontSize: "14px",
      fontWeight: "400",
      lineHeight: "1.5",
    });
    const h1 = clonedDoc.querySelector("h1");
    if (h1) {
      h1.insertAdjacentElement("afterend", updateNode);
    } else {
      clonedDoc.prepend(updateNode);
    }
  }

  posterContentRef.value.innerHTML = "";
  await prepareImages(clonedDoc);
  posterContentRef.value.appendChild(clonedDoc);
}

const lastUpdated = computed(() => {
  if (!page.value.lastUpdated) {
    return "";
  }
  const date = new Date(page.value.lastUpdated);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `更新于：${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
});
</script>

<template>
  <button class="share-entry-button" type="button" @click="openDialog">
    觉得不错？点我生成分享图
  </button>

  <Teleport to="body">
    <div v-if="showDialog" class="share-mask" @click.self="closeDialog">
      <div class="share-dialog">
        <div class="share-header">
          <div class="share-title">
            分享文章
          </div>

          <button class="share-close" type="button" @click="closeDialog">
            ×
          </button>
        </div>

        <div class="share-body">
          <div class="share-preview-panel">
            <div class="preview-card-wrap">
              <div v-if="generating" class="preview-placeholder">
                生成中...
              </div>

              <img
                v-else-if="previewUrl"
                class="preview-img"
                :src="previewUrl"
                alt="分享图预览"
              >

              <div v-else class="preview-placeholder">
                暂无预览
              </div>

            </div>
          </div>

          <div class="share-control-panel">
            <div class="share-text">
              {{ shareText }}
            </div>

            <button class="outline-button" type="button" @click="copyShareText">
              {{ copied ? "已复制" : "复制分享文字" }}
            </button>

            <div class="setting-title">
              分享图设置
            </div>

            <div class="share-tip">
              部分平台可能无法发送带二维码的图片，如果发送失败，可以尝试不带二维码的分享图。
            </div>

            <div class="qr-buttons">
              <button
                class="qr-button"
                :class="{ active: showQrCode }"
                type="button"
                :disabled="generating"
                @click="setQrCodeVisible(true)"
              >
                要二维码
              </button>

              <button
                class="qr-button"
                :class="{ active: !showQrCode }"
                type="button"
                :disabled="generating"
                @click="setQrCodeVisible(false)"
              >
                不要二维码
              </button>
            </div>

            <button
              class="download-button"
              type="button"
              :disabled="generating || !previewUrl"
              @click="downloadPoster"
            >
              下载分享图片
            </button>
          </div>
        </div>

      </div>
    </div>
  </Teleport>

  <div class="poster-hidden">
    <div ref="posterRef" class="poster-card">
      <div class="poster-main">
        <div class="poster-header">
          <span class="brand-name">CUIT 指南</span>
          <span class="brand-url">https://guide.cuit.dev/</span>
        </div>
        <div class="brand-desc">
          一个关于成都信息工程大学一切的网站
        </div>

        <div class="poster-main">
          <div ref="posterContentRef" class="poster-doc"></div>
        </div>
      </div>

      <div class="poster-footer">
        <div class="poster-footer-left">
          <template v-if="showQrCode">
            <img class="poster-qr" :src="qrCodeUrl" alt="二维码">
          </template>

          <template v-else>
            <div class="poster-url">
              {{ displayUrl }}
            </div>
          </template>
        </div>

        <div class="brand-name">
          CUIT 指南
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.share-entry-button {
  display: block;
  margin: 0 0 10px auto;
  padding: 5px 14px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-brand-1);
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: all .2s ease;
}

.share-entry-button:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.share-mask {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.55);
}

.share-dialog {
  width: 960px;
  max-width: calc(100vw - 48px);
  height: calc(100vh - 96px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 16px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
}

@media (max-width: 768px) {
  .share-dialog {
    height: auto;
    max-height: none;
  }

  .share-body {
    flex: none;
  }
}

.share-header {
  height: 60px;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--vp-c-divider);
}

.share-title {
  font-size: 16px;
  font-weight: 700;
}

.share-close {
  border: 0;
  background: transparent;
  color: var(--vp-c-text-2);
  font-size: 20px;
  cursor: pointer;
}

.share-body {
  flex: 1;
  min-height: 0;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  overflow: hidden;
}

.share-preview-panel {
  min-width: 0;
  min-height: 0;
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-right: 1px solid var(--vp-c-divider);
  overflow: auto;
}

.preview-card-wrap {
  width: 420px;
  max-width: 100%;
}

.preview-img {
  width: 100%;
  display: block;
  border: 2px solid var(--vp-c-brand-1);
  background: #fff;
}

.preview-placeholder {
  width: 100%;
  height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--vp-c-brand-1);
  color: var(--vp-c-text-2);
  background: #fff;
}

.share-control-panel {
  min-width: 0;
  padding: 36px 32px;
  overflow: auto;
}

.share-text {
  white-space: pre-line;
  overflow-wrap: anywhere;
  word-break: normal;
}

.outline-button {
  width: 100%;
  margin-top: 12px;
  padding: 6px;
  border: 1px solid var(--vp-c-brand-1);
  border-radius: 8px;
  background: transparent;
  color: var(--vp-c-brand-1);
  cursor: pointer;
}

.setting-title {
  margin-top: 22px;
  font-weight: 700;
}

.qr-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-top: 16px;
}

.qr-button {
  padding: 6px;
  border: 0;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  cursor: pointer;
}

.qr-button.active {
  background: var(--vp-c-brand-1);
  color: #fff;
}

.share-tip {
  margin-top: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 13px;
  line-height: 1.5;
}

.download-button {
  width: 100%;
  margin-top: 12px;
  padding: 6px;
  border: 0;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: #fff;
  cursor: pointer;
}

.download-button:disabled,
.qr-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.poster-hidden {
  position: fixed;
  left: -99999px;
  top: 0;
  z-index: -1;
}

.poster-card {
  width: 520px;
  min-height: 840px;
  padding: 46px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  background: #fff;
  color: #111;
  font-family: "Microsoft YaHei", "Segoe UI", Arial, sans-serif;
}

.poster-main {
  flex: 1;
}

.poster-doc {
  margin-top: 20px;
  margin-bottom: 20px;
  color: #111;
}

.poster-footer {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
}

.poster-footer-left {
  min-width: 0;
  display: flex;
  align-items: flex-end;
}

.poster-footer .brand-name {
  width: 180px;
  align-self: end;
  text-align: right;
  margin-bottom: 2px; /* 1~3px 自己微调 */
}

.poster-url {
  align-self: flex-end;
  margin-top: auto;
}

.poster-qr {
  width: 92px;
  height: 92px;
}

.brand-name {
  color: var(--vp-c-brand-1);
  font-size: 26px;
  font-weight: 800;
  line-height: 1;
}

.brand-url {
  color: var(--vp-c-brand-1);
  margin-left: 16px;
  font-size: 22px;
  font-weight: 500;
  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;
}

.brand-desc {
  color: var(--vp-c-brand-1);
  margin-top: 12px;
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
  font-family: "Microsoft YaHei", "Segoe UI", Arial, sans-serif;
}

@media (max-width: 768px) {
  .share-mask {
    align-items: flex-start;
    padding: 12px;
    overflow: auto;
  }

  .share-dialog {
    width: 100%;
    max-width: 100%;
    max-height: none;
  }

  .share-header {
    height: 56px;
    padding: 0 16px;
  }

  .share-title {
    font-size: 18px;
  }

  .share-body {
    display: flex;
    flex-direction: column;
    overflow: visible;
  }

  .share-control-panel {
    order: 1;
  }

  .share-preview-panel {
    order: 2;
  }

  .share-preview-panel {
    padding: 20px;
    border-right: 0;
    border-bottom: 1px solid var(--vp-c-divider);
    overflow: auto;
  }

  .preview-card-wrap {
    width: min(360px, 100%);
  }

  .share-control-panel {
    padding: 22px 20px;
    overflow: visible;
  }

  .share-text {
    font-size: 16px;
  }

  .outline-button,
  .download-button {
    font-size: 16px;
  }

  .qr-button {
    font-size: 15px;
  }
}
</style>