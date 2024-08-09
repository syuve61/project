<template>
	<view v-if="id === '0'">
		<input type="text" placeholder="输入新昵称" class="input_name" v-model="inputValue" />
		<view class="save">
			<view class="submit" @click="savedate">
				<p class="p1">保存</p>
			</view>
		</view>
	</view>
	<view v-else-if="id === '1'">
		<!-- <view class="container">
			<view class="picker" @click="showGenderPicker">
				{{ selectedGender || '选择性别' }}
			</view>
			<view class="save">
				<view class="submit" @click="saveGender">
					<p class="p1">保存</p>
				</view>
			</view>
		</view> -->
	</view>
	<!-- <view v-else-if="id === '2'">
		<view @click="openDatePicker">{{ inputValue || '选择日期' }}</view>
		<view class="save">
			<view class="submit" @click="savedate">
				<p class="p1">保存</p>
			</view>
		</view>
	</view> -->
	<view v-else-if="id === '3'">
		<input type="text" placeholder="请填写你的个性签名吧!!!" class="input_name" v-model="inputValue" />
		<view class="save">
			<view class="submit" @click="savedate">
				<p class="p1">保存</p>
			</view>
		</view>
	</view>
	<view class="error" v-else>
		出错了！
	</view>
</template>

<script setup>
	import {
		ref,
		onMounted,
		onBeforeMount
	} from 'vue'
	const id = ref('')
	const inputValue = ref('')
	const savedate = () => {
		switch (id.value) {
		    case '0':
		      // uni.setStorageSync('name', inputValue.value);
		      uni.$emit('updateName', inputValue.value); // 发送更新昵称事件
		      break;
		    case '3':
		      // uni.setStorageSync('signature', inputValue.value);
		      uni.$emit('updateSignature', inputValue.value); // 发送更新个性签名事件
		      break;
		    default:
		      console.error('Invalid id');
		  }
		  uni.navigateBack();
	}
	onBeforeMount(() => {
		console.log(getCurrentPages().$page)
        id.value = getCurrentPages()[0].options.id;

		console.log(id.value)
		if (id.value) {
			console.log("id=" + id.value)
			let title = '';
			switch (id.value) {
				case '0':
					title = '修改昵称';
					break;
				case '1':
					title = '修改性别';
					break;
				case '2':
					title = '修改出生日期';
					break;
				case '3':
					title = '修改个性签名';
					break;
				default:
					title = '';
			}

			if (title) {
				uni.setNavigationBarTitle({
					title: title
				});
			}
		}
	});
	onMounted(()=>{
		// id.value = getCurrentPages()[0].options.id;
		// const postId = getCurrentPages()[1].options.postId;
		
		// console.log(getCurrentPages())
	})
</script>

<style scoped>
	.error {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		font-weight: bold;
	}
	.container {
	  padding: 20px;
	}
	.picker {
	  border-bottom: 2px solid #01bcff;
	  height: 60px;
	  line-height: 60px;
	  text-align: center;
	}
	.save {
		width: 100vw;
		height: 40rpx;
	}

	.submit {
		margin-left: auto;
		height: 30px;
		width: 60px;

		font-weight: bold;
		font-size: 15px;

		display: flex;
		justify-content: center;
		align-items: center;
	}

	.p1 {
		color: #01bcff;
		border-bottom: 2px solid #01bcff;
	}

	.input_name {
		margin: 30rpx 20rpx;
		border-bottom: 2px solid #01bcff;
		height: 60rpx;
	}
</style>