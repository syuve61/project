"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_PostHead2 = common_vendor.resolveComponent("PostHead");
  const _easycom_PostArticle2 = common_vendor.resolveComponent("PostArticle");
  (_easycom_PostHead2 + _easycom_PostArticle2)();
}
const _easycom_PostHead = () => "../../components/PostHead/PostHead.js";
const _easycom_PostArticle = () => "../../components/PostArticle/PostArticle.js";
if (!Math) {
  (_easycom_PostHead + _easycom_PostArticle)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const progress = common_vendor.ref(0);
    const downloadStatus = common_vendor.ref("notStarted");
    common_vendor.ref(false);
    const files = common_vendor.reactive({
      name: "",
      size: ""
    });
    const isfiles = common_vendor.ref(false);
    const postData = common_vendor.ref(null);
    const isInputFocused = common_vendor.ref(false);
    const handleFocus = () => {
      isInputFocused.value = true;
    };
    const handleBlur = () => {
      isInputFocused.value = false;
    };
    const handleSend = () => {
      console.log("！！");
    };
    const download = (file) => {
      downloadStatus.value = "inProgress";
      const postId = postData.value.postId;
      console.log(postId);
      console.log(postId);
      const downloadTask = common_vendor.index.downloadFile({
        url: `http://127.0.0.1:8080/myland/download/${postId}`,
        success: (res) => {
          const savePath = `${common_vendor.wx$1.env.USER_DATA_PATH}/${file.name}`;
          common_vendor.index.getFileSystemManager().saveFile({
            tempFilePath: res.tempFilePath,
            filePath: savePath,
            success: (res2) => {
              downloadStatus.value = "completed";
              console.log("保存成功", res2.savedFilePath);
              console.log("保存路径:", savePath);
              saveFileNameToLocal(file.name);
            },
            fail: (err) => {
              downloadStatus.value = "notStarted";
              console.log("保存失败", err);
            }
          });
        },
        fail: (err) => {
          downloadStatus.value = "notStarted";
          console.log("下载失败", err);
        }
      });
      downloadTask.onProgressUpdate((res) => {
        progress.value = Math.floor(res.totalBytesWritten / file.size * 100);
        console.log(`下载进度: ${progress.value}%`);
      });
    };
    const saveFileNameToLocal = (fileName) => {
      try {
        let fileNames = common_vendor.wx$1.getStorageSync("fileNames") || [];
        if (!Array.isArray(fileNames)) {
          fileNames = [];
        }
        if (!fileNames.includes(fileName)) {
          fileNames.push(fileName);
          common_vendor.wx$1.setStorageSync("fileNames", fileNames);
          console.log("文件名保存到本地缓存:", fileNames);
        } else {
          console.log("文件名已经存在于本地缓存:", fileName);
        }
      } catch (err) {
        console.error("保存文件名到本地缓存失败:", err);
      }
    };
    const getFileSize = (fileSize) => {
      let size = fileSize / 1024;
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
    const fetchPostData = (postId) => {
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/myland/detail",
        method: "POST",
        data: {
          postId
        },
        success: (res) => {
          postData.value = res.data[0];
          if (res.data[0].filename && res.data[0].filesize) {
            files.name = res.data[0].filename;
            files.size = res.data[0].filesize;
            isfiles.value = true;
          } else {
            files.name = "";
            files.size = "";
            isfiles.value = false;
          }
          console.log(files.name);
          console.log(files.size);
          console.log(postData.value);
        },
        fail: (error) => {
          console.error("错误", error);
        }
      });
    };
    common_vendor.onMounted(() => {
      const postId = getCurrentPages()[1].options.postId;
      if (postId) {
        let history = common_vendor.index.getStorageSync("browseHistory") || [];
        const index = history.findIndex((item) => item === postId);
        if (index !== -1) {
          history.splice(index, 1);
        }
        history.unshift(postId);
        common_vendor.index.setStorageSync("browseHistory", history);
        fetchPostData(postId);
      }
    });
    const parsedImages = common_vendor.computed(() => {
      if (postData.value && typeof postData.value.image === "string") {
        try {
          return JSON.parse(postData.value.image);
        } catch (e) {
          console.error("error", e);
          return [];
        }
      }
      return [];
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: postData.value
      }, postData.value ? {
        b: common_vendor.p({
          avatar: postData.value.avatar,
          name: postData.value.name
        })
      } : {}, {
        c: postData.value
      }, postData.value ? {
        d: common_vendor.p({
          title: postData.value.title,
          content: postData.value.content
        })
      } : {}, {
        e: postData.value && common_vendor.unref(parsedImages).length > 0
      }, postData.value && common_vendor.unref(parsedImages).length > 0 ? {
        f: common_vendor.f(common_vendor.unref(parsedImages), (img, index, i0) => {
          return {
            a: img,
            b: index
          };
        })
      } : {}, {
        g: isfiles.value
      }, isfiles.value ? common_vendor.e({
        h: getIcon(files.name),
        i: common_vendor.t(files.name),
        j: common_vendor.t(getFileSize(files.size)),
        k: downloadStatus.value === "notStarted"
      }, downloadStatus.value === "notStarted" ? {
        l: common_vendor.o(($event) => download(files))
      } : downloadStatus.value === "inProgress" ? {
        n: common_vendor.t(progress.value)
      } : downloadStatus.value === "completed" ? {} : {}, {
        m: downloadStatus.value === "inProgress",
        o: downloadStatus.value === "completed"
      }) : {}, {}, {
        p: common_vendor.o(handleFocus),
        q: common_vendor.o(handleBlur),
        r: !isInputFocused.value
      }, !isInputFocused.value ? {} : {
        s: common_vendor.o(handleSend)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/project/pages/detail/index.vue"]]);
wx.createPage(MiniProgramPage);
