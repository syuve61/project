<template>
    <view class="icon-container">
      <view class="icon-item" @click="navigateToArticle">
        <image src="/static/image/tiezi.png" />
        <text>帖子</text>
      </view>
      <view class="icon-item" @click="navigateToComments">
        <image src="/static/image/pinlunhome.png" />
        <text>评论</text>
      </view>
      <view class="icon-item" @click="navigateToFiles">
        <image src="/static/image/wenjian.png" />
        <text>文件</text>
      </view>
      <view class="icon-item" @click="navigateToCollections">
        <image src="/static/image/shoucang.png" />
        <text>收藏</text>
      </view>
    </view>
</template>

<script setup>
const navigateToArticle = () => {
  uni.navigateTo({url: 'major/article'})
}

const navigateToComments = () => {
  uni.navigateTo({url: 'major/comments'})
}

const navigateToFiles = () => {
  uni.navigateTo({url: 'major/files'})
}

const navigateToCollections = () => {
  uni.navigateTo({url: 'major/collections'})
}
</script>

<style scoped>
.icon-container {
  margin-top: 30rpx;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 25%;
  height: 100%;
  cursor: pointer;
}

.icon-item image {
  width: 60rpx;
  height: 60rpx;
  margin-bottom: 5px;
}

.icon-item text {
  font-size: 12px;
}
</style>