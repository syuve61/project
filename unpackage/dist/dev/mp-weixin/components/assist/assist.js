"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "assist",
  setup(__props) {
    const navigateTocontact = () => {
      common_vendor.index.navigateTo({
        url: "/pages/myhome/assist/contact"
      });
    };
    const navigateToteenager = () => {
      common_vendor.index.navigateTo({
        url: "/pages/myhome/assist/teenager"
      });
    };
    const navigateTosetting = () => {
      common_vendor.index.navigateTo({
        url: "/pages/myhome/assist/setting"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(navigateTocontact),
        b: common_vendor.o(navigateToteenager),
        c: common_vendor.o(navigateTosetting)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a4d9133e"], ["__file", "D:/project/components/assist/assist.vue"]]);
wx.createComponent(Component);
