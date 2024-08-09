<template>
  <view class="article">
	  <view class="title">
	  	{{title}}
	  </view>
	  <view class="content">
	  	{{ content }}
	  </view>
  </view>
</template>

<script setup>
	import { defineProps } from 'vue'
	const props = defineProps(['title','content'])
</script>

<style scoped>
.article {
  padding: 10px;
}
.title{
	font-weight: bold;
}
.content{
	
}
</style>