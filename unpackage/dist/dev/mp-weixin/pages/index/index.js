"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_nav_header2 = common_vendor.resolveComponent("nav-header");
  const _easycom_Post2 = common_vendor.resolveComponent("Post");
  (_easycom_nav_header2 + _easycom_Post2)();
}
const _easycom_nav_header = () => "../../components/nav-header/nav-header.js";
const _easycom_Post = () => "../../components/Post/Post.js";
if (!Math) {
  (_easycom_nav_header + _easycom_Post)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const statusHeight = common_vendor.ref(0);
    const testData = common_vendor.ref([]);
    common_vendor.onBeforeMount(() => {
      const currentUser = common_vendor.index.getStorageSync("userId") || null;
      console.log(currentUser);
      if (currentUser !== null) {
        common_vendor.index.request({
          url: "http://127.0.0.1:8080/myland/follow",
          method: "POST",
          data: {
            userId: currentUser
          },
          success(res) {
            console.log(res.data);
            common_vendor.index.setStorageSync("followedList", res.data);
          }
        });
      }
    });
    const gotodetail = (postId) => {
      if (postId) {
        console.log(postId);
        common_vendor.index.navigateTo({
          url: `/pages/detail/index?postId=${postId}`
        });
      }
    };
    common_vendor.onMounted(() => {
      setStatusBar();
    });
    const setStatusBar = () => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      statusHeight.value = systemInfo.statusBarHeight;
    };
    const handleSwitchTab = (data) => {
      testData.value = JSON.parse(JSON.stringify(data));
    };
    const isLogin = common_vendor.ref(common_vendor.index.getStorageSync("isLogin") || {
      errMsg: "login:fail"
    });
    const userInfo = common_vendor.ref({
      username: common_vendor.index.getStorageSync("name") || "",
      avatarUrl: common_vendor.index.getStorageSync("avatar") || ""
    });
    const gotomyhome = () => {
      common_vendor.index.navigateTo({
        url: "/pages/myhome/index"
      });
    };
    const gotoSearch = () => {
      common_vendor.index.navigateTo({
        url: "/pages/search/index"
      });
    };
    const gotologin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    common_vendor.index.onTabItemTap = (item) => {
      console.log(item);
      const followedList = common_vendor.index.getStorageSync("followedList");
      common_vendor.index.Request({
        url: "http://127.0.0.1:8080/myland/load",
        method: "POST",
        data: {
          userId,
          followid: followedList
        },
        success(res) {
          console.log(res.data);
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.s("height: " + statusHeight.value + "px;"),
        b: isLogin.value.errMsg === "login:ok"
      }, isLogin.value.errMsg === "login:ok" ? {
        c: userInfo.value.avatarUrl,
        d: common_vendor.o(gotomyhome),
        e: common_vendor.t(userInfo.value.username || "已登录")
      } : {
        f: _ctx.avatarUrl,
        g: common_vendor.o(gotologin),
        h: common_vendor.t(userInfo.value.username || "未登录")
      }, {
        i: common_vendor.s("top: " + statusHeight.value + "px;"),
        j: common_vendor.o(gotoSearch),
        k: common_vendor.o(handleSwitchTab),
        l: common_vendor.f(testData.value, (item, index, i0) => {
          return {
            a: "63a2a6c9-1-" + i0,
            b: common_vendor.p({
              postData: item
            }),
            c: index,
            d: common_vendor.o(($event) => gotodetail(item.postId), index)
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/project/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
