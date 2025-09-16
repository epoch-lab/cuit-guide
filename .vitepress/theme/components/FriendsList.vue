<template>
    <h2 id="main-title">CUIT 校友友链</h2>
    <div id="friends-list">
        <!-- 选择器部分 -->
        <div id="selector-container">
            <div class="selector-row">
                <SelectedUi v-show="isSelectorShow" v-model="selectedYear" :options="enrollmentYears"
                    placeholder="选择毕业年份" />
                <SelectedUi v-show="isSelectorShow" v-model="selectedMajor" :options="majors" placeholder="选择专业" />
                <SelectedUi v-show="isSelectorShow" v-model="selectedTechnicalDirection" :options="technicalDirections"
                    placeholder="选择技术方向" />
                <div id="sort-btn" @click="toggleSort" :class="{ 'active': sortOrder !== 'default' }" 
                     :aria-label="`按时间排序: ${sortOrder === 'asc' ? '升序' : sortOrder === 'desc' ? '降序' : '默认'}`">
                    <svg class="sort-icon" viewBox="0 0 1024 1024">
                        <path :d="getSortIcon()" fill="currentColor" />
                    </svg>
                </div>
                <div id="selector-btn" @click="toggleSelector" :class="{ 'active': isSelectorShow }" aria-label="筛选控制按钮">
                    <svg class="selector-icon" viewBox="0 0 1024 1024">
                        <path :d="isSelectorShow ? closePath : filterPath" fill="currentColor" />
                    </svg>
                </div>
            </div>
        </div>

        <!-- 骨架屏和友链卡片容器，异步加载，先加载的先显示 -->
        <div id="blog-container">
            <template v-if="isLoading">
                <SkeletonCard v-for="n in skeletonCount" :key="n" />
            </template>
            <template v-else>
                <FriendCard 
                    v-for="friend in filteredFriends" 
                    :friend="friend" 
                    :key="friend.name"
                    :is-template="friend.name === '你的姓名'"
                    @template-click="copyTemplateToClipboard"
                    @layout-change="handleLayoutChange"
                />
            </template>
        </div>

        <!-- 空状态 -->
        <EmptyState v-if="!isLoading && filteredFriends.length === 0" title="没有找到符合条件的校友" description="请尝试调整筛选条件">
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
import EmptyState from "./ui/EmptyState.vue";
import SelectedUi from "./ui/SelectedUi.vue";
import FriendCard from "./Card/FriendCard.vue";
import SkeletonCard from "./ui/SkeletonCard.vue";
import { nextTick } from 'vue';
import { ref, onMounted, onUnmounted, type Ref, watch } from "vue"

interface Friend {
    name: string,
    enrollmentYear: number,
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
// 骨架屏数量
const skeletonCount = ref(12);

// 图标路径
const filterPath = "M608.24 960c-17.72 0-32-14.28-32-32V448.1c0-7.91 2.92-15.65 8.26-21.5l208.82-234.46L230.5 192.14 439.67 426.77c5.16 5.85 8.08 13.42 8.08 21.33v288.81l50.92 41.11c13.76 11.18 15.82 31.31 4.82 45.07-11.01 13.76-31.31 15.82-45.07 4.82l-51.76-42.05V460.14L135.2 181.3c-8.43-9.46-10.49-22.88-5.33-34.4 5.16-11.53 16.69-18.92 29.24-18.92h706.29c12.73 0 24.08 7.4 29.24 19.1 5.16 11.52 2.92 25.11-5.5 34.4L640.24 460.31v467.7c0 17.72-14.28 32-32 32z"
const closePath = "M810.7 273.9l-60.5-60.5L512 451.5 273.9 213.4l-60.5 60.5L451.5 512 213.4 750.1l60.5 60.5L512 572.5l238.1 238.1 60.5-60.5L572.5 512z"
const sortDefaultPath = "M826.538667 190.122667a36.693333 36.693333 0 0 1 0 73.216H138.922667a36.693333 36.693333 0 0 1 0-73.216z m-409.6 268.288a36.522667 36.522667 0 0 1 0 73.045333H138.922667a36.522667 36.522667 0 0 1 0-73.045333zM709.461333 512a21.845333 21.845333 0 0 0-21.674666 18.944v105.472a21.845333 21.845333 0 0 0 18.944 21.674667h105.301333a22.016 22.016 0 0 0 2.901333-43.690667h-83.456v-80.384A22.016 22.016 0 0 0 709.461333 512zM329.216 726.528a36.693333 36.693333 0 0 1 0 73.216H138.922667a36.693333 36.693333 0 0 1 0-73.216zM716.8 424.277333a204.8 204.8 0 1 1-204.8 204.8 203.264 203.264 0 0 1 204.8-204.8z"
const sortAscPath = "M128.770294 638.139885l258.153548 0 0-61.71969L128.770294 576.420195 128.770294 638.139885zM127.746988 446.843024l193.252399 0 0-61.718667L127.746988 385.124358 127.746988 446.843024zM127.746988 254.527974l128.34818 0 0-61.718667L127.746988 192.809307 127.746988 254.527974zM514.248715 829.943282l0-61.718667L127.746988 768.224616l0 61.718667L514.248715 829.943282 514.248715 829.943282zM702.678272 424.330288l183.824679 0L702.678272 195.107653l0-1.27504L577.398987 193.832613l0 1.27504L393.575332 424.330288l183.823656 0 0 407.147954 125.279285 0L702.678272 424.330288 702.678272 424.330288z"
const sortDescPath = "M127.577119 446.162526l258.153548 0 0-61.718667L127.577119 384.443859 127.577119 446.162526zM126.553813 637.458363l193.251376 0 0-61.718667-193.251376 0L126.553813 637.458363zM126.553813 829.773414l128.347157 0L254.900969 768.05577 126.553813 768.05577 126.553813 829.773414zM513.05554 192.638415 126.553813 192.638415l0 61.718667 386.501728 0L513.05554 192.638415zM701.485097 598.252433 701.485097 191.103456 576.205812 191.103456l0 407.148977L392.382157 598.252433l183.823656 229.221612 0 1.276063 125.279285 0 0-1.276063 183.823656-229.221612L701.485097 598.252433z"

// 选择器显示控制
const isSelectorShow = ref(false)

// 排序状态：'default'(随机), 'asc'(升序), 'desc'(降序)
const sortOrder = ref('default')

// 被筛选数据
const selectedYear = ref('')
const selectedMajor = ref('')
const selectedTechnicalDirection = ref('')

// 选项数组
const enrollmentYears = ref<yearOption[]>([])
const majors = ref<majorOption[]>([])
const technicalDirections = ref<technicalDirectionOption[]>([])

// 筛选条件列表
const friends: Ref<Friend[]> = ref([])
const filteredFriends: Ref<Friend[]> = ref([])

// 选择器显示控制函数
const toggleSelector = () => {
    isSelectorShow.value = !isSelectorShow.value
}

// 切换排序方式
const toggleSort = () => {
    if (sortOrder.value === 'default') {
        sortOrder.value = 'asc'
    } else if (sortOrder.value === 'asc') {
        sortOrder.value = 'desc'
    } else {
        sortOrder.value = 'default'
    }
    applySorting()
}

// 应用排序
const applySorting = (friendsToSort?: Friend[]) => {
    let sortedData = friendsToSort ? [...friendsToSort] : [...friends.value]
    
    // 分离模板数据
    const templateIndex = sortedData.findIndex(friend => friend.name === '你的姓名')
    let templateData: Friend | null = null
    if (templateIndex !== -1) {
        templateData = sortedData.splice(templateIndex, 1)[0]
    }
    
    // 排序非模板数据
    if (sortOrder.value === 'asc') {
        sortedData.sort((a, b) => a.enrollmentYear - b.enrollmentYear)
    } else if (sortOrder.value === 'desc') {
        sortedData.sort((a, b) => b.enrollmentYear - a.enrollmentYear)
    } else {
        // 随机排序
        sortedData.sort(() => Math.random() - 0.5)
    }
    
    // 重新添加模板数据到开头
    if (templateData) {
        sortedData.unshift(templateData)
    }
    
    if (friendsToSort) {
        filteredFriends.value = sortedData
    } else {
        friends.value = sortedData
        // 重新应用筛选
        applyFilteringOnly()
    }
}

// 应用筛选逻辑（不触发排序）
const applyFilteringOnly = () => {
    const filterFriends = (friend: Friend) => {
        if (selectedYear.value && friend.enrollmentYear !== parseInt(selectedYear.value)) {
            return false;
        }
        if (selectedMajor.value && friend.major !== selectedMajor.value) {
            return false;
        }
        if (selectedTechnicalDirection.value) {
            if (!friend.technicalDirection.includes(selectedTechnicalDirection.value)) {
                return false;
            }
        }
        return true;
    }
    filteredFriends.value = friends.value.filter(filterFriends);
}

// 应用筛选逻辑
const applyFiltering = () => {
    const filterFriends = (friend: Friend) => {
        if (selectedYear.value && friend.enrollmentYear !== parseInt(selectedYear.value)) {
            return false;
        }
        if (selectedMajor.value && friend.major !== selectedMajor.value) {
            return false;
        }
        if (selectedTechnicalDirection.value) {
            if (!friend.technicalDirection.includes(selectedTechnicalDirection.value)) {
                return false;
            }
        }
        return true;
    }
    const filtered = friends.value.filter(filterFriends);
    applySorting(filtered);
}

// 获取当前排序图标
const getSortIcon = () => {
    switch (sortOrder.value) {
        case 'asc': return sortAscPath
        case 'desc': return sortDescPath
        default: return sortDefaultPath
    }
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

// 复制模板到剪贴板
function copyTemplateToClipboard(templateData) {
    const template = {
        "name": "你的姓名",
        "enrollmentYear": 2024,
        "major": "你的专业",
        "technicalDirection": ["技术方向1", "技术方向2"],
        "link": "https://your-website.com",
        "avatar": "https://your-avatar-url.com/avatar.jpg",
        "description": "你的个人描述"
    };
    
    navigator.clipboard
        .writeText(JSON.stringify(template, null, 2))
        .then(() => {
            showToastMessage("模板已复制到剪贴板，请修改为你的信息！");
        })
        .catch((err) => {
            console.error("复制失败", err);
            showToastMessage("复制失败，请重试", 3000);
        });
}

// 异步加载友链，快速加载所有数据
const loadFriends = async () => {
    // 重置状态
    isLoading.value = true;
    friends.value = [];
    filteredFriends.value = [];
    
    try {
        // 加载友链数据
        const friendModules = import.meta.glob('../data/friends/*.json', { eager: true });
        // console.log('找到友链文件:', Object.keys(friendModules));
        
        // 过滤掉不相关的文件
        const friendFiles = Object.entries(friendModules).filter(([path]) => 
            path.includes('/friends/') && 
            path.endsWith('.json')
        );
        
        // console.log('过滤后的友链文件:', friendFiles.map(([path]) => path));
        
        const friendData: Friend[] = [];
        let templateData: Friend | null = null;
        
        // 骨架屏数量完全等于友链文件数量
        const totalCount = friendFiles.length;
        skeletonCount.value = Math.max(1, totalCount); // 至少显示1个骨架屏

        // 快速处理所有友链数据，不再有延时
        for (let i = 0; i < friendFiles.length; i++) {
            const [path, module] = friendFiles[i];
            try {
                const data = (module as { default: Friend }).default;
                // console.log('处理文件:', path, '数据:', data);
                
                // 检查是否为模板文件
                if (path.includes('template.json') || data?.name === '你的姓名') {
                    templateData = data;
                } else if (data && data.name && data.name !== "例子") {
                    // 添加有效数据
                    friendData.push(data);
                    friends.value.push(data);
                    
                    // 保持 technicalDirection 的原始填写顺序
                }
            } catch (err) {
                console.error(`Failed to process friend data from ${path}:`, err);
            }
        }
        // 确保模板数据在第一位（如果存在）
        if (templateData) {
            friends.value = [templateData, ...friends.value];
        }
        
        // 随机排序（除了模板数据）
        const template = friends.value.find(f => f.name === '你的姓名');
        const others = friends.value.filter(f => f.name !== '你的姓名');
        others.sort(() => Math.random() - 0.5);
        
        if (template) {
            friends.value = [template, ...others];
        } else {
            friends.value = others;
        }
        
        // 保持 technicalDirection 的原始填写顺序，不进行排序
        
        filteredFriends.value = friends.value;
        
        // console.log('加载完成，共加载了', friends.value.length, '个友链');
    } catch (error) {
        console.error("加载资源失败", error);
        
        // 如果加载失败，至少创建一个示例友链
        const fallbackFriend: Friend = {
            name: "加载失败",
            enrollmentYear: 2024,
            major: "未知专业",
            technicalDirection: ["暂无"],
            link: "#",
            avatar: "https://via.placeholder.com/60",
            description: "数据加载失败，这是一个备用示例。"
        };
        friends.value = [fallbackFriend];
        filteredFriends.value = [fallbackFriend];
    } finally {
        isLoading.value = false;
        skeletonCount.value = 0;
    }
}

// 选择器内数据获取
const getSelectorsData = () => {
    let count = 0;
    const findNewenrollmentYears = (friend: Friend) => {
        if (friend.enrollmentYear && !enrollmentYears.value.find((item) => { return item.value === friend.enrollmentYear })) {
            enrollmentYears.value.push({ value: friend.enrollmentYear, label: `${friend.enrollmentYear} 级` });
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
        findNewenrollmentYears(friends.value[count]);
        findNewMajors(friends.value[count]);
        findNewTechnicalDirections(friends.value[count]);
    }
    // 按年份逆序排序
    enrollmentYears.value.sort((a, b) => b.value - a.value);
    // 按字母顺序排序
    majors.value.sort((a, b) => a.label.localeCompare(b.label));
    technicalDirections.value.sort((a, b) => a.label.localeCompare(b.label));
}

// 处理卡片布局变化
const handleLayoutChange = () => {
    // 简化布局变化处理，标准网格布局无需重排
    console.log('卡片内容已更改');
}

// 布局变化的防抖定时器
let layoutChangeTimeout: NodeJS.Timeout | undefined;

// 监测选择器变化
watch([selectedYear, selectedMajor, selectedTechnicalDirection], () => {
    applyFiltering()
})

// 监听数据变化
watch([filteredFriends, isLoading], () => {
    // 标准网格布局无需特殊处理
})

onMounted(async () => {
    await loadFriends();
    getSelectorsData();
});

// 组件卸载时清理事件监听
onUnmounted(() => {
    if (layoutChangeTimeout) {
        clearTimeout(layoutChangeTimeout);
    }
});
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

@media (max-width: 768px) {
    #main-title {
        font-size: 28px;
        margin-top: 40px;
    }
}

@media (max-width: 480px) {
    #main-title {
        font-size: 24px;
        margin-top: 30px;
        gap: 8px;
    }
}

#selector-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
    margin: 40px 0;

    .selector-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    @media (max-width: 768px) {
        gap: 16px;
        margin: 30px 0;
        
        .selector-row {
            gap: 12px;
        }
    }

    @media (max-width: 480px) {
        gap: 12px;
        margin: 20px 0;
        
        .selector-row {
            gap: 8px;
            flex-direction: column;
            width: 100%;
        }
    }

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

    #sort-btn {
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

    #sort-btn:hover {
        background: var(--vp-c-bg-soft-mute);
        box-shadow: var(--vp-shadow-2);
        transform: translateY(-2px);
    }

    #selector-btn.active {
        background: var(--vp-c-brand-soft);
        color: var(--vp-c-brand);
    }

    #sort-btn.active {
        background: var(--vp-c-brand-soft);
        color: var(--vp-c-brand);
    }

    .selector-icon {
        width: var(--icon-size);
        height: var(--icon-size);
        transition: transform 0.3s ease;
    }

    .sort-icon {
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
        
        #sort-btn {
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
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
    width: 95%;
    max-width: 1200px;
    margin: 0 auto;
    margin-bottom: 20px;
}

@media (max-width: 1080px) {
    #blog-container {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 14px;
        width: 96%;
    }
}

@media (max-width: 768px) {
    #blog-container {
        grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
        gap: 12px;
        width: 98%;
    }
}

@media (max-width: 480px) {
    #blog-container {
        grid-template-columns: 1fr;
        gap: 10px;
        width: 100%;
        padding: 0 10px;
    }
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
</style>
