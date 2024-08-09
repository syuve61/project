<template>
  <view class="container">
    <view v-for="(item, index) in menuList" :key="index" class="nav-item" :class="{ active: currentMenu === index }" @tap="switchTab(index)">
      <image :src="item.icon" alt="" />
      <p>{{ item.name }}</p>
    </view>
  </view>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const menuList = ref([
  { name: '通知', icon: '/static/image/tongzhi.png' },
  { name: '@我的', icon: '/static/image/@.png' },
  { name: '点赞', icon: '/static/image/dianzan.png' },
  { name: '聊天', icon: '/static/image/huifu.png' },
  // ...更多菜单项
]);

const currentMenu = ref(0);

const emit = defineEmits(['update']);

const switchTab = (index) => {
  currentMenu.value = index;
  emit('update', index); // 触发一个名为'update'的事件，并传递新的索引作为参数
};
</script>

<style scoped>
.container {
  margin-top: 30rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 48px;
}

.nav-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 30rpx;
}

.nav-item image {
  width: 60rpx;
  height: 60rpx;
  border-radius: 50%;
}

.active {
  color: #55aaff;
  font-weight: bold;
}
</style>
