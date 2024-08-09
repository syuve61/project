<template>
  <view class="container">
	{{store.testData}}
    <scroll-view class="nav-menu" scroll-x="true">
      <view
        v-for="(item, index) in menuList"
        :key="index"
        class="nav-item"
        :class="{ active: item.isActive }"
        @tap="switchTab(index)"
      >
        {{ item.name }}
      </view>
    </scroll-view>
  </view>
</template>

<script setup>
import { ref, defineEmits, onMounted } from 'vue';
import { useStore } from 'pinia'
// const store = useStore()

const emit = defineEmits(['switchTab']);

const menuList = ref([
  { name: '全部', isActive: true },
  { name: '动漫', isActive: false },
  { name: '阅读', isActive: false },
  { name: '游戏', isActive: false },
  // ...更多菜单项
]);

const switchTab = (index) => {
	console.log(index)
  // 更新 .active 类
  menuList.value.forEach((item) => {
    item.isActive = false;
  });
  menuList.value[index].isActive = true;

  // 执行切换标签页的逻辑
  // ...

  // 发送请求并触发事件传递数据给父组件
  fetchData(index);
};

const fetchData = (index) => {
  wx.request({
    url: 'http://127.0.0.1:8080/myland/index',
    method: 'POST',
    data: {
      index: index||'0',
    },
    success: (res) => {
      console.log(res.data);
      // 触发事件向父组件传递数据
      emit('switchTab', res.data);
    },
    fail: (error) => {
      console.error('获取数据失败:', error);
    }
  });
};
onMounted(() => {
	fetchData()
})
</script>

<style scoped>
.container {
  background-color: #ffffff;
}

.nav-menu {
  margin-top: 10rpx;
  white-space: nowrap;
  width: 100%;
  padding: 0 20rpx;
}

.nav-item {
  margin: 3rpx 0;
  display: inline-block;
  padding: 5px 10px;
  margin-right: 10px;
  border-bottom: 2px solid transparent;
}

.nav-item.active {
  font-weight: bold;
  color: #6fb1f9;
  border-bottom-color: #6fb1f9;
  border-bottom-width: 3px;
}

.nav-item image {
  width: 25rpx;
  height: 25rpx;
}
</style>
