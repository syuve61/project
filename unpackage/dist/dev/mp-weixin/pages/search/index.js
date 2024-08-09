"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_SearchResults2 = common_vendor.resolveComponent("SearchResults");
  _easycom_SearchResults2();
}
const _easycom_SearchResults = () => "../../components/SearchResults/SearchResults.js";
if (!Math) {
  _easycom_SearchResults();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const searchQuery = common_vendor.ref("");
    const searchResults = common_vendor.ref([]);
    const searchHistory = common_vendor.ref([]);
    const showSuggestions = common_vendor.ref(false);
    const hasSearched = common_vendor.ref(false);
    common_vendor.ref([
      "看什么动漫",
      "最新热书",
      "全职法师"
    ]);
    const discoveries = common_vendor.ref([
      "星露谷物语",
      "泰拉瑞亚",
      "文明VI",
      "原神",
      "进击的巨人",
      "鬼灭之刃",
      "火影忍者",
      "蜡笔小新",
      "全职法师",
      "遮天",
      "完美世界",
      "沧元图"
    ]);
    const fillInput = (item) => {
      searchQuery.value = item;
    };
    const handleFocus = () => {
      showSuggestions.value = true;
    };
    const handleBlur = () => {
      if (hasSearched.value) {
        setTimeout(() => {
          showSuggestions.value = false;
        }, 200);
      }
    };
    const search = async () => {
      console.log("搜索内容:", searchQuery.value);
      if (searchQuery.value && !searchHistory.value.includes(searchQuery.value)) {
        searchHistory.value.unshift(searchQuery.value);
      }
      common_vendor.index.request({
        url: "http://127.0.0.1:8080/myland/index",
        // 替换为实际接口地址
        method: "POST",
        data: {
          word: searchQuery.value
          // 使用 word 作为参数字段
        },
        success: (res) => {
          searchResults.value = res.data;
          setTimeout(() => {
            showSuggestions.value = false;
          }, 0);
          hasSearched.value = true;
        },
        fail: (err) => {
          console.error("请求失败:", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleFocus),
        b: common_vendor.o(handleBlur),
        c: searchQuery.value,
        d: common_vendor.o(($event) => searchQuery.value = $event.detail.value),
        e: common_vendor.o(search),
        f: showSuggestions.value || !hasSearched.value
      }, showSuggestions.value || !hasSearched.value ? common_vendor.e({
        g: searchHistory.value.length > 0
      }, searchHistory.value.length > 0 ? {} : {}, {
        h: searchHistory.value.length > 0
      }, searchHistory.value.length > 0 ? {
        i: common_vendor.f(searchHistory.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item,
            c: common_vendor.o(($event) => fillInput(item), item)
          };
        })
      } : {}, {
        j: common_vendor.f(discoveries.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item),
            b: item,
            c: common_vendor.o(($event) => fillInput(item), item)
          };
        })
      }) : {}, {
        k: searchResults.value.length > 0 && !showSuggestions.value
      }, searchResults.value.length > 0 && !showSuggestions.value ? {
        l: common_vendor.p({
          posts: searchResults.value
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2dab939d"], ["__file", "D:/project/pages/search/index.vue"]]);
wx.createPage(MiniProgramPage);
