"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_Post2 = common_vendor.resolveComponent("Post");
  _easycom_Post2();
}
const _easycom_Post = () => "../../../components/Post/Post.js";
if (!Math) {
  _easycom_Post();
}
const _sfc_main = {
  __name: "history",
  setup(__props) {
    const posts = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      const browseHistory = common_vendor.index.getStorageSync("browseHistory") || [];
      if (browseHistory.length > 0) {
        console.log(browseHistory);
        common_vendor.index.request({
          url: "http://127.0.0.1:8080/myland/history",
          // 替换为你的后端接口地址
          method: "POST",
          data: {
            postId: browseHistory
          },
          success: (res) => {
            console.log(res.data);
            if (res.statusCode === 200) {
              posts.value = res.data;
            } else {
              console.error("请求失败", res);
            }
          },
          fail: (err) => {
            console.error("请求错误", err);
          }
        });
      }
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: posts.value.length === 0
      }, posts.value.length === 0 ? {} : {
        b: common_vendor.f(posts.value, (item, index, i0) => {
          return {
            a: "76a718c4-0-" + i0,
            b: common_vendor.p({
              postData: item
            }),
            c: index,
            d: common_vendor.o(($event) => _ctx.gotodetail(item.postId), index)
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-76a718c4"], ["__file", "D:/project/pages/myhome/common/history.vue"]]);
wx.createPage(MiniProgramPage);
