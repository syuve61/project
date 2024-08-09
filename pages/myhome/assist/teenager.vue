<template>
	<view class="back_image">
		<image src="../../../static/image/qsn.png" mode=""></image>
	</view>
	<view class="p1">
		健康成长 有我陪伴
	</view>
	<view class="p2">
		<view class="teen">
			<image class="teen_image" src="/static/image/qsn1.png" mode=""></image>
		</view>
		<view class="p3">
			开启青少年模式后,将自动开启时间锁,每天使用时长最多为40分钟,晚上10点至次日6点无法使用漫游岛
		</view>
	</view>
	<view class="p2">
		<view class="teen">
			<image class="teen_image" src="/static/image/qsn2.png" mode=""></image>
		</view>
		<view class="p3">
			在青少年模式内，直播、打赏、充值、涉及金钱等功能将被关闭
		</view>
	</view>
	<view class="p2">
		<view class="teen">
			<image class="teen_image" src="/static/image/qsn3.png" mode=""></image>
		</view>
		<view class="p3">
			根据年龄分级，更精细地推荐更多丰富内容，帮助青少年健康成长
		</view>
	</view>
	<view class="p2">
		<view class="teen">
			<image class="teen_image" src="/static/image/qsn4.png" mode=""></image>
		</view>
		<view class="p3">
			精选科普知识、传统文化、可爱萌宠、体育运动、才艺教学优质动画等青少年用生活常识、户喜爱的内容
		</view>
	</view>
	<view class="qsn">
		<view class="btn">
			开启青少年模式
		</view>
	</view>
</template>

<script setup>

</script>

<style scoped>
	.back_image {
		padding: 0 20rpx;
		background-size: 100%;
	}

	.back_image image {
		border-radius: 5px;
		width: 100%;
		clip-path: inset(0% 0% 20% 0%);
	}

	.p1 {
		display: flex;
		justify-content: center;
		font-weight: 600;
		font-size: 16px;
		margin-bottom: 100rpx;
		letter-spacing: 2px;
		/* 调整字距 */
	}

	.p2 {
		display: flex;
		justify-content: center;
		margin: 20rpx;
	}

	.p3 {
		font-size: 12px;
		width: 80%;
	}

	.qsn {
		position: absolute;
		width: 100%;
		top: 90%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn {
		height: 50px;
		width: 200px;
		background-color: #01bcff;
		border-radius: 50px;
		color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.teen {
		background-color: #edf7ff;
		/* background-color: #01bcff; */
		height: 60rpx;
		width: 60rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 50%;
		margin: 0 20rpx;
	}

	.teen_image {
		height: 30rpx;
		width: 30rpx;
	}
</style>