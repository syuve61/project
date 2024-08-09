"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_Post2 = common_vendor.resolveComponent("Post");
  _easycom_Post2();
}
const _easycom_Post = () => "../../components/Post/Post.js";
if (!Math) {
  _easycom_Post();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const followedList = common_vendor.ref([]);
    const followfirstpost = common_vendor.ref([]);
    const currentHighlight = common_vendor.ref(0);
    const highlightUser = (index) => {
      const followId = common_vendor.index.getStorageSync("followedList");
      currentHighlight.value = index;
      const highlightedUserId = followId[index];
      console.log("当前高亮的用户ID是:", highlightedUserId);
      post(highlightedUserId);
    };
    const post = (userId) => {
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/myland/myself",
        method: "POST",
        data: {
          userId
          // 使用传入的 userId 参数
        },
        success(res) {
          console.log(res.data);
          followfirstpost.value = res.data;
        }
      });
    };
    common_vendor.onBeforeMount(() => {
      const followId = common_vendor.index.getStorageSync("followedList");
      console.log(followId);
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/myland/atten",
        method: "POST",
        data: {
          followId
        },
        success(res) {
          followedList.value = res.data.users;
          followfirstpost.value = res.data.posts;
          console.log(followedList.value);
          console.log(followfirstpost.value);
        }
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: followedList.value.length > 0
      }, followedList.value.length > 0 ? {
        b: common_vendor.f(followedList.value, (item, index, i0) => {
          return {
            a: item.avatar,
            b: common_vendor.t(item.name),
            c: index,
            d: index === currentHighlight.value ? 1 : "",
            e: common_vendor.o(($event) => highlightUser(index), index)
          };
        }),
        c: common_vendor.f(followfirstpost.value, (item, index, i0) => {
          return {
            a: "4a55ea83-0-" + i0,
            b: common_vendor.p({
              postData: item
            })
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4a55ea83"], ["__file", "D:/project/pages/atten/index.vue"]]);
wx.createPage(MiniProgramPage);
