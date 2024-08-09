<template>
	<view class="header">
		<view class="photo">
			<image :src="avatar" class="avatar" mode=""></image>
		</view>
		<view class="name">{{ name }}</view>
		<view class="header_right">
			<!-- 判断是否为同一个用户，显示不同的按钮 -->
			<view class="flw-btn" v-if="isCurrentUser!== 1" @click.prevent.self="toggleFollow">
				{{ followed ? '已关注' : '+关注' }}
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineProps,
		onMounted
	} from 'vue';

	const props = defineProps(['avatar', 'name', 'userId','postId']);

	const followedList = uni.getStorageSync('followedList') || [];
	const followed = ref(followedList.includes(props.userId));

	const toggleFollow = () => {
		const currentFollowed = !followed.value;
		updateFollowedList(props.userId, currentFollowed);
		followed.value = currentFollowed;
	}

	const updateFollowedList = (userId, isFollowed) => {
		let followedList = uni.getStorageSync('followedList') || [];
		if (isFollowed) {
			if (!followedList.includes(userId)) {
				followedList.push(userId);
			}
		} else {
			const index = followedList.indexOf(userId);
			if (index !== -1) {
				followedList.splice(index, 1);
			}
		}
		uni.setStorageSync('followedList', followedList);
	}

	// 假设从本地存储中获取当前用户的 userId
	const currentUser = uni.getStorageSync('userId') || null;
	const isCurrentUser = props.userId !== currentUser;
	// onMounted(() => {
	// 	const currentUser = uni.getStorageSync('userId');
	// 	const isCurrentUser = props.userId !== currentUser;
	// 	console.log(currentUser)
	// 	console.log(isCurrentUser)
	// })
</script>


<style scoped>
	.header {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 30rpx;
		margin-left: 20rpx;
	}

	.header image {
		margin: 3rpx;
		width: 50rpx;
		height: 50rpx;
	}

	.avatar {
		border-radius: 50%;
	}

	.name {
		margin-left: 10px;
	}

	button {
		margin-left: 10px;
	}

	.photo {
		background-image: url(@/static/image/tx.jpg);
		background-size: 100%;
		background-repeat: no-repeat;
		border-radius: 50%;
	}

	.header_right {
		display: flex;
		width: 100%;
	}

	.flw-btn {
		margin-left: auto;
		margin-right: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 3px solid #c8c8c8;
		border-radius: 25px;
		background-color: #ffffff;
		width: 100rpx;
		height: 50rpx;
		font-size: 15px;
		color: #c8c8c8;
	}
</style>