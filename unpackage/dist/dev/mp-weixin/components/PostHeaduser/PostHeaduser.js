"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "PostHeaduser",
  props: ["avatar", "name", "userId", "postId"],
  setup(__props) {
    const props = __props;
    const deletepost = () => {
      const postId = props.postId;
      common_vendor.index.showModal({
        title: "提示",
        content: "你确定要删除你发布的帖子吗？",
        cancelText: "取消",
        confirmText: "确定",
        confirmColor: "#FF0000",
        // 设置确认按钮的颜色为红色
        success: function(res) {
          if (res.confirm) {
            console.log("用户点击确定");
            common_vendor.index.request({
              url: "http://127.0.0.1:8080/myland/deletepost",
              // 替换为实际的删除帖子接口
              method: "POST",
              data: {
                // 传递必要的删除数据，例如帖子ID
                postId
              },
              success(res2) {
                console.log("帖子删除成功", res2);
                common_vendor.index.showToast({
                  title: "删除成功!",
                  icon: "none"
                });
                setTimeout(() => {
                  if (res2.statusCode === 200) {
                    common_vendor.index.redirectTo({
                      url: "/pages/myhome/major/article"
                    });
                  }
                }, 1e3);
              },
              fail(err) {
                console.error("帖子删除失败", err);
              }
            });
          } else if (res.cancel) {
            console.log("用户点击取消");
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: __props.avatar,
        b: common_vendor.t(__props.name),
        c: common_vendor.o(deletepost)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e2fc4b86"], ["__file", "D:/project/components/PostHeaduser/PostHeaduser.vue"]]);
wx.createComponent(Component);
