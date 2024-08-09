"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_PostUser2 = common_vendor.resolveComponent("PostUser");
  _easycom_PostUser2();
}
const _easycom_PostUser = () => "../../../components/PostUser/PostUser.js";
if (!Math) {
  _easycom_PostUser();
}
const _sfc_main = {
  __name: "article",
  setup(__props) {
    const myself = common_vendor.ref([]);
    const userId = common_vendor.ref("");
    common_vendor.onMounted(() => {
      userId.value = common_vendor.index.getStorageSync("userId");
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/myland/myself",
        method: "POST",
        data: {
          userId: userId.value
        },
        success(res) {
          console.log(res);
          myself.value = res.data;
        }
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: myself.value.length > 0
      }, myself.value.length > 0 ? {
        b: common_vendor.f(myself.value, (item, index, i0) => {
          return {
            a: "44cc7a0e-0-" + i0,
            b: common_vendor.p({
              postData: item
            }),
            c: index
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-44cc7a0e"], ["__file", "D:/project/pages/myhome/major/article.vue"]]);
wx.createPage(MiniProgramPage);
