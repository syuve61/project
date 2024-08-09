"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "interaction",
  setup(__props) {
    const id = common_vendor.ref("");
    const inputValue = common_vendor.ref("");
    const savedate = () => {
      switch (id.value) {
        case "0":
          common_vendor.index.$emit("updateName", inputValue.value);
          break;
        case "3":
          common_vendor.index.$emit("updateSignature", inputValue.value);
          break;
        default:
          console.error("Invalid id");
      }
      common_vendor.index.navigateBack();
    };
    common_vendor.onBeforeMount(() => {
      console.log(getCurrentPages()[3].options.id);
      id.value = getCurrentPages()[3].options.id;
      console.log(id.value);
      if (id.value) {
        console.log("id=" + id.value);
        let title = "";
        switch (id.value) {
          case "0":
            title = "修改昵称";
            break;
          case "1":
            title = "修改性别";
            break;
          case "2":
            title = "修改出生日期";
            break;
          case "3":
            title = "修改个性签名";
            break;
          default:
            title = "";
        }
        if (title) {
          common_vendor.index.setNavigationBarTitle({
            title
          });
        }
      }
    });
    common_vendor.onMounted(() => {
      console.log(getCurrentPages());
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: id.value === "0"
      }, id.value === "0" ? {
        b: inputValue.value,
        c: common_vendor.o(($event) => inputValue.value = $event.detail.value),
        d: common_vendor.o(savedate)
      } : id.value === "1" ? {} : id.value === "3" ? {
        g: inputValue.value,
        h: common_vendor.o(($event) => inputValue.value = $event.detail.value),
        i: common_vendor.o(savedate)
      } : {}, {
        e: id.value === "1",
        f: id.value === "3"
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2a0b670f"], ["__file", "D:/project/pages/myhome/dateCard/interaction.vue"]]);
wx.createPage(MiniProgramPage);
