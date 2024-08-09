"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "nav-header",
  emits: ["switchTab"],
  setup(__props, { emit }) {
    const menuList = common_vendor.ref([
      { name: "全部", isActive: true },
      { name: "动漫", isActive: false },
      { name: "阅读", isActive: false },
      { name: "游戏", isActive: false }
      // ...更多菜单项
    ]);
    const switchTab = (index) => {
      console.log(index);
      menuList.value.forEach((item) => {
        item.isActive = false;
      });
      menuList.value[index].isActive = true;
      fetchData(index);
    };
    const fetchData = (index) => {
      common_vendor.wx$1.request({
        url: "http://127.0.0.1:8080/myland/index",
        method: "POST",
        data: {
          index: index || "0"
        },
        success: (res) => {
          console.log(res.data);
          emit("switchTab", res.data);
        },
        fail: (error) => {
          console.error("获取数据失败:", error);
        }
      });
    };
    common_vendor.onMounted(() => {
      fetchData();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(_ctx.store.testData),
        b: common_vendor.f(menuList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index,
            c: item.isActive ? 1 : "",
            d: common_vendor.o(($event) => switchTab(index), index)
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9a5a6ef3"], ["__file", "D:/project/components/nav-header/nav-header.vue"]]);
wx.createComponent(Component);
