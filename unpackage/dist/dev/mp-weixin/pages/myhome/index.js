"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_major2 = common_vendor.resolveComponent("major");
  const _easycom_often2 = common_vendor.resolveComponent("often");
  const _easycom_assist2 = common_vendor.resolveComponent("assist");
  (_easycom_major2 + _easycom_often2 + _easycom_assist2)();
}
const _easycom_major = () => "../../components/major/major.js";
const _easycom_often = () => "../../components/often/often.js";
const _easycom_assist = () => "../../components/assist/assist.js";
if (!Math) {
  (_easycom_major + _easycom_often + _easycom_assist)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const navigatetodataCard = () => {
      common_vendor.index.navigateTo({
        url: "dateCard/personal"
      });
    };
    const userInfo = common_vendor.ref({
      username: common_vendor.index.getStorageSync("name") || "",
      avatarUrl: common_vendor.index.getStorageSync("avatar") || ""
    });
    return (_ctx, _cache) => {
      return {
        a: userInfo.value.avatarUrl,
        b: common_vendor.t(userInfo.value.username),
        c: common_vendor.o(navigatetodataCard)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e9f3a583"], ["__file", "D:/project/pages/myhome/index.vue"]]);
wx.createPage(MiniProgramPage);
