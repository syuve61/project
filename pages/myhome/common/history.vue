<template>
  <view v-if="posts.length === 0" class="margin_auto">
    <image src="../../../static/image/liulanlishi.png" class="rec" mode=""></image>
    <view>你暂未探索新世界！</view>
  </view>
  <view v-else>
    <view v-for="(item, index) in posts" :key="index" @click="gotodetail(item.postId)">
    	<Post :postData="item"></Post>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const posts = ref([]);

onMounted(() => {
  // 获取本地存储中的 browseHistory 数组
  const browseHistory = uni.getStorageSync('browseHistory') || [];
  
  if (browseHistory.length > 0) {
    // 向后端请求数据
	console.log(browseHistory)
    uni.request({
      url: 'http://127.0.0.1:8080/myland/history', // 替换为你的后端接口地址
      method: 'POST',
      data: {
        postId: browseHistory,
      },
      success: (res) => {
		  console.log(res.data)
        if (res.statusCode === 200) {
          posts.value = res.data; // 假设后端返回的数据格式为 { posts: [...] }
        } else {
          console.error('请求失败', res);
        }
      },
      fail: (err) => {
        console.error('请求错误', err);
      },
    });
  }
});
</script>

<style scoped>
.margin_auto {
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  font-size: 18px;
  margin: auto;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
.rec {
  width: 300rpx;
  height: 300rpx;
  border-radius: 50%;
  background-color: #f2f2f2;
  border: 10rpx #f2f2f2;
}
</style>
