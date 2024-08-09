"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "PostFooter",
  props: ["commentNum", "likeNum"],
  setup(__props) {
    const props = __props;
    const likeIcon = common_vendor.ref("/static/image/icon.png");
    const commentIcon = common_vendor.ref("/static/image/pinglun.png");
    const shareIcon = common_vendor.ref("/static/image/fenxiang.png");
    const localLikeNum = common_vendor.ref(props.likeNum);
    const isLiked = common_vendor.ref(false);
    const like = () => {
      isLiked.value = !isLiked.value;
      if (isLiked.value) {
        likeIcon.value = "/static/image/iconclick.png";
        localLikeNum.value++;
      } else {
        likeIcon.value = "/static/image/icon.png";
        localLikeNum.value--;
      }
    };
    const comment = () => {
      common_vendor.index.showToast({
        title: "已评论",
        icon: "none"
      });
    };
    const share = () => {
      common_vendor.index.showToast({
        title: "已分享",
        icon: "none"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: likeIcon.value,
        b: common_vendor.t(localLikeNum.value),
        c: common_vendor.o(like),
        d: commentIcon.value,
        e: common_vendor.t(__props.commentNum),
        f: common_vendor.o(comment),
        g: shareIcon.value,
        h: common_vendor.o(share)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a05f0a5e"], ["__file", "D:/project/components/PostFooter/PostFooter.vue"]]);
wx.createComponent(Component);
