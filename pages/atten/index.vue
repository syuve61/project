<template>
	<view class="container" v-if="followedList.length > 0">
		<scroll-view scroll-x="true" class="scroll-view">
			<view v-for="(item, index) in followedList" :key="index" class="follow" :class="{ highlight: index === currentHighlight }" @click="highlightUser(index)">
				<image :src="item.avatar" class="image"></image>
				<p class="follow_name">{{item.name}}</p>
			</view>
		</scroll-view>
		<view class="sep"></view>
		<view v-for="(item,index) in followfirstpost" class="followpost">
			<Post :postData="item"></Post>
		</view>
	</view>
	<view class="container" v-else>
		<view class="text">
			你还没有关注的对象！
		</view>
	</view>
</template>

<script setup>
	import { ref, onBeforeMount } from 'vue';

	const followedList = ref([]);
	const followfirstpost = ref([]);
	const currentHighlight = ref(0); // 新增的响应式属性，用于跟踪当前高亮的头像

	const highlightUser = (index) => {
			const followId = uni.getStorageSync('followedList');
			currentHighlight.value = index;
			const highlightedUserId = followId[index]; // 直接获取数组中对应下标的元素
			console.log('当前高亮的用户ID是:', highlightedUserId);
			// 这里你可以添加其他的点击事件处理逻辑
			post(highlightedUserId);
		};
	const post = (userId) => {
			uni.request({
				url: 'http://127.0.0.1:8080/myland/myself',
				method: 'POST',
				data: {
					userId: userId // 使用传入的 userId 参数
				},
				success(res) {
					console.log(res.data);
					followfirstpost.value = res.data
				}
			});
		};
	onBeforeMount(() => {
		const followId = uni.getStorageSync('followedList');
		console.log(followId);
		uni.request({
			url: 'http://127.0.0.1:8080/myland/atten',
			method: 'POST',
			data: {
				followId: followId
			},
			success(res) {
				followedList.value = res.data.users
				followfirstpost.value = res.data.posts
				console.log(followedList.value)	
				console.log(followfirstpost.value)
			}
		})
	});
</script>
<style scoped>
	.highlight {
	  color: #01bcff;
	  font-weight: bold;
	}
	.container{
		background-color: #f2f2f2;
		width: 100%;
		height: 100%;
		padding: 0 0 10rpx 0;
	}
	.highlight image{
		height: 100rpx;
		width: 100rpx;
		border-radius: 50%;
	}
	.scroll-view {
		background-color: #ffffff;
		width: 100%;
		height: 100%;
		/* margin: 30rpx 0; */
		padding: 30rpx 0 30rpx 0;
	}
	.followpost{
		/* background-color: #f2f2f2; */
	}
	.follow {
		display: inline-block;
		width: 80rpx;
		height: 80rpx;
		margin: 0 10px;
	}
	.follow_name{
		font-size: 14px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.image {
		border-radius: 50%;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.text {
		font-size: 16px;
		color: #666;
	}
	.sep{
		/* margin: 10rpx; */
		padding: 10rpx;
		background-color: #f2f2f2;
	}
</style>