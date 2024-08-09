"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    var headimg = common_vendor.ref("../../static/image/tx.jpg");
    var username = common_vendor.ref("");
    common_vendor.ref("");
    const onChooseAvatar = (e) => {
      headimg.value = e.detail.avatarUrl;
      console.log(headimg);
    };
    const onInputChange = (e) => {
      username = e.detail.value;
      console.log(username);
    };
    const login = () => {
      const avatar = headimg.value;
      common_vendor.index.showModal({
        title: "登录获取权限提醒",
        content: "是否同意获取权限",
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击确定");
            common_vendor.index.getUserProfile({
              desc: "获取用户权限",
              // 声明获取用户个人信息后的用途
              success: (user) => {
                console.log(user);
                console.log(avatar);
                const fileSystemManager = common_vendor.index.getFileSystemManager(avatar);
                fileSystemManager.readFile({
                  filePath: avatar,
                  // 选择的图片路径
                  encoding: "base64",
                  // 编码格式
                  success: function(res2) {
                    const base64Data = res2.data;
                    console.log(base64Data);
                    common_vendor.index.login({
                      provider: "weixin",
                      success: (code) => {
                        console.log(code);
                        common_vendor.index.request({
                          url: "http://127.0.0.1:8080/myland/login",
                          method: "POST",
                          data: {
                            code: code.code,
                            name: username,
                            avatar: base64Data
                          },
                          success: (res22) => {
                            console.log(res22, "res2");
                            common_vendor.index.setStorageSync("userId", res22.data.userId);
                            common_vendor.index.setStorageSync("avatar", res22.data.avatar);
                            common_vendor.index.setStorageSync("isLogin", code);
                            console.log(code);
                            common_vendor.index.setStorageSync("name", username);
                            common_vendor.index.reLaunch({
                              url: "/pages/index/index"
                            });
                            common_vendor.index.showToast({
                              title: "登录成功",
                              icon: "none"
                            });
                          }
                        });
                      }
                    });
                  },
                  fail: function(error) {
                    console.error("读取文件失败:", error);
                  }
                });
              },
              fail: (err) => {
                common_vendor.index.showToast({
                  title: "错误",
                  icon: "none"
                });
                console.log(err);
              }
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
            common_vendor.index.showToast({
              title: "登录失败",
              icon: "none"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(headimg)
      }, common_vendor.unref(headimg) ? {
        b: common_vendor.unref(headimg)
      } : {}, {
        c: common_vendor.o(onChooseAvatar),
        d: common_vendor.o(onInputChange),
        e: common_vendor.o(login)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"], ["__file", "D:/project/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
