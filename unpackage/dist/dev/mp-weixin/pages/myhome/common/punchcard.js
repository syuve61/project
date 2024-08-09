"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "punchcard",
  setup(__props) {
    const isFlipped = common_vendor.ref(false);
    const flippedOnce = common_vendor.ref(false);
    const flipCard = () => {
      if (!flippedOnce.value) {
        isFlipped.value = true;
        flippedOnce.value = true;
      }
    };
    const getCurrentDate = () => {
      const date = /* @__PURE__ */ new Date();
      const month = date.getMonth() + 1;
      const day2 = date.getDate();
      const weekDay = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"][date.getDay()];
      const year = date.getFullYear();
      return {
        fullDate: `${month}月${day2}号`,
        yearMonth: `${year}.${month}`,
        day: day2 < 10 ? `0${day2}` : `${day2}`,
        smallDate: `${month}月，${weekDay}`
      };
    };
    const {
      fullDate,
      yearMonth,
      day,
      smallDate
    } = getCurrentDate();
    const currentDate = fullDate;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(isFlipped.value ? common_vendor.unref(currentDate) : "日签卡"),
        b: common_vendor.t(common_vendor.unref(day)),
        c: common_vendor.t(common_vendor.unref(smallDate)),
        d: common_vendor.o(flipCard),
        e: common_vendor.t(common_vendor.unref(day)),
        f: common_vendor.t(common_vendor.unref(yearMonth)),
        g: isFlipped.value ? 1 : "",
        h: common_vendor.o(flipCard)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-db487976"], ["__file", "D:/project/pages/myhome/common/punchcard.vue"]]);
wx.createPage(MiniProgramPage);
