<template>
	<div class="footer">
		<view class="likeNum" @click.prevent.self="like">
			<image :src="likeIcon" alt="点赞" />
			{{ localLikeNum }}
		</view>
		<view class="commentNum" @click.prevent.self="comment">
			<image :src="commentIcon" alt="评论" />
			{{ commentNum }}
		</view>
		<view class="fenxiang" @click.prevent.self="share">
			<image :src="shareIcon" alt="分享" />
			分享
		</view>
	</div>
</template>

<script setup>
	import { ref, defineProps } from 'vue'
	
	const props = defineProps(['commentNum', 'likeNum'])
	const likeIcon = ref('/static/image/icon.png')
	const commentIcon = ref('/static/image/pinglun.png')
	const shareIcon = ref('/static/image/fenxiang.png')
	const localLikeNum = ref(props.likeNum) // 使用props的值初始化本地的ref

	const isLiked = ref(false)

	const like = () => {
		isLiked.value = !isLiked.value
		if (isLiked.value) {
			likeIcon.value = '/static/image/iconclick.png'
			localLikeNum.value++
		} else {
			likeIcon.value = '/static/image/icon.png'
			localLikeNum.value--
		}
	}

	const comment = () => {
		uni.showToast({
			title: '已评论',
			icon: 'none'
		})
	}

	const share = () => {
		uni.showToast({
			title: '已分享',
			icon: 'none'
		})
	}
</script>

<style scoped>
	.footer {
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		font-size: 14px;
	}

	.footer image {
		width: 30rpx;
		height: 30rpx;
		cursor: pointer;
		object-fit: contain;
	}

	.footer view {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10rpx;
		color: #c8c8c8;
		flex-grow: 1;
		align-self: stretch;
	}

	.likeNum {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10rpx;
	}

	.commentNum {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10rpx;
	}

	.fenxiang {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10rpx;
	}
</style>
