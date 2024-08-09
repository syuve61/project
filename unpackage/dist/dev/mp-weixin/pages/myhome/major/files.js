"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "files",
  setup(__props) {
    const files = common_vendor.ref([]);
    const getFileSize = (fileSize) => {
      if (isNaN(fileSize)) {
        return "未知大小";
      }
      let size = parseFloat(fileSize) / 1024;
      if (size > 1024) {
        size = size / 1024;
        return size.toFixed(2) + " MB";
      } else {
        return size.toFixed(2) + " KB";
      }
    };
    const getIcon = (fileName) => {
      const ext = fileName.split(".").pop().toLowerCase();
      let icon = "";
      switch (ext) {
        case "doc":
        case "docx":
          icon = "/static/image/Word.png";
          break;
        case "ppt":
        case "pptx":
          icon = "/static/image/PPT.png";
          break;
        case "xls":
        case "xlsx":
          icon = "/static/image/Excel.png";
          break;
        case "zip":
        case "rar":
          icon = "/static/image/Zip.png";
          break;
        default:
          icon = "/static/image/commonfile.png";
      }
      return icon;
    };
    const fetchFileInfoFromLocal = () => {
      try {
        const fileNames = common_vendor.wx$1.getStorageSync("fileNames") || [];
        console.log("读取到的文件名:", fileNames);
        if (Array.isArray(fileNames)) {
          fileNames.forEach((fileName) => {
            const filePath = `http://usr/${fileName}`;
            common_vendor.wx$1.getFileInfo({
              filePath,
              success: function(res) {
                files.value.push({
                  name: fileName,
                  size: res.size,
                  path: filePath
                });
                console.log(`文件信息: ${fileName} - 大小: ${res.size}`);
              },
              fail: function(err) {
                console.error(`获取文件信息失败: ${fileName}`, err);
              }
            });
          });
        } else {
          console.error("读取的文件名格式不正确:", fileNames);
        }
      } catch (err) {
        console.error("读取本地缓存中的文件名失败:", err);
      }
    };
    const openFile = (filePath) => {
      common_vendor.wx$1.openDocument({
        filePath,
        success: function(res) {
          console.log("打开文件成功:", res);
        },
        fail: function(err) {
          console.error("打开文件失败:", err);
        }
      });
    };
    common_vendor.onMounted(() => {
      fetchFileInfoFromLocal();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(files.value, (file, index, i0) => {
          return {
            a: getIcon(file.name),
            b: common_vendor.t(file.name),
            c: common_vendor.o(($event) => openFile(file.path), index),
            d: common_vendor.t(getFileSize(file.size)),
            e: common_vendor.o(($event) => openFile(file.path), index),
            f: index
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/project/pages/myhome/major/files.vue"]]);
wx.createPage(MiniProgramPage);
