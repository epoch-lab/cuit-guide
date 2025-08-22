<template>
    <h2 id="main-title">CUIT 校友友链</h2>
    <span
        style="display: flex;justify-content: center;font-size: 1rem; color: #666; margin-top: 40px; font-weight: 600; margin-left: 20px; margin-right: 20px;">
        如需加入，请自行提交pr/联系Epoch开发实验室~
        <span style="
        font-size: 1rem;
        color: #2563eb;
        cursor: pointer;
      " @click='
        copyToClipboard(
            {
                "name": "例子",
                "graduationYear": 2020,
                "major": "待填(专业名称如软件工程, 计算机科学与技术)",
                "technicalDirection": ["方向1", "方向2"],
                "link": "youngestar.top/ (你的友链或者 github 主页等等)",
                "avatar": "https://...(图片链接)(建议挂图床上, 推荐图床如 https://postimages.org/)",
                "description": "待填(你的描述, 建议简短一点点)"
            }
        )'>
            (点击获取样例)
        </span>
    </span>
    <LoadingComponent v-model="isLoading" @retry="loadFriends" @cancel="isLoading = false"></LoadingComponent>
    <div id="friends-list" v-if="!isLoading">
        <!-- 选择器部分 -->
        <div id="selector-container">
            <SelectedUi v-show="isSelectorShow" v-model="selectedYear" :options="graduationYears"
                placeholder="选择毕业年份" />
            <SelectedUi v-show="isSelectorShow" v-model="selectedMajor" :options="majors" placeholder="选择专业" />
            <SelectedUi v-show="isSelectorShow" v-model="selectedTechnicalDirection" :options="technicalDirections"
                placeholder="选择技术方向" />
            <div id="selector-btn" @click="toggleSelector" :class="{ 'active': isSelectorShow }" aria-label="筛选控制按钮">
                <svg class="selector-icon" viewBox="0 0 1024 1024">
                    <path :d="isSelectorShow ? closePath : filterPath" fill="currentColor" />
                </svg>
            </div>
        </div>

        <!-- 筛选逻辑部分 -->
        <template v-for="time in graduationYears" :key="time.value">
            <TimeLine :colors="['#ff6b6b', '#4ecdc4']" size="large" class="time-line"
                v-if="filteredFriends.filter(friend => friend.graduationYear === time.value).length > 0">
                {{ time.value }}
            </TimeLine>
            <div id="blog-container"
                v-if="filteredFriends.filter(friend => friend.graduationYear === time.value).length > 0">
                <FriendCard v-for="friend in filteredFriends.filter(friend => friend.graduationYear === time.value)"
                    :friend="friend" :key="friend.name" />
            </div>
        </template>

        <EmptyState v-if="filteredFriends.length === 0" title="没有找到符合条件的校友" description="请尝试调整筛选条件">
        </EmptyState>
    </div>

    <!-- 自定义Toast提示 -->
    <Transition name="toast">
        <div v-if="showToast" class="toast">
            <div class="toast-content">
                <svg class="toast-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
                <span>{{ toastMessage }}</span>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
import LoadingComponent from "./ui/LoadingComponent.vue";
import EmptyState from "./ui/EmptyState.vue";
import SelectedUi from "./ui/SelectedUi.vue";
import TimeLine from "./ui/TimeLine.vue";
import FriendCard from "./Card/FriendCard.vue";
import { ref, onMounted, type Ref, watch } from "vue"

interface Friend {
    name: string,
    graduationYear: number,
    major: string,
    technicalDirection: string[],
    link: string,
    avatar: string,
    description: string,
}

interface yearOption {
    value: number,
    label: string
}

interface majorOption {
    value: string,
    label: string
}

interface technicalDirectionOption {
    value: string,
    label: string
}

// 加载中状态
const isLoading = ref(true);

// 图标路径
const filterPath = "M608.24 960c-17.72 0-32-14.28-32-32V448.1c0-7.91 2.92-15.65 8.26-21.5l208.82-234.46L230.5 192.14 439.67 426.77c5.16 5.85 8.08 13.42 8.08 21.33v288.81l50.92 41.11c13.76 11.18 15.82 31.31 4.82 45.07-11.01 13.76-31.31 15.82-45.07 4.82l-51.76-42.05V460.14L135.2 181.3c-8.43-9.46-10.49-22.88-5.33-34.4 5.16-11.53 16.69-18.92 29.24-18.92h706.29c12.73 0 24.08 7.4 29.24 19.1 5.16 11.52 2.92 25.11-5.5 34.4L640.24 460.31v467.7c0 17.72-14.28 32-32 32z"
const closePath = "M810.7 273.9l-60.5-60.5L512 451.5 273.9 213.4l-60.5 60.5L451.5 512 213.4 750.1l60.5 60.5L512 572.5l238.1 238.1 60.5-60.5L572.5 512z"

// 选择器显示控制
const isSelectorShow = ref(false)

// 被筛选数据
const selectedYear = ref('')
const selectedMajor = ref('')
const selectedTechnicalDirection = ref('')

// 选项数组
const graduationYears = ref<yearOption[]>([])
const majors = ref<majorOption[]>([])
const technicalDirections = ref<technicalDirectionOption[]>([])

// 筛选条件列表
const friends: Ref<Friend[]> = ref([])
const filteredFriends: Ref<Friend[]> = ref([])

// 选择器显示控制函数
const toggleSelector = () => {
    isSelectorShow.value = !isSelectorShow.value
}

// Toast提示状态
const showToast = ref(false);
const toastMessage = ref("");

// 显示Toast提示
function showToastMessage(message, duration = 2000) {
    toastMessage.value = message;
    showToast.value = true;

    setTimeout(() => {
        showToast.value = false;
    }, duration);
}

// 复制到剪贴板功能
function copyToClipboard(text) {
    navigator.clipboard
        .writeText(JSON.stringify(text))
        .then(() => {
            showToastMessage("已复制到剪贴板");
        })
        .catch((err) => {
            console.error("复制失败", err);
            showToastMessage("复制失败，请重试", 3000);
        });
}

// 初始加载
const loadFriends = async () => {
    try {
        const friendModules = import.meta.glob('@data/friends/*.json');
        const friendData: Friend[] = [];
        for (const path in friendModules) {
            const module = await friendModules[path]();
            // 去除例子(AAAExample)
            if (module.default.name === "例子") {
                continue;
            }
            // 添加入数组
            if (module.default) {
                friendData.push(module.default);
            }
        }
        // 这里进行排序处理 (排序法: 先按姓名字母排序, 再按毕业年份倒序)
        friends.value = friendData.sort((a, b) => a.name.localeCompare(b.name)).sort((a, b) => b.graduationYear - a.graduationYear);
        // 方向数组字母排序
        for (let friend of friends.value) {
            friend.technicalDirection.sort((a, b) => a.localeCompare(b))
        }
        filteredFriends.value = friends.value;
    } catch (error) {
        console.error("加载资源失败", error);
    } finally {
        isLoading.value = false;
    }
}

// 选择器内数据获取
const getSelectorsData = () => {
    let count = 0;
    const findNewGraduationYears = (friend: Friend) => {
        if (friend.graduationYear && !graduationYears.value.find((item) => { return item.value === friend.graduationYear })) {
            graduationYears.value.push({ value: friend.graduationYear, label: `毕业于 ${friend.graduationYear} 年` });
        }
    }
    const findNewMajors = (friend: Friend) => {
        if (friend.major && !majors.value.find((item) => { return item.value === friend.major })) {
            majors.value.push({ value: friend.major, label: `${friend.major} 专业` });
        }
    }
    const findNewTechnicalDirections = (friend: Friend) => {
        // 方向数组处理
        for (const tag of friend.technicalDirection) {
            if (tag && !technicalDirections.value.find((item) => { return item.value === tag })) {
                technicalDirections.value.push({ value: tag, label: `${tag} 方向` });
            }
        }
    }
    for (count; count < friends.value.length; count++) {
        findNewGraduationYears(friends.value[count]);
        findNewMajors(friends.value[count]);
        findNewTechnicalDirections(friends.value[count]);
    }
    // 按年份逆序排序
    graduationYears.value.sort((a, b) => b.value - a.value);
    // 按字母顺序排序
    majors.value.sort((a, b) => a.label.localeCompare(b.label));
    technicalDirections.value.sort((a, b) => a.label.localeCompare(b.label));
}

// 监测选择器变化
watch([selectedYear, selectedMajor, selectedTechnicalDirection], () => {
    // 过滤数据函数
    const filterFriends = (friend: Friend) => {
        if (selectedYear.value && friend.graduationYear !== parseInt(selectedYear.value)) {
            return false;
        }
        if (selectedMajor.value && friend.major !== selectedMajor.value) {
            return false;
        }
        // 方向数组处理
        if (selectedTechnicalDirection.value) {
            if (!friend.technicalDirection.includes(selectedTechnicalDirection.value)) {
                return false;
            }
        }
        return true;
    }
    // 过滤数据
    const newFilteredFriends = friends.value.filter(filterFriends);
    filteredFriends.value = newFilteredFriends;
})

onMounted(async () => {
    await loadFriends();
    getSelectorsData();
})
</script>

<style scoped>
#main-title {
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 50px;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-size: 32px;
    font-weight: 600;
    color: var(--vp-c-text-1);
}

.time-line {
    margin: 50px 0;
}

#selector-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    margin: 40px 0;

    #selector-btn {
        --btn-size: 42px;
        --icon-size: 22px;
        --btn-bg: var(--vp-c-bg-soft);
        --btn-border: var(--vp-c-divider);
        --btn-color: var(--vp-c-text-1);

        display: flex;
        justify-content: center;
        align-items: center;
        width: var(--btn-size);
        height: var(--btn-size);
        cursor: pointer;
        border-radius: 50%;
        background: var(--btn-bg);
        border: 1px solid var(--btn-border);
        color: var(--btn-color);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: var(--vp-shadow-1);
        position: relative;
        overflow: hidden;
    }

    #selector-btn:hover {
        background: var(--vp-c-bg-soft-mute);
        box-shadow: var(--vp-shadow-2);
        transform: translateY(-2px);
    }

    #selector-btn.active {
        background: var(--vp-c-brand-soft);
        color: var(--vp-c-brand);
    }

    .selector-icon {
        width: var(--icon-size);
        height: var(--icon-size);
        transition: transform 0.3s ease;
    }

    #selector-btn.active .selector-icon {
        transform: rotate(180deg);
    }

    html[data-theme="dark"] #selector-btn {
        --btn-bg: var(--vp-c-bg-soft-up);
        --btn-border: var(--vp-c-divider-dark);
    }

    @media (max-width: 640px) {
        #selector-btn {
            --btn-size: 38px;
            --icon-size: 20px;
        }
    }

    #selector-btn::after {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: rgba(var(--vp-c-brand-rgb), 0.1);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        transition: width 0.3s, height 0.3s;
    }

    #selector-btn:active::after {
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: width 0.3s, height 0.3s, opacity 0.3s;
    }
}

#blog-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
    gap: 20px;
    width: 95%;
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 20px;
}


/* Toast提示样式 */
.toast {
    position: fixed;
    bottom: 30px;
    left: 50%;
    transform: translateX(-50%);
    background: var(--vp-c-bg-soft);
    color: var(--vp-c-text-1);
    border-radius: 8px;
    padding: 0;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    min-width: 200px;
    max-width: 90%;
    border: 1px solid var(--vp-c-divider);
}

.dark .toast {
    background: var(--vp-c-bg-soft);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.toast-content {
    display: flex;
    align-items: center;
    padding: 12px 16px;
}

.toast-icon {
    width: 20px;
    height: 20px;
    fill: var(--vp-c-brand);
    margin-right: 10px;
    flex-shrink: 0;
}

/* Toast 动画 */
.toast-enter-active,
.toast-leave-active {
    transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translate(-50%, 20px);
}

@media (max-width:1080px) {
    #blog-container {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    }
}
</style>
