<template>
	<view>
		<view class="inform">
			<image class="inform_image" src="../../static/image/sy.png" mode=""></image>
			<view class="column">
				<view class="title">
					系统消息
				</view>
				<view class="content">
					记得签到领取奖励！
				</view>
			</view>
			<view class="column_data">
				<view class="data">
					02-02
				</view>
				<view class="tx">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
</script>

<style>
	.inform{
		height: 100rpx;
		width: 100%;
		border-bottom: 1px solid #e0e0e0;
		display: flex;
		align-items: center;
	}
	.inform_image{
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
		margin: 0 20rpx;
	}
	.column{
		display: flex;
		flex-direction: column;
	}
	.column view{
		margin: 5rpx 0;
	}
	.title{
		font-weight: 400;
		font-size: 16px;
	}
	.content{
		font-weight: 200;
		font-size: 12px;
	}
	.column_data{
		margin-left: auto;
		display: flex;
		flex-direction: column;
	}
	.column_data view{
		margin: 10rpx 20rpx 10rpx 0rpx;
	}
	.data{
		font-size: 10px;
	}
	.tx{
		height: 20rpx;
		width: 20rpx;
		border-radius: 50%;
	}
</style>