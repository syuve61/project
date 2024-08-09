"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "msgtarbar",
  emits: ["update"],
  setup(__props, { emit }) {
    const menuList = common_vendor.ref([
      { name: "通知", icon: "/static/image/tongzhi.png" },
      { name: "@我的", icon: "/static/image/@.png" },
      { name: "点赞", icon: "/static/image/dianzan.png" },
      { name: "聊天", icon: "/static/image/huifu.png" }
      // ...更多菜单项
    ]);
    const currentMenu = common_vendor.ref(0);
    const switchTab = (index) => {
      currentMenu.value = index;
      emit("update", index);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(menuList.value, (item, index, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.name),
            c: index,
            d: currentMenu.value === index ? 1 : "",
            e: common_vendor.o(($event) => switchTab(index), index)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eb55f691"], ["__file", "D:/project/components/msgtarbar/msgtarbar.vue"]]);
wx.createComponent(Component);
