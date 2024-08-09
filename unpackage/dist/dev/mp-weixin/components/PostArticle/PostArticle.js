"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "PostArticle",
  props: ["title", "content"],
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: common_vendor.t(__props.content)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b3e17be6"], ["__file", "D:/project/components/PostArticle/PostArticle.vue"]]);
wx.createComponent(Component);
