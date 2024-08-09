<template>
  <view class="icon-container">
    <view v-for="(section, sectionIndex) in sections" :key="sectionIndex">
      <view
        class="icon-item"
        v-for="(item, index) in section.items"
        :key="index"
        @click="handleClick(item)"
      >
        <view class="text-container">
          <text>{{ item }}</text>
        </view>
        <view class="right">
          <image src="/static/image/right.png" />
        </view>
      </view>
      <view v-if="sectionIndex < sections.length - 1" class="separator"></view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';

const sections = ref([
  {
    items: ['账号资料', '安全隐私', '收货信息']
  },
  {
    items: ['画面设置', '首页推荐设置', '文件设置', '离线设置', '阅读设置']
  },
  {
    items: ['推送设置', '消息设置', '下载管理', '清理存储空间', '其他设置']
  },
  {
    items: ['定时关闭', '睡眠提醒']
  },
  {
    items: ['深色设置']
  },
  {
    items: ['我的客服', '关于漫游岛', '商务合作']
  },
  {
    items: ['用户协议', '隐私政策', '隐私权限设置', '个人信息收集清单', '第三方信息共享清单']
  }
]);

const handleClick = (item) => {
  console.log('Clicked item:', item);
};
</script>
<style scoped>
.icon-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.icon-item {
  display: flex;
  width: 100%;
  height: 100%;
  cursor: pointer;
  padding: 20rpx 0;
  border-bottom: 1px solid #e0e0e0; /* 在每个信息项下面添加细线 */
}

.icon-item:last-child {
  border-bottom: none; /* 最后一个信息项下面不需要细线 */
}

.text-container {
  display: flex;
  align-items: center;
  justify-content: flex-start; /* 文字靠右 */
  margin-left: 20rpx; /* 文字左边距 */
}

.right {
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: flex-end;
}

.right image {
  width: 40rpx;
  height: 40rpx;
  margin-right: 20rpx;
}

.separator {
  width: 100%;
  height: 20rpx;
  background-color: #f0f0f0;
}

.divider {
  width: 100%;
  height: 1rpx; /* 设置细线的厚度 */
  background-color: #e0e0e0; /* 细线的颜色 */
}
</style>
