<template>
	<view class="page">
		<view class="date">{{ isFlipped ? currentDate : '日签卡' }}</view>
		<view class="card" @tap="flipCard">
			<view class="card-inner" :class="{ 'is-flipped': isFlipped }">
				<view class="card-front">
					<image src="/static/image/qiandao.jpg" mode=""></image>
					<view class="date-box">
						<text class="big-date">{{ day }}</text>
						<text class="small-date">{{ smallDate }}</text>
					</view>
					<view class="open-button" @tap.stop="flipCard">立即打卡</view> <!-- 新增按钮 -->
				</view>
				<view class="card-back">
					<image src="../../../static/image/qiandaoz.jpg" mode=""></image>
					<view class="zuoxia">
						<image class="" src="../../../static/image/fenxiang.png" mode=""></image>
					</view>
					<view class="date-box-back">
						<text class="back-day">{{ day }}</text>
						<text class="back-date">{{ yearMonth }}</text>
					</view>
					<view class="right-bottom-box">
						<view class="today-card">今日卡片</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>


<script setup>
	import {
		ref
	} from 'vue';

	const isFlipped = ref(false);
	const flippedOnce = ref(false); // 新增状态用来记录是否已经翻转过一次

	const flipCard = () => {
		if (!flippedOnce.value) { // 只有在未翻转过的情况下才执行翻转
			isFlipped.value = true;
			flippedOnce.value = true; // 标记已经翻转过一次
		}
	}

	// 获取当前日期
	const getCurrentDate = () => {
		const date = new Date();
		const month = date.getMonth() + 1; // 月份从0开始，需要加1
		const day = date.getDate(); // 获取日期
		const weekDay = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][date.getDay()];
		const year = date.getFullYear(); // 获取年份
		return {
			fullDate: `${month}月${day}号`,
			yearMonth: `${year}.${month}`,
			day: day < 10 ? `0${day}` : `${day}`,
			smallDate: `${month}月，${weekDay}`
		};
	}

	const {
		fullDate,
		yearMonth,
		day,
		smallDate
	} = getCurrentDate(); // 当前日期
	const currentDate = fullDate;
</script>

<style scoped>
	.page {
		width: 100vw;
		height: 100vh;
	}

	.card {
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 80vw;
		height: 70vh;
		perspective: 1000px;
		/* 设置透视效果 */
	}

	.card-inner {
		width: 100%;
		height: 100%;
		position: relative;
		transition: transform 0.6s;
		transform-style: preserve-3d;
		/* 保持3D变换效果 */
	}

	.card-inner image {
		width: 100%;
		height: 100%;
		border-radius: 10px;
	}

	.card-inner.is-flipped {
		transform: rotateY(180deg);
		/* 翻转180度 */
	}

	.card-front,
	.card-back {
		width: 100%;
		height: 100%;
		position: absolute;
		backface-visibility: hidden;
		/* 隐藏背面 */
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: white;
		font-size: 20px;
		border-radius: 8px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.card-back {
		transform: rotateY(180deg);
		/* 初始状态为背面 */
	}

	.date {
		font-size: 25px;
		font-weight: 500;
		padding: 20rpx 70rpx;
	}

	.open-button {
		width: 400rpx;
		height: 60rpx;
		position: absolute;
		bottom: 60rpx;
		background-color: #9fefd6;
		color: black;
		padding: 10rpx 20rpx;
		border-radius: 5rpx;
		cursor: pointer;
	}

	.date-box {
		position: absolute;
		top: 20rpx;
		left: 20rpx;
		background-color: none;
		padding: 10rpx;
		border-radius: 5rpx;
		text-align: center;
		display: flex;
		flex-direction: column;
	}

	.big-date {
		font-size: 65px;
		font-weight: bold;
	}

	.small-date {
		font-size: 16px;
	}

	.date-box-back {
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 20rpx;
		right: 20rpx;
		background-color: none;
		padding: 10rpx;
		border-radius: 5rpx;
		text-align: center;
		border: 2px solid #ffffff;
	}

	.back-day {
		font-size: 60px;
		font-weight: bold;
		color: white;
		border-bottom: 2px solid #ffffff;
	}

	.back-date {
		font-size: 20px;
		font-weight: bold;
	}

	.zuoxia {
		position: absolute;
		bottom: 20rpx;
		left: 20rpx;
		width: 80rpx;
		height: 80rpx;
		background-color: rgba(182, 182, 174, 0.3);
		/* 使用 rgba 设置透明度 */
		border-radius: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.zuoxia image {
		border-radius: 50%;
		height: 40rpx;
		width: 40rpx;
	}

	.right-bottom-box {
		position: absolute;
		bottom: 20rpx;
		right: 20rpx;
		display: flex;
		align-items: center;
		background-color: rgba(182, 182, 174, 0.6);
		padding: 10rpx;
		border-radius: 50rpx;
	}

	.today-card {
		font-size: 20px;
		margin: 0 30rpx;
	}

	.arrow {
		font-size: 25px;
		font-weight: bold;
	}
</style>