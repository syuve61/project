<template>
	<view class="head">
		<view class="person">
			<view class="image">
				<image class="avatar" :src="userInfo.avatarUrl" mode=""></image>
			</view>
			<view class="colunm">
				<view class="name">
					{{userInfo.username}}
				</view>
				<view class="row">
					<view class="be">
						1100获赞
					</view>
					<!-- <view class="atten">  
						4关注
					</view> -->
					<view class="bean">
						5粉丝
					</view>
				</view>
			</view>
		</view>
		<view class="card" @click="navigatetodataCard">
			编辑资料
		</view>
	</view>
	<major></major>
	<view class="text">常用功能</view>
	<often></often>
	<view class="text">辅助功能</view>
	<assist></assist>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	const navigatetodataCard = () => {
		uni.navigateTo({
			url: 'dateCard/personal'
		})
	}
	const userInfo = ref({
		username: uni.getStorageSync('name') || '',
		avatarUrl: uni.getStorageSync('avatar') || '',
	})
</script>

<style scoped>
	/* .head{
	display: flex;
	padding: 100rpx 50rpx;
	min-width: 100%;
	height: 10vh;
	background-image: url(@/static/image/beijing.jpg);
	background-size: 100%;
} */
	.head {
		width: 100%;
		display: flex;
		box-sizing: border-box;
		height:28vh;
		background-image: url(@/static/image/beijing.jpg);
		/* background-size: 100%; */
		background-size: cover;
	}

	.image {
		margin-left: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.text {
		margin: 10px;
	}

	.avatar {
		border: 5px solid #ffffff;
		height: 150rpx;
		width: 150rpx;
		border-radius: 50%;
	}

	.person {
		display: flex;
		color: #ffffff;
	}

	.name {
		font-size: 28px;
		font-weight: blod;
		margin-left: 30rpx;
	}

	.row {
		display: flex;
		flex-direction: row;
		margin-top: 50rpx;
	}

	.row view {
		margin-left: 30rpx;
	}

	.colunm {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 5rpx;
	}

	.card {
		margin-left: auto;
		margin-top: auto;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		border: 2px solid #01bcff;
		color: #01bcff;
	}
</style>