"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "PostHead",
  props: ["avatar", "name", "userId", "postId"],
  setup(__props) {
    const props = __props;
    const followedList = common_vendor.index.getStorageSync("followedList") || [];
    const followed = common_vendor.ref(followedList.includes(props.userId));
    const toggleFollow = () => {
      const currentFollowed = !followed.value;
      updateFollowedList(props.userId, currentFollowed);
      followed.value = currentFollowed;
    };
    const updateFollowedList = (userId, isFollowed) => {
      let followedList2 = common_vendor.index.getStorageSync("followedList") || [];
      if (isFollowed) {
        if (!followedList2.includes(userId)) {
          followedList2.push(userId);
        }
      } else {
        const index = followedList2.indexOf(userId);
        if (index !== -1) {
          followedList2.splice(index, 1);
        }
      }
      common_vendor.index.setStorageSync("followedList", followedList2);
    };
    const currentUser = common_vendor.index.getStorageSync("userId") || null;
    const isCurrentUser = props.userId !== currentUser;
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.avatar,
        b: common_vendor.t(__props.name),
        c: isCurrentUser !== 1
      }, isCurrentUser !== 1 ? {
        d: common_vendor.t(followed.value ? "已关注" : "+关注"),
        e: common_vendor.o(toggleFollow)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-fb823393"], ["__file", "D:/project/components/PostHead/PostHead.vue"]]);
wx.createComponent(Component);
