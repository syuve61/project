"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "PostImage",
  props: ["image"],
  setup(__props) {
    const { image: imageProp } = __props;
    const image = JSON.parse(imageProp);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(image).length === 1
      }, common_vendor.unref(image).length === 1 ? {
        b: common_vendor.unref(image)[0]
      } : common_vendor.unref(image).length === 2 ? {
        d: common_vendor.f(common_vendor.unref(image), (img, index, i0) => {
          return {
            a: index,
            b: img
          };
        })
      } : {
        e: common_vendor.f(common_vendor.unref(image), (img, index, i0) => {
          return {
            a: index,
            b: img
          };
        })
      }, {
        c: common_vendor.unref(image).length === 2
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e8d62c29"], ["__file", "D:/project/components/PostImage/PostImage.vue"]]);
wx.createComponent(Component);
