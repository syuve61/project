<template>
	<view class="icon-container">
<!-- <image src="/static/image/fuwuzhongxin.png" /> -->
		<view class="icon-item" @click="navigateTocontact">
			<view class="text-container">
				<text>联系我们</text>
			</view>
			<view class="right">
				<image src="/static/image/right.png" />
			</view>
		</view>
		<!-- <view class="icon-item" @click="navigateToComments">
        <image src="/static/image/yinsishezhi.png"/>
        <view class="text-container">
          <text>隐私设置</text>
        </view>
		<view class="right">
			<image src="/static/image/right.png" />
		</view>
      </view> -->
		<view class="icon-item" @click="navigateToteenager">
			<!-- <image src="/static/image/yejianmoshi.png"/> -->
			<view class="text-container">
				<text>青少年守护</text>
			</view>
			<view class="right">
				<image src="/static/image/right.png" />
			</view>
		</view>
		<view class="icon-item" @click="navigateTosetting">
			<!-- <image src="/static/image/shezhi.png"/> -->
			<view class="text-container">
				<text>我的设置</text>
			</view>
			<view class="right">
				<image src="/static/image/right.png" />
			</view>
		</view>
	</view>
</template>

<script setup>
	const navigateTocontact = () => {
		uni.navigateTo({
			url: '/pages/myhome/assist/contact'
		})
	}

	// const navigateToComments = () => {
	//   uni.navigateTo({url: 'major/comments'})
	// }

	const navigateToteenager = () => {
		uni.navigateTo({
			url: '/pages/myhome/assist/teenager'
		})
	}
	// 设置
	const navigateTosetting = () => {
		uni.navigateTo({
			url: '/pages/myhome/assist/setting'
		})
	}
</script>

<style scoped>
	/* 保持其他元素的布局不变 */
	.icon-container {
		margin-left: 30rpx;
		display: flex;
		flex-direction: column;
		/* 将排列方向改为横向 */
		height: 100%;
	}

	.icon-item {
		display: flex;
		width: 100%;
		/* 取消固定宽度 */
		height: 100%;
		cursor: pointer;
		margin: 20rpx 0;
	}

	.icon-item image {
		margin-left: auto;
		width: 40rpx;
		height: 40rpx;
	}

	.text-container {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-left: 20rpx;
	}

	.right {
		display: flex;
		flex-grow: 1;
		align-items: center;
		margin-right: 0rpx;
	}

	.right image {
		width: 40rpx;
		height: 40rpx;
		margin: 0 0 0 90%;
	}
</style>