"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
const common_js_utils = require("./common/js/utils.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/atten/index.js";
  "./pages/framer/index.js";
  "./pages/message/index.js";
  "./pages/login/login.js";
  "./pages/myhome/index.js";
  "./pages/myhome/major/article.js";
  "./pages/myhome/major/comments.js";
  "./pages/myhome/major/files.js";
  "./pages/myhome/common/history.js";
  "./pages/myhome/common/punchcard.js";
  "./pages/myhome/major/collections.js";
  "./pages/myhome/common/sweep.js";
  "./pages/myhome/common/recyclebin.js";
  "./pages/myhome/common/activitycenter.js";
  "./pages/search/index.js";
  "./pages/detail/index.js";
  "./pages/myhome/assist/contact.js";
  "./pages/myhome/assist/teenager.js";
  "./pages/myhome/assist/setting.js";
  "./pages/myhome/dateCard/personal.js";
  "./pages/myhome/dateCard/interaction.js";
}
const _sfc_main = {
  globalData: {},
  onLaunch: function() {
    common_vendor.index.getSetting({
      success: (res) => {
        if (!res.authSetting["scope.writePhotosAlbum"]) {
          common_vendor.index.authorize({
            scope: "scope.writePhotosAlbum",
            success: () => {
              console.log("用户已授权");
            },
            fail: () => {
              console.log("用户拒绝授权");
            }
          });
        }
      }
    });
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
    common_vendor.index.onTabItemTap = (item) => {
      console.log(item.index, item.pagePath, item.text);
      const followedList = common_vendor.index.getStorageSync("followedList");
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/myland/load",
        method: "POST",
        data: {
          userId: "your-user-id",
          // 请将这里替换为你的用户ID
          followid: followedList
        },
        success(res) {
          console.log(res.data);
        }
      });
    };
  },
  globalData: {
    utils: common_js_utils.Utils
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/project/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
