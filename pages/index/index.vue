<template>
	<!-- <navbar></navbar> -->
	<view class="status-bar" :style="'height: ' + statusHeight + 'px;'"></view>
	<view class="log" :style="'top: ' + statusHeight + 'px;'">
		<view v-if="isLogin.errMsg === 'login:ok'" class="gin">
			<!-- <image class="avatar" :src="userInfo.avatarUrl" @click="gotologin" /> -->
			<!-- 正常登录 -->
			<image class="avatar" :src="userInfo.avatarUrl" @click="gotomyhome" />
			<view class="status">{{ userInfo.username || '已登录' }}</view>
		</view>
		<view v-else class="gin">
			<image class="avatar" :src="avatarUrl" @click="gotologin" />
			<view class="status">{{ userInfo.username || '未登录' }}</view>
		</view>
	</view>
	<view class="searchfa">
		<view class="search" @click="gotoSearch">
			<view class="search-btn">
			</view>
			<view class="searchtext">
				搜索
			</view>
		</view>
	</view>
	<nav-header class="nav-header" @switchTab="handleSwitchTab"></nav-header>
	<view>
		<view v-for="(item, index) in testData" :key="index" @click="gotodetail(item.postId)">
			<Post :postData="item"></Post>
		</view>
	</view>
	<!-- <button @click="cs">测试</button> -->
</template>

<script setup>
	import {
		ref,
		onMounted,
		onBeforeMount
	} from 'vue'
	const statusHeight = ref(0);
	const testData = ref([]);
	onBeforeMount(() => {
			const currentUser = uni.getStorageSync('userId') || null;
			console.log(currentUser);
			if (currentUser !== null) {
				uni.request({
					url: 'http://127.0.0.1:8080/myland/follow',
					method: 'POST',
					data: {
						userId: currentUser
					},
					success(res) {
						console.log(res.data);
						// 将返回的数组设置到本地存储的 followedList 键中
						uni.setStorageSync('followedList', res.data);
					}
				});
			}
		});
	const gotodetail = (postId) => {
		if (postId) {
			console.log(postId);
			uni.navigateTo({
				url: `/pages/detail/index?postId=${postId}`
			});
		} else {

		}
	};
	
	onMounted(() => {
		setStatusBar();
	});
	const setStatusBar = () => {
		const systemInfo = uni.getSystemInfoSync();
		statusHeight.value = systemInfo.statusBarHeight;
	};
	const handleSwitchTab = (data) => {
		// 将接收到的数据存储到响应式数组中
		testData.value = JSON.parse(JSON.stringify(data));
		// testData.value = data;
	};
	// 示例函数 cs
	const cs = () => {
		console.log(testData.value.postid); // 打印每个 post 对象
	};
	const isLogin = ref(uni.getStorageSync('isLogin') || {
		errMsg: 'login:fail'
	});

	const userInfo = ref({
		username: uni.getStorageSync('name') || '',
		avatarUrl: uni.getStorageSync('avatar') || '',
	})

	const gotomyhome = () => {
		uni.navigateTo({
			url: '/pages/myhome/index'
		})
	}

	const gotoSearch = () => {
		uni.navigateTo({
			url: '/pages/search/index'
		})
	}
	const gotologin = () => {
		uni.navigateTo({
			url: '/pages/login/login'
		})
	}
	uni.onTabItemTap = (item) => {
		console.log(item)
		const followedList = uni.getStorageSync('followedList')
		    uni.Request({
		    	url: 'http://127.0.0.1:8080/myland/load',
		    	method: 'POST',
		    	data: {
		    		userId: userId,
		    		followid:followedList
		    	},
		    	success(res) {
		    		console.log(res.data);
		    		// 将返回的数组设置到本地存储的 followedList 键中
		    	}
		    })
	}
	// onHide(() => {
	//     const followedList = uni.getStorageSync('followedList')
	//     uni.Request({
	//     	url: 'http://127.0.0.1:8080/myland/load',
	//     	method: 'POST',
	//     	data: {
	//     		userId: userId,
	//     		followid:followedList
	//     	},
	//     	success(res) {
	//     		console.log(res.data);
	//     		// 将返回的数组设置到本地存储的 followedList 键中
	//     	}
	//     })
	// })
	// onHide() {
	// 	console.log('App Hide')
	// }
	
</script>

<style>
	page {
		background-color: #f2f2f2;
	}

	.status {
		font-weight: bold;
	}
	.log {
		z-index: 50;
		display: flex;
		align-items: center;
		background-color: #01bcff;
		position: sticky;
		padding: 10rpx 0;
	}

	.gin {
		display: flex;
		align-items: center;
	}

	.avatar {
		margin: 0 20rpx;
		height: 100rpx;
		width: 100rpx;
		border-radius: 50%;
		background-image: url(@/static/image/tx.jpg);
		background-size: 100%;
	}

	.searchfa {
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search {
		width: 96vw;
		background-color: #ffffff;
		height: 60rpx;
		margin-top: 10rpx;
		border: 3px solid #f2f2f2;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.search-btn {
		align-items: center;
		width: 40rpx;
		height: 40rpx;
		margin-left: 10rpx;
		background-image: url(@/static/image/sousuo.png);
		background-size: 100%;
		font-size: 15px;
	}

	.searchtext {
		display: flex;
		justify-content: center;
		align-items: center;
		color: #989898;
	}

	.status-bar {
		z-index: 50;
		background-color: #01bcff;
		width: 100%;
		position: sticky;
		/* 使用固定定位 */
		top: 0;
		/* 顶部对齐 */
		left: 0;
		/* 左侧对齐 */
		box-sizing: border-box;
		/* 设置盒模型为边框模型 */
	}
</style>