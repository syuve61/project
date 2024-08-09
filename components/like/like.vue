<template>
	<view class="page">
		<view class="like">
			<view class="like_head">
				<image class="avatar" src="../../static/image/msgavatar.jpg" mode=""></image>
				<view class="head_direction">
					<view class="name">
						岩浆裕的渔夫
					</view>
					<view class="data">
						2024-06-11
					</view>
				</view>
			</view>
			<view class="direction">
				<view class="body">
					赞了我的回复
				</view>
				<view class="body2">
					我：好家伙！
				</view>
				<view class="pl">
					打打地牢守卫！
				</view>
			</view>
		</view>
		<!-- 空盒过渡 -->
		<view class="null"></view>
		<!-- 第2个 -->
		<view class="like">
			<view class="like_head">
				<image class="avatar" src="../../static/image/msgavatar.jpg" mode=""></image>
				<view class="head_direction">
					<view class="name">
						渔夫
					</view>
					<view class="data">
						2024-06-11
					</view>
				</view>
			</view>
			<view class="direction">
				<view class="body">
					赞了我的回复
				</view>
				<view class="body2">
					我：技术玩家
				</view>
				<view class="pl">
					大炮神教过白光
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>

</script>

<style>
	.page {
		height: 100%;
	}
	.like{
		padding: 20rpx
	}
	.like_head {
		display: flex;
		align-items: center;
	}

	.avatar {
		margin: 0 15rpx;
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
	}

	.head_direction {
		display: flex;
		flex-direction: column;
	}

	.direction {
		display: flex;
		flex-direction: column;
	}

	.name {
		font-weight: 400;
		font-size: 16px;
	}
	.data{
		font-weight: 200;
		font-size: 12px;
	}
	.body{
		margin: 20rpx 0 ;
		font-size: 18px;
		font-weight: 600;
	}
	.body2{
		margin: 5px 0;
	}
	.pl{
		width: 100%;
		height: 100rpx;
		background-color: #f2f2f2;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		border-radius: 10px;
	}
	.null{
		height: 10rpx;
		width: 100vw;
		background-color: #f2f2f2;
	}
</style>