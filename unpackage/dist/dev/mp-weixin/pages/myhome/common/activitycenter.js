"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_allactive2 = common_vendor.resolveComponent("allactive");
  const _easycom_mypartactive2 = common_vendor.resolveComponent("mypartactive");
  (_easycom_allactive2 + _easycom_mypartactive2)();
}
const _easycom_allactive = () => "../../../components/allactive/allactive.js";
const _easycom_mypartactive = () => "../../../components/mypartactive/mypartactive.js";
if (!Math) {
  (_easycom_allactive + _easycom_mypartactive)();
}
const _sfc_main = {
  __name: "activitycenter",
  setup(__props) {
    const menuList = common_vendor.ref([
      {
        name: "全部"
      },
      {
        name: "我参与的"
      }
    ]);
    const currentMenu = common_vendor.ref(0);
    const switchTab = (index) => {
      currentMenu.value = index;
      console.log(currentMenu.value);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(menuList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index,
            c: currentMenu.value === index ? 1 : "",
            d: common_vendor.o(($event) => switchTab(index), index)
          };
        }),
        b: currentMenu.value === 0
      }, currentMenu.value === 0 ? {} : {}, {
        c: currentMenu.value === 1
      }, currentMenu.value === 1 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e2ed8b"], ["__file", "D:/project/pages/myhome/common/activitycenter.vue"]]);
wx.createPage(MiniProgramPage);
