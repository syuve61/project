<template>
  <view>
    <view class="container">
      <!-- 使用 v-for 循环渲染图片 -->
      <template v-if="image.length === 1">
        <image :src="image[0]" class="single-image"></image>
      </template>
      <template v-else-if="image.length === 2">
        <view class="flex-container">
          <image v-for="(img, index) in image" :key="index" :src="img" class="flex-item"></image>
        </view>
      </template>
      <template v-else>
        <view class="flex-container">
          <image v-for="(img, index) in image" :key="index" :src="img" class="flex-item"></image>
        </view>
      </template>
    </view>
  </view>
</template>

<script setup>
  import { defineProps } from 'vue';
  // 定义组件接收的 props，并直接转换为数组
  const { image: imageProp } = defineProps(['image']);
  
  const image = JSON.parse(imageProp);
  //**** 这里后端上面一行需要注释
  // console.log(imageProp); // 确保正确接收到 image 数组
</script>


<style scoped>
	.container {
		width: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: center;
	}

	.single-image {
		width: 100%;
	}

	.flex-container {
		display: flex;
		flex-wrap: wrap;
		gap: 5px;
	}

	.flex-item {
		flex-basis: 30%;
		/* 每个图片容器的宽度为容器宽度的 20% */
		height: 250rpx;
		object-fit: cover;
		/* 按比例缩小图片而不裁剪 */
		border-radius: 10%;
	}

	.flex-item image {}

	.plus-text {
		grid-column: 2;
		grid-row: 2;
		text-align: center;
		line-height: 100px;
		font-size: 24px;
	}
</style>