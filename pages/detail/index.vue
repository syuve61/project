<template>
	<view class="page">
		<view class="Test">
			<PostHead v-if="postData" :avatar="postData.avatar" :name="postData.name"></PostHead>
			<PostArticle v-if="postData" :title="postData.title" :content="postData.content"></PostArticle>
			<!-- v-for渲染图片，保证图片的宽度为100% -->
			<view class="post-images" v-if="postData && parsedImages.length > 0">
				<view v-for="(img, index) in parsedImages" :key="index" class="post-image">
					<image :src="img" mode="aspectFill" class="post_image"></image>
				</view>
			</view>
			<!-- 输入框，评论框，点赞框，收藏框 -->
		</view>
	</view>
	<!-- 文件模块 -->
	<view v-if="isfiles" class="file-info-box">
		<view class="file-info">
			<image class="file_image" :src="getIcon(files.name)" />
			<view class="file_column">
				<text class="file_name">{{ files.name }}</text>
				<text class="file_size">{{ getFileSize(files.size) }}</text>
			</view>
			<view class="downloadfile">
				<view v-if="downloadStatus === 'notStarted'">
					<view @click="download(files)" class="download">
						<image class="download" src="../../static/image/download.png" mode=""></image>
					</view>
				</view>
				<view v-else-if="downloadStatus === 'inProgress'">
					<view class="downloading">{{ progress }}%</view>
					<!-- <image class="download" src="../../static/image/download.png" mode=""></image> -->
				</view>
				<view v-else-if="downloadStatus === 'completed'">
					<image class="download" src="../../static/image/Folder.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
	<view class="background_image">
		<view class="comment">全部评论</view>
		<view v-if="true" class="back_comment">暂无评论</view>
	</view>
	<!-- 底部 -->
	<view class="post-footer">
		<!-- 这里放置你的输入框和功能按钮 -->
		<view class="left_input">
			<input type="text" class="footer_input" placeholder="发表你的看法" @focus="handleFocus" @blur="handleBlur" />
		</view>
		<template v-if="!isInputFocused">
			<view class="icon_image">
				<image class="input_image" src="/static/image/icon.png" mode=""></image>
				<image class="input_image" src="/static/image/pinglun.png" mode=""></image>
			</view>
		</template>
		<template v-else>
			<view class="send">
				<view class="send_button" @click="handleSend">发送</view>
			</view>
		</template>
	</view>
	<!-- <button class="btn" @click="cs">测试</button> -->
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		computed
	} from 'vue';

	const progress = ref(0);
	const downloadStatus = ref('notStarted'); // 下载状态：未开始、下载中、已完成
	const showImage = ref(false);
	const files = reactive({
		name: '',
		size: ''
	});
	const isfiles = ref(false)
	const postData = ref(null);
	const isInputFocused = ref(false);

	const cs = () => {
		console.log(files)
	}
	const handleFocus = () => {
		isInputFocused.value = true;
	};

	const handleBlur = () => {
		isInputFocused.value = false;
	};

	const handleSend = () => {
		console.log('！！');
	};

	const download = (file) => {
		downloadStatus.value = 'inProgress';
		const postId = postData.value.postId;
		console.log(postId)
		console.log(postId)
		const downloadTask = uni.downloadFile({
			url: `http://127.0.0.1:8080/myland/download/${postId}`,
			success: (res) => {
				const savePath = `${wx.env.USER_DATA_PATH}/${file.name}`; // 设置保存路径
				uni.getFileSystemManager().saveFile({
					tempFilePath: res.tempFilePath,
					filePath: savePath,
					success: (res) => {
						downloadStatus.value = 'completed';
						console.log('保存成功', res.savedFilePath);
						console.log('保存路径:', savePath);
						saveFileNameToLocal(file.name);
					},
					fail: (err) => {
						downloadStatus.value = 'notStarted';
						console.log('保存失败', err);
					}
				});
			},
			fail: (err) => {
				downloadStatus.value = 'notStarted';
				console.log('下载失败', err);
			}
		});

		downloadTask.onProgressUpdate((res) => {
			progress.value = Math.floor((res.totalBytesWritten / file.size) * 100);
			console.log(`下载进度: ${progress.value}%`);
		});
	};
	const saveFileNameToLocal = (fileName) => {
		try {
			let fileNames = wx.getStorageSync('fileNames') || [];
			if (!Array.isArray(fileNames)) {
				fileNames = [];
			}
			if (!fileNames.includes(fileName)) { // 检查是否已经存在
				fileNames.push(fileName);
				wx.setStorageSync('fileNames', fileNames);
				console.log('文件名保存到本地缓存:', fileNames);
			} else {
				console.log('文件名已经存在于本地缓存:', fileName);
			}
		} catch (err) {
			console.error('保存文件名到本地缓存失败:', err);
		}
	};

	const getFileSize = (fileSize) => {
		// console.log(fileSize)
		let size = fileSize / 1024;
		if (size > 1024) {
			size = size / 1024;
			return size.toFixed(2) + ' MB';
		} else {
			return size.toFixed(2) + ' KB';
		}
	};

	const getIcon = (fileName) => {
		// console.log(fileName)
		const ext = fileName.split('.').pop().toLowerCase();
		let icon = '';
		switch (ext) {
			case 'doc':
			case 'docx':
				icon = '/static/image/Word.png';
				break;
			case 'ppt':
			case 'pptx':
				icon = '/static/image/PPT.png';
				break;
			case 'xls':
			case 'xlsx':
				icon = '/static/image/Excel.png';
				break;
			case 'zip':
			case 'rar':
				icon = '/static/image/Zip.png';
				break;
			default:
				icon = '/static/image/commonfile.png';
		}
		return icon;
	};
	// 初始页面请求
	const fetchPostData = (postId) => {
		uni.request({
			url: 'http://127.0.0.1:8080/myland/detail',
			method: 'POST',
			data: {
				postId: postId
			},
			success: (res) => {
				postData.value = res.data[0];
				if (res.data[0].filename && res.data[0].filesize) {
					files.name = res.data[0].filename; // 更新对象的属性
					files.size = res.data[0].filesize; // 更新对象的属性
					isfiles.value = true;
				} else {
					files.name = ''; // 确保在没有文件时属性被清空
					files.size = ''; // 确保在没有文件时属性被清空
					isfiles.value = false;
				}
				// 前上后下
				// postData.value = res.data;
				// if (res.data.filename && res.data.filesize) {
				// 	files.name = res.data.filename; // 更新对象的属性
				// 	files.size = res.data.filesize; // 更新对象的属性
				// 	isfiles.value = true;
				// } else {
				// 	files.name = ''; // 确保在没有文件时属性被清空
				// 	files.size = ''; // 确保在没有文件时属性被清空
				// 	isfiles.value = false;
				// }
				// 这块是打印不需要注释
				console.log(files.name);
				console.log(files.size);
				console.log(postData.value)
			},
			fail: (error) => {
				console.error('错误', error);
			}
		});
	};

onMounted(() => {
    const postId = getCurrentPages()[1].options.postId;
    
    if (postId) {
        // 获取本地缓存的浏览历史
        let history = uni.getStorageSync('browseHistory') || [];
        
        // 检查是否已有相同的 postId
        const index = history.findIndex(item => item === postId);
        if (index !== -1) {
            // 如果有相同的 postId，删除旧的
            history.splice(index, 1);
        }
        
        // 将新的 postId 插入到第一个位置
        history.unshift(postId);
        
        // 更新本地缓存
        uni.setStorageSync('browseHistory', history);
        
        fetchPostData(postId);
    }
});

	const parsedImages = computed(() => {
		if (postData.value && typeof postData.value.image === 'string') {
			try {
				return JSON.parse(postData.value.image);
			} catch (e) {
				console.error('error', e);
				return [];
			}
		}
		return [];
	});
</script>

<!-- //后端用这个
	// const parsedImages = computed(() => {
	// 	if (postData.value && typeof postData.value.image === 'string') {
	// 		try {
	// 			return JSON.parse(postData.value.image);
	// 		} catch (e) {
	// 			console.error('Failed to parse image JSON:', e);
	// 			return [];
	// 		}
	// 	} else {
	// 		console.log("不解析")
	// 		return postData.value.image;
	// 	}
	// }); -->
<style>
	/* 样式部分可以根据需要进行调整 */
	.page {
		padding: 15px;
	}

	.post-images {
		margin-bottom: 16px;
	}

	.post-image {
		margin-bottom: 8px;
	}

	.post_image {
		width: 100%;
		border-radius: 10px;
	}

	.post-footer {
		box-sizing: border-box;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		/* 背景颜色可以根据需要调整 */
		padding: 10px;
		/* 内边距可以根据需要调整 */
		box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
		/* 阴影效果，可以根据需要调整 */
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.left_input {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.footer_input {
		width: 450rpx;
		padding: 5px 10px;
		margin: 0 10px;
		border: 1px solid #ddd;
		border-radius: 50px;
	}

	.input_image {
		width: 24px;
		height: 24px;
		display: flex;
		align-items: center;
		margin: auto;
	}

	.icon_image {
		margin: auto;
		display: flex;
		justify-content: space-around;
		align-items: center;
		gap: 20rpx;
	}

	.comment {
		font-weight: bold;
		margin-left: 20rpx;
	}

	.back_comment {
		height: 400rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		margin: auto;
	}

	.send {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 1.4rem;
		padding: 5px 10px;
	}

	.send_button {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 5px 10px;
		background-color: #007BFF;
		color: white;
		border: none;
		border-radius: 5px;
		width: 100%;
		height: 100%;
	}

	.file-info-box {
		margin: 10px 0;
	}

	.file-info {
		display: flex;
		align-items: center;
		padding: 10px;
		margin: 10rpx;
		background-color: #f2f2f2;
		border-radius: 5px;
		position: relative;
	}

	.linkUrl_image {
		position: relative;
		width: 40rpx;
		height: 40rpx;
	}

	.file_image {
		height: 80rpx;
		width: 80rpx;
	}

	.file_column {
		display: flex;
		flex-direction: column;
		gap: 10rpx;
		margin: 0 10rpx;
	}

	.file_name {
		font-size: 12px;
	}

	.file_size {
		font-size: 12px;
	}

	.downloadfile {
		position: absolute;
		display: flex;
		align-items: center;
		right: 20rpx;
	}

	.download {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
	}
	.downloading{
		display: flex;
		align-items: center;
	}
	#progress-text {
		font-size: 16px;
	}
</style>