<template>
  <view class="Post">
    <PostHead v-if="postData" :avatar="postData.avatar" :name="postData.name" :userId="postData.userId" :postId="postData.postid"></PostHead>
    <PostArticle v-if="postData" :title="postData.title" :content="postData.content"></PostArticle>
    <PostImage v-if="postData && postData.image!==null" :image="postData.image"></PostImage>
    <PostFooter v-if="postData" :likeNum="postData.likeNum" :commentNum="postData.commentNum"></PostFooter>
  </view>
  <!-- <button @click="ces">测试子组件postdata</button> -->
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  postData: Object, // 定义一个名为 postData 的 prop，类型为 Object
});
// const ces = () => {
//   console.log(JSON.parse(JSON.stringify(props))); // 正确打印传递的 postData
// };
</script>

<style scoped>
.Post{
	margin: 15rpx;
	background-color: #ffffff;
	border-radius: 5px;
	padding: 5rpx;
}
</style>