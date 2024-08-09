<template>
	<view>
		扫一扫
	</view>
</template>

<script setup>
	// 允许从相机和相册扫码
	uni.scanCode({
		success: function (res) {
			console.log('条码类型：' + res.scanType);
			console.log('条码内容：' + res.result);
		}
	});
	
	// 只允许通过相机扫码
	uni.scanCode({
		onlyFromCamera: true,
		success: function (res) {
			console.log('条码类型：' + res.scanType);
			console.log('条码内容：' + res.result);
		}
	});
	
	// 调起条码扫描
	uni.scanCode({
		scanType: ['barCode'],
		success: function (res) {
			console.log('条码类型：' + res.scanType);
			console.log('条码内容：' + res.result);
		}
	});
</script>

<style>

</style>
