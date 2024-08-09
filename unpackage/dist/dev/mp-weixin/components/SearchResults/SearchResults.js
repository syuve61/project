"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_Post2 = common_vendor.resolveComponent("Post");
  _easycom_Post2();
}
const _easycom_Post = () => "../Post/Post.js";
if (!Math) {
  _easycom_Post();
}
const _sfc_main = {
  __name: "SearchResults",
  props: {
    posts: {
      type: Array,
      required: true
    }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(__props.posts, (item, index, i0) => {
          return {
            a: "2b895b76-0-" + i0,
            b: common_vendor.p({
              postData: item
            }),
            c: index,
            d: common_vendor.o(($event) => _ctx.gotodetail(item.postId), index)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2b895b76"], ["__file", "D:/project/components/SearchResults/SearchResults.vue"]]);
wx.createComponent(Component);
