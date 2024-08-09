<template>
    <view class="status-bar" :style="'height: ' + statusHeight + 'px;'"></view>
</template>

<script setup>
import { onMounted, ref } from "vue";

const statusHeight = ref(0);

onMounted(() => {
  setStatusBar();
});

const setStatusBar = () => {
  const systemInfo = uni.getSystemInfoSync();
  statusHeight.value = systemInfo.statusBarHeight;
};
</script>

<style scoped>
.status-bar {
	z-index: 50;
    background-color: #01bcff;
    width: 100%;
    position: sticky; /* 使用固定定位 */
    top: 0; /* 顶部对齐 */
    left: 0; /* 左侧对齐 */
    box-sizing: border-box; /* 设置盒模型为边框模型 */
}
</style>
