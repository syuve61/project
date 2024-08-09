"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "major",
  setup(__props) {
    const navigateToArticle = () => {
      common_vendor.index.navigateTo({ url: "major/article" });
    };
    const navigateToComments = () => {
      common_vendor.index.navigateTo({ url: "major/comments" });
    };
    const navigateToFiles = () => {
      common_vendor.index.navigateTo({ url: "major/files" });
    };
    const navigateToCollections = () => {
      common_vendor.index.navigateTo({ url: "major/collections" });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(navigateToArticle),
        b: common_vendor.o(navigateToComments),
        c: common_vendor.o(navigateToFiles),
        d: common_vendor.o(navigateToCollections)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ad4798ed"], ["__file", "D:/project/components/major/major.vue"]]);
wx.createComponent(Component);
