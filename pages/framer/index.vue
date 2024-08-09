<template>
	<view class="page">
		<view class="post-page">
			<!-- 表单提交事件，阻止默认提交行为 -->
			<form @submit.prevent="submitPost">
				<view class="form-head">
					<view class="dropdown-container">
						<view class="dropdown-trigger" @click="toggleDropdown">
							{{ topic.text }}
							<image class="dropdown-icon" src="../../static/image/lei.png" mode=""></image>
						</view>
						<view class="dropdown-menu" v-show="showDropdown">
							<view class="dropdown-item" v-for="item in options" :key="item.value"
								@click="selectOption(item)">{{ item.text }}</view>
						</view>
					</view>
					<!-- 标题输入框，使用 v-model 双向绑定 title -->
					<view class="form-group">
						<input id="title" v-model="title" placeholder="请输入输入完整帖子标题(5-30个字)" @blur="checkTitleLength" />
					</view>
					<!-- 内容输入区域，使用 v-model 双向绑定 content -->
					<view class="form-grouptwo">
						<textarea class="content" @blur="checkContentLength" v-model="content" maxlength="200"
							placeholder="来吧,尽情发挥吧..."></textarea>
					</view>
				</view>
				<view class="grid-choose-image">
					<!-- 使用 v-for 指令渲染图片列表 -->
					<view v-for="(imgPath, index) in images" :key="index" class="view-image">
						<image class="choose-image" :src="imgPath" />
						<view @click="removeImage(imgPath)" class="close">
							<image class="X" src="../../static/image/X.png" mode=""></image>
						</view>
					</view>
				</view>
				<!-- 显示文件上传后缀盒子 -->
				<view v-if="files.length > 0" class="file-info-box">
					<view v-for="(file, index) in files" :key="index" class="file-info">
						<image class="file_image" :src="getIcon(file.name)" />
						<view class="file_column">
							<text class="file_name">{{ file.name }}</text>
							<text class="file_size">{{ getFileSize(file.size) }}</text>
						</view>
						<view @click="removeFile(file)" class="close">
							<image class="X" src="../../static/image/X.png" mode=""></image>
						</view>
					</view>
				</view>
				<!-- 底部工具栏，为每个图标绑定相应的事件 -->
				<!-- 插入链接的弹出文本框 -->
				<view v-show="isLinkInputVisible" class="link-popup">
					<input class="input_linkUrl" type="text" placeholder="输入链接(只能插入一条链接)" v-model="linkUrl"
						@blur="hideLinkInput" />
				</view>
				<view class="tabbar">
					<image src="../../static/image/tupian.png" mode="" @click="chooseImages"></image>
					<image class="linkUrl_image" src="../../static/image/tupian (4).png" mode="" @click="showLinkInput">
						<image v-if="linkUrl" class="tick-icon" src="../../static/image/V.png" mode=""></image>
					</image>
					<image src="../../static/image/shangchuanwenjian.png" mode="" @click="uploadFiles"></image>
				</view>
				<button form-type="submit" class="submit-button">发布</button>

				<!-- <button class="submit-button" @click="select">查询</button> -->
			</form>
		</view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref
	} from 'vue';

	const linkUrl = ref('');
	const topic = ref({
		text: '选择帖子的类型',
		value: ''
	}); //帖子类型的选择器
	const title = ref(''); //标题
	const content = ref(''); //内容
	const images = ref([]); //选择的图片
	const files = ref([]); //临时文件内容
	const userId = ref(''); //用户id
	//开关类
	const isLinkInputVisible = ref(false); //弹出插入链接开关
	const showDropdown = ref(false); //类型
	// 标题内容字数限制
	
	const getFileSize = (fileSize) => {
		// 将文件大小转换为 KB 或 MB
		let size = fileSize / 1024;
		if (size > 1024) {
			size = size / 1024;
			return size.toFixed(2) + ' MB';
		} else {
			return size.toFixed(2) + ' KB';
		}
	};
	const removeFile = (file) => {
	  // 从 files 数组中删除该文件
	  const index = files.value.indexOf(file);
	  if (index > -1) {
	    files.value.splice(index, 1);
	  }
	};
	const checkTitleLength = (e) => {
		console.log("c")
		if (e.target.value.length < 5) {
			uni.showToast({
				icon: 'none',
				title: "请填写完整!!!"
			})
		} else if (e.target.value.length > 30) {
			uni.showToast({
				icon: 'none',
				title: "超出标题字数限制!!!"
			})
		}
	};
	onMounted(() => {
		userId.value = uni.getStorageSync('userId')
		console.log(userId.value)
	})
	const getIcon = (fileName) => {
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
	const checkContentLength = (e) => {
		console.log("c")
		if (e.target.value.length < 1) {
			uni.showToast({
				icon: 'none',
				title: "请填写内容!!!"
			})
		} else if (e.target.value.length > 100) {
			uni.showToast({
				icon: 'none',
				title: "超出文章字数限制!!!"
			})
		}
	};
	// 选择topic
	const options = [{
			value: '#1',
			text: '动漫'
		},
		{
			value: '#2',
			text: '阅读'
		},
		{
			value: '#3',
			text: '游戏'
		},
	];
	// 下拉topic
	const toggleDropdown = () => {
		console.log("!");
		showDropdown.value = !showDropdown.value;
	};
	// 显示topic
	const selectOption = (item) => {
		topic.value = {
			text: item.text,
			value: item.value
		};
		showDropdown.value = false;
	};
	// 选择图片
	const chooseImages = () => {
		uni.chooseImage({
			count: 9 - images.value.length, // 默认9
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			success(res) {
				console.log(res);
				console.log(JSON.stringify(res.tempFilePaths));
				// 将获取的图片路径数组赋值给响应式变量
				images.value = [...images.value, ...res.tempFilePaths];
			}
		});
	};

	// 显示图片
	const previewImage = (imgPath) => {
		uni.previewImage({
			urls: [imgPath] // 预览当前点击的图片
		});
	};
	// 删除图片
	const removeImage = (imgPath) => {
		const index = images.value.findIndex((image) => image === imgPath);
		if (index > -1) {
			images.value.splice(index, 1);
		}
	};
	// 选择文件
	const uploadFiles = () => {
		uni.chooseMessageFile({
			count: 1, // 允许用户选择的文件数量
			type: 'file', // 选择的文件类型
			success: (res) => {
				// 保存文件信息到 uploadedFiles 状态
				console.log(res);
				files.value = res.tempFiles.map(tempFile => ({
					name: tempFile.name,
					size: tempFile.size,
					path: tempFile.path,
					type: tempFile.type
				}));
				console.log('选择的文件信息:', files.value[0]);
			}
		});
	};
	// 查看测试
	// const select = () => {
	// 	// console.log(files.value[0]),
	// 	// console.log(images.value.length)
	// 	// console.log(topic.value.value);
	// 	// console.log(title.value)
	// 	// console.log(content.value)
	// 	// console.log(linkUrl.value)
	// 	console.log(files)
	// 	console.log(files.value)
	// 	console.log(files.value.length)
	// 	console.log(images)
	// 	console.log(images.value)
	// 	console.log(images.value.length)
	// }

	// 插入链接
	const showLinkInput = () => {
		isLinkInputVisible.value = true;
		uni.nextTick(() => {
			if (linkUrl.value) {
				linkUrl.value.focus();
			} else {
				linkUrl.focus();
			}
		});
	};
	const hideLinkInput = () => {
		console.log("!");
		isLinkInputVisible.value = false;
	};
	//验证错误问题
	const showToast = (message) => {
		// Use WeChat Mini Program's wx.showToast or a similar method in your environment
		wx.showToast({
			title: message,
			icon: 'none',
			duration: 2000
		});
	};

	const validateInputs = () => {
		switch (true) {
			case !topic.value.value:
				showToast('请先选择一个帖子的类型!');
				break;
			case title.value.length < 5 || title.value.length > 30:
				showToast('标题长度必须在5到30个字符之间!');
				break;
			case content.value.length < 1 || content.value.length > 100:
				showToast('内容长度必须在1到100个字之间!');
				break;
			case !userId.value:
				uni.showModal({
					title: '提示',
					content: '当前未登录，请先登录再发布!',
					confirmText: '去登录',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							uni.navigateTo({
								url: '/pages/login/login',
							});
						} else if (res.cancel) {
							// 取消按钮的逻辑
						}
					},
				});
				break;
			default:
				return true;
		}
	};
	const submitPost = () => {
		// 验证输入是否有效
		if (!validateInputs()) {
			return;
		}

		// 显示确认提示框
		uni.showModal({
			title: '提示',
			content: '是否发布',
			showCancel: true,
			confirmText: '确定',
			success: (res) => {
				if (res.confirm) {
					// 用户点击确定按钮
					const formData = {
						title: title.value,
						content: content.value,
						theme: topic.value.value,
						userId: userId.value,
						url: linkUrl.value || ''
					};

					// 使用 Promise.all 来处理所有图片的读取和 base64 转换
					const imagePromises = images.value.map((filePath, index) => {
						return new Promise((resolve, reject) => {
							uni.getFileSystemManager().readFile({
								filePath: filePath,
								encoding: 'base64', // 将图片转换为 base64 编码
								success: function(res) {
									const base64Data = res.data;
									resolve({
										key: `image${index + 1}`,
										value: base64Data
									}); // 成功处理该图片
								},
								fail: function(error) {
									console.error(`读取第 ${index + 1} 张图片失败`,
										error);
									reject(error); // 处理失败的情况
								}
							});
						});
					});

					Promise.all(imagePromises).then((results) => {
						// 所有图片都处理完毕
						results.forEach(({
							key,
							value
						}) => {
							formData[key] = value;
						});

						// 打印所有图片的 base64 编码
						console.log(formData);
						// console.log(files.value[0].name)
						// 文件上传或直接提交
						if (files.value.length === 1) {
							// 文件上传
							console.log(files.value[0].name)
							uni.uploadFile({
								url: 'http://127.0.0.1:8080/myland/file',
								filePath: files.value[0].path,
								name: 'file', // 文件对应的 key，根据服务器端的要求修改
								formData: {
								  ...formData,
								  fileName: files.value[0].name,
								  // 如果需要，可以添加其他键值对
								},
								// fileName:files.value[0].name,
								success: (uploadFileRes) => {
									console.log("File upload success:", uploadFileRes
										.data);
									console.log("上传成功!");
									uni.showToast({
										icon: 'none',
										title: '上传成功', // 使用 title 而不是 content
										duration: 2000, // 设置显示时间
										success: () => {
											setTimeout(() => {
												uni.reLaunch({
													url: '/pages/index/index' // 重载到首页，确保路径正确
												});
											}, 2000); // 等待 2 秒后重载
										}
									});
								},
								fail: (error) => {
									console.error('文件上传失败', error);
									// 处理上传失败的情况
								},
							});
						} else {
							// 直接提交表单数据
							uni.request({
								url: 'http://127.0.0.1:8080/myland/txt',
								method: 'POST',
								data: formData, // 使用 data 传递表单数据
								success: (res) => {
									console.log("上传成功:", res.data);
									uni.showToast({
										icon: 'none',
										title: '上传成功', // 使用 title 而不是 content
										duration: 2000, // 设置显示时间
										success: () => {
											setTimeout(() => {
												uni.reLaunch({
													url: '/pages/index/index' // 重载到首页，确保路径正确
												});
											}, 1000); // 等待 2 秒后重载
										}
									});
								},
								fail: (error) => {
									console.error('上传失败', error);
									// 处理提交失败的情况
								},
							});
						}
					}).catch((error) => {
						console.error('处理图片数据出错', error);
						// 处理图片数据处理失败的情况
					});
				} else {
					console.log('用户取消发布');
				}
			},
			fail: () => {
				console.error('显示确认提示框失败');
				// 处理显示确认提示框失败的情况
			},
		});
	};
</script>

<style scoped>
	:root {
		--background-color:
			#ffffff;
		/* #ffff7f; */
		/* 测试色#ffff7f 实际色#ffffff*/
	}

	page {
		background-color: #f2f2f2;
		width: 100vw;
		height: 100vh;
	}

	.post-page {
		padding: 10px;
		background-color: #f2f2f2;
		height: 100vh;
		margin-bottom: 20rpx;
	}

	.form-group {
		border-radius: 5px;
		background-color: var(--background-color);
		margin: 40rpx 0;
		font-size: 18px;
		padding: 10rpx;
	}

	.form-grouptwo {
		height: 300rpx;
		border-radius: 10px;
		/* background-color: #ffffff; */
		font-size: 16px;
	}

	.form-actions {
		text-align: center;
	}

	.categ {
		display: flex;
		height: 60rpx;
		align-items: center;
		padding: 10rpx;
		border-radius: 10px;
		background-color: var(--background-color);
	}

	.lei {
		height: 40rpx;
		width: 40rpx;
	}

	.leit {}

	.tabbar {
		background-color: var(--background-color);
		display: flex;
		justify-content: space-between;
		height: 60rpx;
		border-radius: 10px;
		margin: 10rpx;
		padding: 10rpx;
		align-items: center;
	}

	.tabbar image {
		width: 40rpx;
		height: 40rpx;
	}

	.form-head {
		margin: 10rpx;
		border-radius: 10px;
		margin-bottom: 30rpx;
	}

	.content {
		padding: 10px;
		/* 设置内边距 */
		box-sizing: border-box;
		/* 确保 padding 不会影响盒子的总体尺寸 */
		width: 100%;
		height: 300rpx;
		border-radius: 5px;
		background-color: var(--background-color);
	}

	.grid-choose-image {
		margin: 0rpx 10rpx;
		border-radius: 10px;
		background-color: var(--background-color);
		display: grid;
		justify-content: space-between;
		row-gap: 20rpx;
		grid-template-columns: 200rpx 200rpx 200rpx;
	}

	.view-image {
		position: relative;
		margin: 10rpx;
		height: 200rpx;
	}

	.choose-image {
		border-radius: 10px;
		height: 100%;
		width: 100%;
		overflow: hidden;
		/* 隐藏超出的部分 */
	}

	.submit-button {
		margin: 40rpx 10rpx;
		border-radius: 5px;
		font-weight: 800;
	}

	.dropdown-container {
		position: relative;
		width: 100%;
	}

	.dropdown-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 10px;
		background-color: var(--background-color);
		border: 1px solid #ccc;
		border-radius: 5px;
		cursor: pointer;
	}

	.dropdown-icon {
		width: 20px;
		height: 20px;
		margin-left: 5px;
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		background-color: #ffffff;
		box-shadow: 0px 0px 10px #ccc;
		z-index: 20;
	}

	.dropdown-item {
		padding: 10px;
		cursor: pointer;
	}

	.dropdown-item:hover {
		background-color: #f5f5f5;
	}

	.close {
		position: absolute;
		top: 0;
		right: 0;
	}

	.X {
		height: 30rpx;
		width: 30rpx;
		border-radius: 50%;
	}

	.link-popup {

		/* 这里可以添加你的弹出层的样式 */
	}

	.V {}

	.input_linkUrl {
		border-radius: 5px;
		margin: 0 10rpx;
		height: 30px;
		background: white;
		border: 1px solid #f2f2f2;
		padding: 0 5rpx;
	}

	.tick-icon {
		width: 20px;
		height: 20px;
		position: absolute;
		top: -10px;
		right: -10px;
	}

	.file-info-box {
		margin: 10px 0;
	}

	.file-info {
		display: flex;
		align-items: center;
		padding: 10px;
		margin: 0 10rpx 10rpx 10rpx;
		background-color: #ffffff;
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
</style>