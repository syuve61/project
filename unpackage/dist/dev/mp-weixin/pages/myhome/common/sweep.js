"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "sweep",
  setup(__props) {
    common_vendor.index.scanCode({
      success: function(res) {
        console.log("条码类型：" + res.scanType);
        console.log("条码内容：" + res.result);
      }
    });
    common_vendor.index.scanCode({
      onlyFromCamera: true,
      success: function(res) {
        console.log("条码类型：" + res.scanType);
        console.log("条码内容：" + res.result);
      }
    });
    common_vendor.index.scanCode({
      scanType: ["barCode"],
      success: function(res) {
        console.log("条码类型：" + res.scanType);
        console.log("条码内容：" + res.result);
      }
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/project/pages/myhome/common/sweep.vue"]]);
wx.createPage(MiniProgramPage);
