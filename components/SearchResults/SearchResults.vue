<template>
  <view class="results">
    <view v-for="(item, index) in posts" :key="index" @click="gotodetail(item.postId)">
    	<Post :postData="item"></Post>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.results {
  margin-top: 20rpx;
}

.post-item {
  background-color: #ffffff;
  padding: 20rpx;
  margin-bottom: 20rpx;
  border-radius: 10rpx;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.post-title {
  font-weight: bold;
  font-size: 32rpx;
  margin-bottom: 10rpx;
}

.post-content {
  font-size: 28rpx;
  color: #666666;
}
</style>
