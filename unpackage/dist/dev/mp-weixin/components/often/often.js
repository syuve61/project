"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "often",
  setup(__props) {
    const navigateToDaKa = () => {
      common_vendor.index.navigateTo({ url: "common/punchcard" });
    };
    const navigateToSaoYiSao = () => {
      common_vendor.index.scanCode({
        success: function(res) {
          console.log("条码类型：" + res.scanType);
          console.log("条码内容：" + res.result);
        }
      });
    };
    const navigateToHuiShouZhan = () => {
      common_vendor.index.navigateTo({ url: "common/recyclebin" });
    };
    const navigateToLiuLanLiShi = () => {
      common_vendor.index.navigateTo({ url: "common/history" });
    };
    const navigateToHuoDongZhongXin = () => {
      common_vendor.index.navigateTo({ url: "common/activitycenter" });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(navigateToDaKa),
        b: common_vendor.o(navigateToSaoYiSao),
        c: common_vendor.o(navigateToHuiShouZhan),
        d: common_vendor.o(navigateToLiuLanLiShi),
        e: common_vendor.o(navigateToHuoDongZhongXin)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d8190b44"], ["__file", "D:/project/components/often/often.vue"]]);
wx.createComponent(Component);
