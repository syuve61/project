<template>
  <view class="page">
    <view class="search_header">
      <view class="search">
        <image src="/static/image/sousuo.png" mode="" class="search_image"></image>
        <input 
          v-model="searchQuery" 
          type="text" 
          class="input_search" 
          placeholder="大家都在搜..." 
          @focus="handleFocus" 
          @blur="handleBlur" 
        />
      </view>
      <view class="search_btn" @click="search">
        搜索
      </view>
    </view>
    <!-- 这个才是控制显示开关的盒子 -->
    <view v-if="showSuggestions || !hasSearched" class="suggestions-box">
      <view v-if="searchHistory.length > 0" class="history">
        搜索历史
      </view>
      <view v-if="searchHistory.length > 0" class="suggestions">
        <view v-for="item in searchHistory" :key="item" class="suggestion-item" @click="fillInput(item)">
          {{ item }}
        </view>
      </view>
      <view class="discover">
        搜索发现
      </view>
      <view class="suggestions">
        <view v-for="item in discoveries" :key="item" class="suggestion-item" @click="fillInput(item)">
          {{ item }}
        </view>
      </view>
    </view>
    <SearchResults :posts="searchResults" v-if="searchResults.length > 0 && !showSuggestions" />
  </view>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');
const searchResults = ref([]);
const searchHistory = ref([]);
const showSuggestions = ref(false);
const hasSearched = ref(false);

const suggestions = ref([
  '看什么动漫',
  '最新热书',
  '全职法师',
]);

const discoveries = ref([
  '星露谷物语',
  '泰拉瑞亚',
  '文明VI',
  '原神',
  '进击的巨人',
  '鬼灭之刃',
  '火影忍者',
  '蜡笔小新',
  '全职法师',
  '遮天',
  '完美世界',
  '沧元图'
]);

const fillInput = (item) => {
  searchQuery.value = item;
};

const handleFocus = () => {
  showSuggestions.value = true;
};

const handleBlur = () => {
  if (hasSearched.value) {
    setTimeout(() => {
      showSuggestions.value = false;
    }, 200);
  }
};

const search = async () => {
  console.log('搜索内容:', searchQuery.value);
  
  // 添加搜索历史
  if (searchQuery.value && !searchHistory.value.includes(searchQuery.value)) {
    searchHistory.value.unshift(searchQuery.value);
  }

  uni.request({
    url: 'http://127.0.0.1:8080/myland/index', // 替换为实际接口地址
    method: 'POST',
    data: {
      word: searchQuery.value // 使用 word 作为参数字段
    },
    success: (res) => {
      searchResults.value = res.data;
      setTimeout(() => {
        showSuggestions.value = false;
      }, 0); // 确保响应式更新
      hasSearched.value = true;
    },
    fail: (err) => {
      console.error('请求失败:', err);
    }
  });
};
</script>

<style scoped>
.page {
  padding: 20rpx;
}

.search_header {
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.search {
  display: flex;
  align-items: center;
  border-radius: 50px;
  border: 1rpx solid black;
  width: 80vw;
  height: 60rpx;
}

.search_btn {
  margin: 20rpx;
  color: #01bcff;
}

.search_image {
  margin: 0 15rpx;
  height: 50rpx;
  width: 50rpx;
}

.input_search {
  height: 50rpx;
  width: 80%; /* 让输入框撑满可用空间 */
  border: none; /* 移除默认的边框 */
  outline: none; /* 移除默认的聚焦样式 */
}

.suggestions-box {
  display: flex;
  flex-direction: column;
}

.suggestions {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 10rpx;
}

.suggestion-item {
  background-color: #f2f2f2;
  padding: 10rpx;
  border-radius: 10rpx;
}

.history,
.discover {
  margin: 20rpx 0;
  font-weight: bold;
}
</style>
