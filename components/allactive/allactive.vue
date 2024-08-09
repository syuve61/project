<template>
	<view class="allactive">
		<view class="active" v-for="activeItem in activeItems" :key="activeItem.id">
			<view class="colunm">
				<view class="row">
					<text>{{ activeItem.title }}</text>
					<image src="../../static/image/right.png" class="right" mode=""></image>
				</view>
				<text class="row2">{{ activeItem.description }}</text>
			</view>
			<image class="activeimage" :src="activeItem.imageUrl" alt="Active Image"></image>
		</view>
	</view>
</template>

<script setup>
	const activeItems = [{
			id: 1,
			title: '龍族少年',
			description: '大年初一，巨龙降临',
			imageUrl: '../../static/image/lzsn.jpg'
		},
		{
			id: 2,
			title: '青春不散场',
			description: '六月毕业季',
			imageUrl: '../../static/image/qcbsc.jpg'
		},
		{
			id: 3,
			title: '万圣夜一起搞鬼',
			description: '一起鬼混',
			imageUrl: '../../static/image/wsygg.jpg'
		},
		{
			id: 4,
			title: '万卷有益在人间',
			description: '读万卷书，闻千里河山',
			imageUrl: '../../static/image/wjyyzrj.jpg'
		},
	];
</script>

<style scoped1>
	.allactive{
		padding: 10rpx 0;
		background-color: #f4f4f4;
	}
	.colunm{
		display: flex;
		flex-direction: column;
	}
	/* Add your custom styling for the active items here */
	.active {
		margin: 20rpx 0rpx;
		background-color: #ffffff;
		padding: 20rpx 10rpx;
	}
	.row{
		display: flex;
		flex-direction: row;
		width: 100%;
		margin: 5rpx 0;
		font-size: 16px;
		font-weight: 600;
	}
	.right{
		height: 40rpx;
		width: 40rpx;
		display: flex;
		margin-left: auto;
	}
	.activeimage{
		width: 100%;
		/* height: 100%; */
		border-radius: 5px;
		object-fit: contain;  /* 新添加的代码 */
	}
	.row2{
		margin: 5rpx 0;
		font-size: 12px;
		color: #c9c9c9;
	}
</style>