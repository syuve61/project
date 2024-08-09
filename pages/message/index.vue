<template>
	<view>
		<msgtarbar :currentMenu="currentMenu" @update="updateCurrentMenu"></msgtarbar>
	</view>
	<!-- 添加灰色分隔条 -->
	<view class="gray-separator"></view>
	<!-- 根据当前菜单项显示内容 -->
	<view class="ztl">{{ menuList[currentMenu].name + '消息' }}</view>
	<!-- 对应页面需要渲染的组件 -->
	<!-- 通知组件 -->
	<inform v-if="currentMenu === 0"></inform>
	<!-- @我的组件 -->
	<My v-if="currentMenu === 1"></My>
	<!-- 点赞组件 -->
	<like v-if="currentMenu === 2"></like>
	<!-- 聊天组件 -->
	<chat v-if="currentMenu === 3"></chat>
</template>

<script setup>
	import { ref } from 'vue'

	const menuList = ref([
		{ name: '通知', icon: '/static/image/tongzhi.png' },
		{ name: '@我的', icon: '/static/image/@.png' },
		{ name: '点赞', icon: '/static/image/dianzan.png' },
		{ name: '聊天', icon: '/static/image/huifu.png' }
		// ...更多菜单项
	]);

	const currentMenu = ref(0)

	const updateCurrentMenu = (newIndex) => {
		currentMenu.value = newIndex;
	}
</script>

<style scoped>
	.ztl {
		padding: 15rpx;
		border-bottom: 1px solid #e0e0e0;
		/* 在每个信息项下面添加细线 */
		font-weight: bold;
	}

	.gray-separator {
		width: 100%;
		height: 20rpx;
		background-color: #f2f2f2;
		margin: 20rpx 0 0 0 ;
	}
</style>
