"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "personal",
  setup(__props) {
    const items = [
      {
        id: "0",
        label: "昵称",
        value: "昵称"
      },
      {
        id: "1",
        label: "性别",
        value: "性别"
      },
      {
        id: "2",
        label: "出生年月",
        value: "1980-01-01"
      },
      {
        id: "3",
        label: "个性签名",
        value: "个性签名"
      }
    ];
    const avatar = common_vendor.ref("../../../static/image/tx.jpg");
    const nickname = common_vendor.ref("");
    const sex = common_vendor.ref("");
    const birth = common_vendor.ref("");
    const signature = common_vendor.ref("");
    const submitForm = (e) => {
      e.preventDefault();
      const userId = common_vendor.index.getStorageSync("userId");
      console.log("表单数据：");
      console.log({
        name: nickname.value,
        sex: sex.value,
        signature: signature.value
      });
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/myland/update",
        method: "POST",
        data: {
          userId,
          name: nickname.value,
          sex: sex.value,
          signature: signature.value
        },
        success: function(res) {
          console.log("成功更新数据:", res.data);
          common_vendor.index.showToast({
            title: "更新成功",
            icon: "none"
          });
        },
        fail: function(error) {
          console.error("更新数据失败:", error);
          common_vendor.index.showToast({
            title: "更新失败",
            icon: "none"
          });
        }
      });
    };
    const loadData = () => {
      avatar.value = common_vendor.index.getStorageSync("avatar") || avatar.value;
      nickname.value = common_vendor.index.getStorageSync("name") || "";
      sex.value = common_vendor.index.getStorageSync("sex") || "";
      birth.value = common_vendor.index.getStorageSync("birth") || "";
      signature.value = common_vendor.index.getStorageSync("signature") || "";
    };
    common_vendor.index.$on("updateName", (newName) => {
      nickname.value = newName;
    });
    common_vendor.index.$on("updateSignature", (newSignature) => {
      signature.value = newSignature;
    });
    common_vendor.onMounted(() => {
      console.log("onmount");
      loadData();
    });
    common_vendor.onActivated(() => {
      loadData();
      console.log("onactive");
    });
    const navigate = (id, index) => {
      common_vendor.index.navigateTo({
        url: `interaction?id=${id}`
      });
    };
    const genderOptions = ["男", "女", "其他"];
    const showGenderPicker = () => {
      common_vendor.index.showActionSheet({
        itemList: genderOptions,
        success: function(res) {
          sex.value = genderOptions[res.tapIndex];
          common_vendor.index.setStorageSync("sex", genderOptions[res.tapIndex]);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: avatar.value,
        b: common_vendor.t(items[0].label),
        c: common_vendor.t(nickname.value || "未设置"),
        d: common_vendor.o(($event) => navigate(items[0].id)),
        e: common_vendor.t(items[1].label),
        f: common_vendor.t(sex.value || "未设置"),
        g: common_vendor.o(showGenderPicker),
        h: common_vendor.t(items[2].label),
        i: common_vendor.t(birth.value || "1999-09-29"),
        j: common_vendor.t(items[3].label),
        k: common_vendor.t(signature.value || "未设置"),
        l: common_vendor.o(($event) => navigate(items[3].id)),
        m: common_vendor.o(submitForm),
        n: common_vendor.o(submitForm)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1286d4d4"], ["__file", "D:/project/pages/myhome/dateCard/personal.vue"]]);
wx.createPage(MiniProgramPage);
