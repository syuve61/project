"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_msgtarbar2 = common_vendor.resolveComponent("msgtarbar");
  const _easycom_inform2 = common_vendor.resolveComponent("inform");
  const _easycom_My2 = common_vendor.resolveComponent("My");
  const _easycom_like2 = common_vendor.resolveComponent("like");
  const _easycom_chat2 = common_vendor.resolveComponent("chat");
  (_easycom_msgtarbar2 + _easycom_inform2 + _easycom_My2 + _easycom_like2 + _easycom_chat2)();
}
const _easycom_msgtarbar = () => "../../components/msgtarbar/msgtarbar.js";
const _easycom_inform = () => "../../components/inform/inform.js";
const _easycom_My = () => "../../components/My/My.js";
const _easycom_like = () => "../../components/like/like.js";
const _easycom_chat = () => "../../components/chat/chat.js";
if (!Math) {
  (_easycom_msgtarbar + _easycom_inform + _easycom_My + _easycom_like + _easycom_chat)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const menuList = common_vendor.ref([
      { name: "通知", icon: "/static/image/tongzhi.png" },
      { name: "@我的", icon: "/static/image/@.png" },
      { name: "点赞", icon: "/static/image/dianzan.png" },
      { name: "聊天", icon: "/static/image/huifu.png" }
      // ...更多菜单项
    ]);
    const currentMenu = common_vendor.ref(0);
    const updateCurrentMenu = (newIndex) => {
      currentMenu.value = newIndex;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(updateCurrentMenu),
        b: common_vendor.p({
          currentMenu: currentMenu.value
        }),
        c: common_vendor.t(menuList.value[currentMenu.value].name + "消息"),
        d: currentMenu.value === 0
      }, currentMenu.value === 0 ? {} : {}, {
        e: currentMenu.value === 1
      }, currentMenu.value === 1 ? {} : {}, {
        f: currentMenu.value === 2
      }, currentMenu.value === 2 ? {} : {}, {
        g: currentMenu.value === 3
      }, currentMenu.value === 3 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-780fc0ad"], ["__file", "D:/project/pages/message/index.vue"]]);
wx.createPage(MiniProgramPage);
