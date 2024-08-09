<!-- // 头像保存的目录
private String saveDirectory = System.getProperty("catalina.home") + File.separator + "work" + File.separator + "java" +
File.separator + "Uploads";

D:\桌面\编程\JavaEE\工具\apache-tomcat-8.5.31 -->
<template>
	<image class="logo" src="../../static/image/manyoudao.jpg" mode=""></image>
	<view class="pages">
		<view class="userinfo">
			<!-- <view open-type="chooseAvatar" class="avatar-wrapper" @click="chooseAvatar"> -->
			<!-- <button class="avatar-wrap" open-type="chooseAvatar" > -->
			<button class="avatar-wrap" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<view class="label">请选择您的头像</view>
				<view class="ipt">
					<image class="avatar" v-if="headimg" :src="headimg"></image>
				</view>
				<!-- </view> -->
			</button>
		</view>
		<view class="nickname-wrapper">
			<text class="nickname-label">昵称</text>
			<input type="nickname" class="nickname-input" placeholder="请输入昵称" @change="onInputChange" />
		</view>
		<button class="login" @click="login">登录</button>
	</view>
</template>
<script setup>
	import { ref } from 'vue'
	// 在登录成功后，保存用户信息到全局变量或者本地存储
	var headimg = ref('../../static/image/tx.jpg');
	var username = ref(''); // 用户名
	var base64Image = ref('');
	const onChooseAvatar = (e) => {
		headimg.value = e.detail.avatarUrl
		console.log(headimg)
	};

	const onInputChange = (e) => {
		username = e.detail.value;
		console.log(username)
	};
	const login = () => {
		const avatar = headimg.value
		// console.log(username.value)
		uni.showModal({
			title: '登录获取权限提醒',
			content: '是否同意获取权限',
			success: function(res) {
				if (res.confirm) {
					console.log('用户点击确定');
					// 获取用户信息
					uni.getUserProfile({
						desc: '获取用户权限', // 声明获取用户个人信息后的用途
						success: (user) => {
							console.log(user);
							console.log(avatar);
							const fileSystemManager = uni.getFileSystemManager(avatar);
							fileSystemManager.readFile({
								filePath: avatar, // 选择的图片路径
								encoding: 'base64', // 编码格式
								success: function(res) {
									const base64Data = res.data;
									console.log(base64Data);
									// 这里可以处理 base64 数据，比如上传到服务器或者显示图片
									uni.login({
										provider: 'weixin',
										success: (code) => {
											console.log(code);
											uni.request({
												url: 'http://127.0.0.1:8080/myland/login',
												method: 'POST',
												data: {
													code: code.code,
													name: username,
													avatar: base64Data,
												},
												success: (res2) => {
													console.log(res2, 'res2');
													uni.setStorageSync('userId',res2.data.userId);
													// uni.setStorageSync('avatar',res2.data.avatarUrl);
													uni.setStorageSync('avatar',res2.data.avatar);
													uni.setStorageSync('isLogin', code);
													console.log(code);
													uni.setStorageSync('name',username);
													uni.reLaunch({
														url: '/pages/index/index',
													});
													uni.showToast({
														title: '登录成功',
														icon: 'none',
													});
												},
											});
										},
									});
								},
								fail: function(error) {
									console.error('读取文件失败:', error);
								},
							});
						},
						fail: (err) => {
							uni.showToast({
								title: '错误',
								icon: 'none',
							});
							console.log(err);
						},
					});
				} else if (res.cancel) {
					console.log('用户点击取消');
					uni.showToast({
						title: '登录失败',
						icon: 'none',
					});
				}
			},
		});
	};
</script>
<style scoped>
	.pages {
		margin: 30rpx;
		background: none;
		height: 40vh;
		border-radius: 15px;
		position: relative;
		z-index: 1;
	}

	.userinfo {
		margin-top: -20%;
		background: #ffffff;
		/* Set background to white */
		z-index: 2;
		/* Higher z-index to be on top */
		padding: 20rpx;
		border-radius: 15px;
		box-shadow: 0 0 10rpx rgba(0, 0, 0, 0.1);
		position: relative;
	}

	.label {
		color: #999999;
		text-shadow: 1px 1px #ffffff;
		margin: auto;
		font-size: 20px;
	}

	.ipt {
		z-index: 5;
	}

	.avatar {
		z-index: 5;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.avatar-wrapper {
		z-index: 5;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin-top: 20rpx;
	}

	.name-wrapper {
		margin-top: 20rpx;
		z-index: 5;
		text-align: center;
		border-top: 2px solid #6fb1f9;
		border-bottom: 2px solid #6fb1f9;
		font-size: 20px;
		height: 100rpx;
		background-color: #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.name-label {
		color: #999999;
	}

	.name-input {
		width: 100%;
		height: 100%;
		background-color: transparent;
		border: none;
		outline: none;
		color: #000000;
		text-align: center;
	}

	.nickname-wrapper {
		margin-top: 20rpx;
		z-index: 5;
		text-align: center;
		font-size: 20px;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nickname-label {
		color: #999999;
		display: flex;
		justify-content: center;
	}

	.nickname-input {
		height: 100%;
		background-color: transparent;
		border: none;
		outline: none;
		color: #000000;
		text-align: center;
	}

	.logo {
		z-index: 1;
		width: 100vw;
	}

	.login {
		color: #ffffff;
		font-size: 25px;
		font-weight: 400;
		text-shadow: 1px 1px #ffffff;
		background-color: #6fb1f9;
		margin-top: 30rpx;
		z-index: 5;
		letter-spacing: 2px;
		line-height: 1.5;
	}
</style>