<template>
	<view class="page">
		<form @submit.prevent="submitForm">
			<!-- 头像部分 -->
			<view class="label">
				<p>头像</p>
				<view class="update">
					<image class="avatar" :src="avatar" mode=""></image>
					<image class="right" src="../../../static/image/right.png" mode=""></image>
				</view>
			</view>

			<!-- 昵称 -->
			<view class="label" @click="navigate(items[0].id, 0)">
				<p>{{ items[0].label }}</p>
				<view class="update">
					{{ nickname || '未设置' }}
					<image class="right" src="../../../static/image/right.png" mode=""></image>
				</view>
			</view>

			<!-- 性别 -->
			<view class="label" @click="showGenderPicker">
				<p>{{ items[1].label }}</p>
				<view class="update">
					{{ sex || '未设置' }}
					<image class="right" src="../../../static/image/right.png" mode=""></image>
				</view>
			</view>

			<!-- 出生年月 -->
			<view class="label">
				<p>{{ items[2].label }}</p>
				<view class="update">
					{{ birth || '1999-09-29' }}
					<image class="right" src="../../../static/image/right.png" mode=""></image>
				</view>
			</view>

			<!-- 个性签名 -->
			<view class="label" @click="navigate(items[3].id, 3)">
				<p>{{ items[3].label }}</p>
				<view class="update">
					{{ signature || '未设置' }}
					<image class="right" src="../../../static/image/right.png" mode=""></image>
				</view>
			</view>
			<view class="vhvw">
				<view class="submitform" @click="submitForm" type="submit">修改</view>
			</view>
		</form>
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onActivated
	} from 'vue'

	const items = [{
			id: '0',
			label: '昵称',
			value: '昵称'
		},
		{
			id: '1',
			label: '性别',
			value: '性别'
		},
		{
			id: '2',
			label: '出生年月',
			value: '1980-01-01'
		},
		{
			id: '3',
			label: '个性签名',
			value: '个性签名'
		}
	]

	const avatar = ref('../../../static/image/tx.jpg')
	const nickname = ref('')
	const sex = ref('')
	const birth = ref('')
	const signature = ref('')
	const submitForm = (e) => {

		e.preventDefault();
		const userId = uni.getStorageSync('userId')
 			// 打印表单数据
			console.log("表单数据：");
		console.log({
			name: nickname.value,
			sex: sex.value,
			signature: signature.value
		});
		uni.request({
			url: 'http://127.0.0.1:8080/myland/update',
			method: 'POST',
			data: {
				userId:userId,
				name: nickname.value,
				sex: sex.value,
				signature: signature.value
			},
			success: function(res) {
				console.log('成功更新数据:', res.data);
				uni.showToast({
					title: '更新成功',
					icon: 'none'
				});
			},
			fail: function(error) {
				console.error('更新数据失败:', error);
				uni.showToast({
					title: '更新失败',
					icon: 'none'
				});
			}
		});
	}

	const loadData = () => {
		avatar.value = uni.getStorageSync('avatar') || avatar.value
		nickname.value = uni.getStorageSync('name') || ''
		sex.value = uni.getStorageSync('sex') || ''
		birth.value = uni.getStorageSync('birth') || ''
		signature.value = uni.getStorageSync('signature') || ''
	}
	// 监听来自修改页面的更新事件
	uni.$on('updateName', (newName) => {
		nickname.value = newName;
	});

	uni.$on('updateSignature', (newSignature) => {
		signature.value = newSignature;
	});
	onMounted(() => {
		console.log("onmount")
		loadData()

	})
	onActivated(() => {
		loadData()
		console.log("onactive")
	})
	// 导航到具体的表单项页面
	const navigate = (id, index) => {
		uni.navigateTo({
			url: `interaction?id=${id}`
		})
	}

	// 显示性别选择器
	const genderOptions = ['男', '女', '其他']
	const showGenderPicker = () => {
		uni.showActionSheet({
			itemList: genderOptions,
			success: function(res) {
				sex.value = genderOptions[res.tapIndex]
				uni.setStorageSync('sex', genderOptions[res.tapIndex])
			}
		})
	}
</script>

<style scoped>
	.page {
		width: 100vw;
		height: 100vh;
		background-color: #f2f3f5;
		padding: 20rpx 0 0 0;
		border-top: 1px solid #d9d9d9;
	}

	.label {
		display: flex;
		align-items: center;
		flex-direction: row;
		background-color: #ffffff;
		padding: 30rpx 20rpx;
		border-top: 2px solid #f7f7f7;
		border-bottom: 2px solid #f7f7f7;
	}

	.update {
		display: flex;
		flex-direction: row;
		margin-left: auto;
		gap: 20rpx;
	}

	.right {
		display: flex;
		align-items: center;
		margin: auto;
		width: 30rpx;
		height: 30rpx;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}

	.vwvh {
		width: 100vw;
		height: 10vh;
	}

	.submitform {
		width: 100rpx;
		height: 60rpx;
		display: flex;
		margin-left: auto;
		justify-content: center;
		align-items: center;
		color: #ffffff;
		border-radius: 5px;
		margin-right: 20rpx;
		margin-top: 20rpx;
		background-color: #01bcff;
	}
</style>