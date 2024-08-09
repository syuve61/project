"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const linkUrl = common_vendor.ref("");
    const topic = common_vendor.ref({
      text: "选择帖子的类型",
      value: ""
    });
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
    const images = common_vendor.ref([]);
    const files = common_vendor.ref([]);
    const userId = common_vendor.ref("");
    const isLinkInputVisible = common_vendor.ref(false);
    const showDropdown = common_vendor.ref(false);
    const getFileSize = (fileSize) => {
      let size = fileSize / 1024;
      if (size > 1024) {
        size = size / 1024;
        return size.toFixed(2) + " MB";
      } else {
        return size.toFixed(2) + " KB";
      }
    };
    const removeFile = (file) => {
      const index = files.value.indexOf(file);
      if (index > -1) {
        files.value.splice(index, 1);
      }
    };
    const checkTitleLength = (e) => {
      console.log("c");
      if (e.target.value.length < 5) {
        common_vendor.index.showToast({
          icon: "none",
          title: "请填写完整!!!"
        });
      } else if (e.target.value.length > 30) {
        common_vendor.index.showToast({
          icon: "none",
          title: "超出标题字数限制!!!"
        });
      }
    };
    common_vendor.onMounted(() => {
      userId.value = common_vendor.index.getStorageSync("userId");
      console.log(userId.value);
    });
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
    const checkContentLength = (e) => {
      console.log("c");
      if (e.target.value.length < 1) {
        common_vendor.index.showToast({
          icon: "none",
          title: "请填写内容!!!"
        });
      } else if (e.target.value.length > 100) {
        common_vendor.index.showToast({
          icon: "none",
          title: "超出文章字数限制!!!"
        });
      }
    };
    const options = [
      {
        value: "#1",
        text: "动漫"
      },
      {
        value: "#2",
        text: "阅读"
      },
      {
        value: "#3",
        text: "游戏"
      }
    ];
    const toggleDropdown = () => {
      console.log("!");
      showDropdown.value = !showDropdown.value;
    };
    const selectOption = (item) => {
      topic.value = {
        text: item.text,
        value: item.value
      };
      showDropdown.value = false;
    };
    const chooseImages = () => {
      common_vendor.index.chooseImage({
        count: 9 - images.value.length,
        // 默认9
        sizeType: ["original", "compressed"],
        // 可以指定是原图还是压缩图，默认二者都有
        success(res) {
          console.log(res);
          console.log(JSON.stringify(res.tempFilePaths));
          images.value = [...images.value, ...res.tempFilePaths];
        }
      });
    };
    const removeImage = (imgPath) => {
      const index = images.value.findIndex((image) => image === imgPath);
      if (index > -1) {
        images.value.splice(index, 1);
      }
    };
    const uploadFiles = () => {
      common_vendor.index.chooseMessageFile({
        count: 1,
        // 允许用户选择的文件数量
        type: "file",
        // 选择的文件类型
        success: (res) => {
          console.log(res);
          files.value = res.tempFiles.map((tempFile) => ({
            name: tempFile.name,
            size: tempFile.size,
            path: tempFile.path,
            type: tempFile.type
          }));
          console.log("选择的文件信息:", files.value[0]);
        }
      });
    };
    const showLinkInput = () => {
      isLinkInputVisible.value = true;
      common_vendor.index.nextTick(() => {
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
    const showToast = (message) => {
      common_vendor.wx$1.showToast({
        title: message,
        icon: "none",
        duration: 2e3
      });
    };
    const validateInputs = () => {
      switch (true) {
        case !topic.value.value:
          showToast("请先选择一个帖子的类型!");
          break;
        case (title.value.length < 5 || title.value.length > 30):
          showToast("标题长度必须在5到30个字符之间!");
          break;
        case (content.value.length < 1 || content.value.length > 100):
          showToast("内容长度必须在1到100个字之间!");
          break;
        case !userId.value:
          common_vendor.index.showModal({
            title: "提示",
            content: "当前未登录，请先登录再发布!",
            confirmText: "去登录",
            cancelText: "取消",
            success: (res) => {
              if (res.confirm) {
                common_vendor.index.navigateTo({
                  url: "/pages/login/login"
                });
              } else if (res.cancel)
                ;
            }
          });
          break;
        default:
          return true;
      }
    };
    const submitPost = () => {
      if (!validateInputs()) {
        return;
      }
      common_vendor.index.showModal({
        title: "提示",
        content: "是否发布",
        showCancel: true,
        confirmText: "确定",
        success: (res) => {
          if (res.confirm) {
            const formData = {
              title: title.value,
              content: content.value,
              theme: topic.value.value,
              userId: userId.value,
              url: linkUrl.value || ""
            };
            const imagePromises = images.value.map((filePath, index) => {
              return new Promise((resolve, reject) => {
                common_vendor.index.getFileSystemManager().readFile({
                  filePath,
                  encoding: "base64",
                  // 将图片转换为 base64 编码
                  success: function(res2) {
                    const base64Data = res2.data;
                    resolve({
                      key: `image${index + 1}`,
                      value: base64Data
                    });
                  },
                  fail: function(error) {
                    console.error(
                      `读取第 ${index + 1} 张图片失败`,
                      error
                    );
                    reject(error);
                  }
                });
              });
            });
            Promise.all(imagePromises).then((results) => {
              results.forEach(({
                key,
                value
              }) => {
                formData[key] = value;
              });
              console.log(formData);
              if (files.value.length === 1) {
                console.log(files.value[0].name);
                common_vendor.index.uploadFile({
                  url: "http://127.0.0.1:8080/myland/file",
                  filePath: files.value[0].path,
                  name: "file",
                  // 文件对应的 key，根据服务器端的要求修改
                  formData: {
                    ...formData,
                    fileName: files.value[0].name
                    // 如果需要，可以添加其他键值对
                  },
                  // fileName:files.value[0].name,
                  success: (uploadFileRes) => {
                    console.log("File upload success:", uploadFileRes.data);
                    console.log("上传成功!");
                    common_vendor.index.showToast({
                      icon: "none",
                      title: "上传成功",
                      // 使用 title 而不是 content
                      duration: 2e3,
                      // 设置显示时间
                      success: () => {
                        setTimeout(() => {
                          common_vendor.index.reLaunch({
                            url: "/pages/index/index"
                            // 重载到首页，确保路径正确
                          });
                        }, 2e3);
                      }
                    });
                  },
                  fail: (error) => {
                    console.error("文件上传失败", error);
                  }
                });
              } else {
                common_vendor.index.request({
                  url: "http://127.0.0.1:8080/myland/txt",
                  method: "POST",
                  data: formData,
                  // 使用 data 传递表单数据
                  success: (res2) => {
                    console.log("上传成功:", res2.data);
                    common_vendor.index.showToast({
                      icon: "none",
                      title: "上传成功",
                      // 使用 title 而不是 content
                      duration: 2e3,
                      // 设置显示时间
                      success: () => {
                        setTimeout(() => {
                          common_vendor.index.reLaunch({
                            url: "/pages/index/index"
                            // 重载到首页，确保路径正确
                          });
                        }, 1e3);
                      }
                    });
                  },
                  fail: (error) => {
                    console.error("上传失败", error);
                  }
                });
              }
            }).catch((error) => {
              console.error("处理图片数据出错", error);
            });
          } else {
            console.log("用户取消发布");
          }
        },
        fail: () => {
          console.error("显示确认提示框失败");
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(topic.value.text),
        b: common_vendor.o(toggleDropdown),
        c: common_vendor.f(options, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.text),
            b: item.value,
            c: common_vendor.o(($event) => selectOption(item), item.value)
          };
        }),
        d: showDropdown.value,
        e: common_vendor.o(checkTitleLength),
        f: title.value,
        g: common_vendor.o(($event) => title.value = $event.detail.value),
        h: common_vendor.o(checkContentLength),
        i: content.value,
        j: common_vendor.o(($event) => content.value = $event.detail.value),
        k: common_vendor.f(images.value, (imgPath, index, i0) => {
          return {
            a: imgPath,
            b: common_vendor.o(($event) => removeImage(imgPath), index),
            c: index
          };
        }),
        l: files.value.length > 0
      }, files.value.length > 0 ? {
        m: common_vendor.f(files.value, (file, index, i0) => {
          return {
            a: getIcon(file.name),
            b: common_vendor.t(file.name),
            c: common_vendor.t(getFileSize(file.size)),
            d: common_vendor.o(($event) => removeFile(file), index),
            e: index
          };
        })
      } : {}, {
        n: common_vendor.o(hideLinkInput),
        o: linkUrl.value,
        p: common_vendor.o(($event) => linkUrl.value = $event.detail.value),
        q: isLinkInputVisible.value,
        r: common_vendor.o(chooseImages),
        s: linkUrl.value
      }, linkUrl.value ? {} : {}, {
        t: common_vendor.o(showLinkInput),
        v: common_vendor.o(uploadFiles),
        w: common_vendor.o(submitPost)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-217b2d45"], ["__file", "D:/project/pages/framer/index.vue"]]);
wx.createPage(MiniProgramPage);
