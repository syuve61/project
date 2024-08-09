<template>
	<view class="head">
		<view v-for="(item, index) in menuList" :key="index" class="nav-item" :class="{ active: currentMenu === index }"
			@tap="switchTab(index)">
			<view>{{ item.name }}</view>
		</view>
	</view>
	<allactive v-if="currentMenu === 0"></allactive>
	<mypartactive v-if="currentMenu === 1"></mypartactive>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const menuList = ref([{
			name: '全部'
		},
		{
			name: '我参与的'
		}
	]);

	const currentMenu = ref(0);

	const switchTab = (index) => {
		currentMenu.value = index; // 触发一个名为'update'的事件，并传递新的索引作为参数
		console.log(currentMenu.value)
	};
</script>

<style scoped>
	.head {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		margin-bottom: 20rpx;
		margin: 20rpx 0;
	}

	.active {
		position: relative;
		color: #55aaff;
		font-weight: bold;
		/* border-bottom:1px solid #55aaff; */
	}

	.active::after {
		content: "";
		padding-bottom: 10rpx;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 40rpx;
		/* 设置线条的宽度 */
		border-bottom: 2px solid #55aaff;
	}
</style>