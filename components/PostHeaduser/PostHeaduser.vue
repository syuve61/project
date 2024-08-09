<template>
	<view class="header">
		<view class="photo">
			<image :src="avatar" class="avatar" mode=""></image>
		</view>
		<view class="name">{{ name }}</view>
		<view class="header_right">
			<!-- 判断是否为同一个用户，显示不同的按钮 -->
			<view class="flw-btn" @click.prevent.self="deletepost">删除
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
	const props = defineProps(['avatar', 'name', 'userId', 'postId']);
	const deletepost = () => {
		const postId = props.postId;
		uni.showModal({
			title: '提示',
			content: '你确定要删除你发布的帖子吗？',
			cancelText: '取消',
			confirmText: '确定',
			confirmColor: '#FF0000', // 设置确认按钮的颜色为红色
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定');

					// 发送请求到服务器删除帖子
					uni.request({
						url: 'http://127.0.0.1:8080/myland/deletepost', // 替换为实际的删除帖子接口
						method: 'POST',
						data: {
							// 传递必要的删除数据，例如帖子ID
							postId: postId
						},
						success(res) {
							console.log('帖子删除成功', res);
							uni.showToast({
							  title: '删除成功!',
							  icon: 'none',
							});
							setTimeout(() => {
							  if (res.statusCode === 200) {
							    uni.redirectTo({
							      url: '/pages/myhome/major/article',
							    });
							  }
							}, 1000); // 延迟 1500 毫秒（1.5 秒）
							// 处理删除成功的逻辑，例如刷新帖子列表
						},
						fail(err) {
							console.error('帖子删除失败', err);

							// 处理删除失败的逻辑，例如显示错误提示
						}
					});
				} else if (res.cancel) {
					console.log('用户点击取消');
				}
			}
		});
	};
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