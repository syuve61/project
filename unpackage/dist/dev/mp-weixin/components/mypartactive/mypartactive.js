"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "mypartactive",
  setup(__props) {
    const activeItems = [
      {
        id: 3,
        title: "万圣夜一起搞鬼",
        description: "一起鬼混",
        imageUrl: "../../static/image/wsygg.jpg"
      },
      {
        id: 4,
        title: "万卷有益在人间",
        description: "读万卷书，闻千里河山",
        imageUrl: "../../static/image/wjyyzrj.jpg"
      }
    ];
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(activeItems, (activeItem, k0, i0) => {
          return {
            a: common_vendor.t(activeItem.title),
            b: common_vendor.t(activeItem.description),
            c: activeItem.imageUrl,
            d: activeItem.id
          };
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/project/components/mypartactive/mypartactive.vue"]]);
wx.createComponent(Component);
