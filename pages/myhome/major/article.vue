<template>
	<view class="page">
		<view class="" v-if="myself.length>0">
			<view v-for="(item, index) in myself" :key="index">
				<PostUser :postData="item"></PostUser>
			</view>
		</view>
		<view class="" v-else>
			<p>你暂未发布帖子</p>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';
	const myself = ref([])
	const userId = ref('')
	onMounted(() => {
		userId.value = uni.getStorageSync('userId');
		uni.request({
			url: 'http://127.0.0.1:8080/myland/myself',
			method: 'POST',
			data: {
				userId: userId.value
			},
			success(res) {
				console.log(res)
				myself.value = res.data;
			}
		})
	})
	// deletepost
	// const deletepost = () =>{
	// 	uni.request({
	// 		url: 'http://127.0.0.1:8080/myland/deletepost',
	// 		method: 'POST',
	// 		data: {
	// 			postid:postid
	// 		},
	// 		success(res) {
	// 			console.log(res)
	// 			myself.value = res.data;
	// 		}
	// 	})
	// }
</script>

<style scoped>
	.page{
		background-color: #f2f2f2;
		padding: 10rpx;
		height: 100%;
	}
</style>