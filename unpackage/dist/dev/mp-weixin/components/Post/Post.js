"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_PostHead2 = common_vendor.resolveComponent("PostHead");
  const _easycom_PostArticle2 = common_vendor.resolveComponent("PostArticle");
  const _easycom_PostImage2 = common_vendor.resolveComponent("PostImage");
  const _easycom_PostFooter2 = common_vendor.resolveComponent("PostFooter");
  (_easycom_PostHead2 + _easycom_PostArticle2 + _easycom_PostImage2 + _easycom_PostFooter2)();
}
const _easycom_PostHead = () => "../PostHead/PostHead.js";
const _easycom_PostArticle = () => "../PostArticle/PostArticle.js";
const _easycom_PostImage = () => "../PostImage/PostImage.js";
const _easycom_PostFooter = () => "../PostFooter/PostFooter.js";
if (!Math) {
  (_easycom_PostHead + _easycom_PostArticle + _easycom_PostImage + _easycom_PostFooter)();
}
const _sfc_main = {
  __name: "Post",
  props: {
    postData: Object
    // 定义一个名为 postData 的 prop，类型为 Object
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.postData
      }, __props.postData ? {
        b: common_vendor.p({
          avatar: __props.postData.avatar,
          name: __props.postData.name,
          userId: __props.postData.userId,
          postId: __props.postData.postid
        })
      } : {}, {
        c: __props.postData
      }, __props.postData ? {
        d: common_vendor.p({
          title: __props.postData.title,
          content: __props.postData.content
        })
      } : {}, {
        e: __props.postData && __props.postData.image !== null
      }, __props.postData && __props.postData.image !== null ? {
        f: common_vendor.p({
          image: __props.postData.image
        })
      } : {}, {
        g: __props.postData
      }, __props.postData ? {
        h: common_vendor.p({
          likeNum: __props.postData.likeNum,
          commentNum: __props.postData.commentNum
        })
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7023092e"], ["__file", "D:/project/components/Post/Post.vue"]]);
wx.createComponent(Component);
