"use strict";
const common_vendor = require("../vendor.js");
class Utils {
  constructor() {
    this.baseUrl = "";
  }
  getUserInfo() {
    common_vendor.index.login({
      success: function(res) {
        console.log(res);
      }
    });
  }
  request(option = {
    showLoading: false
  }) {
    if (!option.url) {
      return false;
    }
    common_vendor.index.request({
      url: option.url
    });
  }
}
const Utils$1 = new Utils();
exports.Utils = Utils$1;
