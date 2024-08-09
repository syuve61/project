<template>
  <view>
    <view class="download_file">
      <image class="allfile" src="/static/image/Folder.png" mode=""></image>
      <view class="allname">
        下载的文件
      </view>
    </view>
    <view v-for="(file, index) in files" :key="index" class="File">
      <image :src="getIcon(file.name)" class="file-icon" />
	  <view class="column">
	  	<view @click="openFile(file.path)">{{ file.name }}</view>
	  	<view>{{ getFileSize(file.size) }}</view>
	  </view>
	  <view class="leftauto" @click="openFile(file.path)">
	  	打开
	  </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 定义响应式变量来存储文件信息
const files = ref([]);

const getFileSize = (fileSize) => {
  if (isNaN(fileSize)) {
    return '未知大小';
  }
  // 将文件大小转换为 KB 或 MB
  let size = parseFloat(fileSize) / 1024;
  if (size > 1024) {
    size = size / 1024;
    return size.toFixed(2) + ' MB';
  } else {
    return size.toFixed(2) + ' KB';
  }
};

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

const fetchFileInfoFromLocal = () => {
  try {
    const fileNames = wx.getStorageSync('fileNames') || [];
    console.log('读取到的文件名:', fileNames);
    if (Array.isArray(fileNames)) {
      // 遍历文件名，获取每个文件的详细信息
      fileNames.forEach(fileName => {
        const filePath = `http://usr/${fileName}`; // 修改路径根据实际情况
        wx.getFileInfo({
          filePath: filePath,
          success: function (res) {
            files.value.push({
              name: fileName,
              size: res.size,
              path: filePath
            });
            console.log(`文件信息: ${fileName} - 大小: ${res.size}`);
          },
          fail: function (err) {
            console.error(`获取文件信息失败: ${fileName}`, err);
          }
        });
      });
    } else {
      console.error('读取的文件名格式不正确:', fileNames);
    }
  } catch (err) {
    console.error('读取本地缓存中的文件名失败:', err);
  }
};

const openFile = (filePath) => {
  wx.openDocument({
    filePath: filePath,
    success: function (res) {
      console.log('打开文件成功:', res);
    },
    fail: function (err) {
      console.error('打开文件失败:', err);
    }
  });
};

onMounted(() => {
  fetchFileInfoFromLocal();
});
</script>

<style>
/* 添加你的样式 */
.File {
	background-color: #d9d9d9;
  margin: 10rpx;
  display: flex;
  align-items: center;
  padding: 10rpx;
}

.download_file {
  display: flex;
  align-items: center;
  
}

.allfile {
  height: 80rpx;
  width: 80rpx;
}

.allname {
  font-weight: bold;
  margin-left: 10rpx;
}

.file-icon {
  height: 40rpx;
  width: 40rpx;
  margin-right: 10rpx;
}
.column{
	display: flex;
	flex-direction: column;
}
.leftauto{
	margin-left: auto;
	margin-right: 20rpx;
}
view {
}
</style>
