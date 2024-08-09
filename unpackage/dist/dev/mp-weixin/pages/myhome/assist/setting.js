"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "setting",
  setup(__props) {
    const sections = common_vendor.ref([
      {
        items: ["账号资料", "安全隐私", "收货信息"]
      },
      {
        items: ["画面设置", "首页推荐设置", "文件设置", "离线设置", "阅读设置"]
      },
      {
        items: ["推送设置", "消息设置", "下载管理", "清理存储空间", "其他设置"]
      },
      {
        items: ["定时关闭", "睡眠提醒"]
      },
      {
        items: ["深色设置"]
      },
      {
        items: ["我的客服", "关于漫游岛", "商务合作"]
      },
      {
        items: ["用户协议", "隐私政策", "隐私权限设置", "个人信息收集清单", "第三方信息共享清单"]
      }
    ]);
    const handleClick = (item) => {
      console.log("Clicked item:", item);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(sections.value, (section, sectionIndex, i0) => {
          return common_vendor.e({
            a: common_vendor.f(section.items, (item, index, i1) => {
              return {
                a: common_vendor.t(item),
                b: index,
                c: common_vendor.o(($event) => handleClick(item), index)
              };
            }),
            b: sectionIndex < sections.value.length - 1
          }, sectionIndex < sections.value.length - 1 ? {} : {}, {
            c: sectionIndex
          });
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-de0c8740"], ["__file", "D:/project/pages/myhome/assist/setting.vue"]]);
wx.createPage(MiniProgramPage);
