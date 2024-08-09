<template>
    <view class="icon-container">
      <view class="icon-item" @click="navigateToDaKa">
        <image src="/static/image/daka.png" />
        <text>打卡</text>
      </view>
      <!-- <view class="icon-item" @click="navigateToChuangZuoZhongXin">
        <image src="/static/image/chuangzuozhongxing.png" />
        <text>创作中心</text>
      </view> -->
      <view class="icon-item" @click="navigateToSaoYiSao">
        <image src="/static/image/saoyisao.png" />
        <text>扫一扫</text>
      </view>
      <view class="icon-item" @click="navigateToHuiShouZhan">
        <image src="/static/image/huishouzhan.png" />
        <text>回收站</text>
      </view>
      <view class="icon-item" @click="navigateToLiuLanLiShi">
        <image src="/static/image/liulanlishi.png" />
        <text>浏览历史</text>
      </view>
      <view class="icon-item" @click="navigateToHuoDongZhongXin">
        <image src="/static/image/huodongzhongxin.png" />
        <text>活动中心</text>
      </view>
    </view>
</template>
<script setup>
const navigateToDaKa = () => {
  uni.navigateTo({url: 'common/punchcard'})
}

const navigateToChuangZuoZhongXin = () => {
  uni.navigateTo({url: 'common/无'})
}

const navigateToSaoYiSao = () => {
  // uni.navigateTo({url: 'common/sweep'})
  uni.scanCode({
  	success: function (res) {
  		console.log('条码类型：' + res.scanType);
  		console.log('条码内容：' + res.result);
  	}
  });
}

const navigateToHuiShouZhan = () => {
  uni.navigateTo({url: 'common/recyclebin'})
}

const navigateToLiuLanLiShi = () => {
  uni.navigateTo({url: 'common/history'})
}

const navigateToHuoDongZhongXin = () => {
  uni.navigateTo({url: 'common/activitycenter'})
}

const navigateToShuJia = () => {
  uni.navigateTo({url: 'common/shujia'})
}
</script>
<style scoped>
.icon-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  height: 100%;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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