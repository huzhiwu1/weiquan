var e = getApp();

require("../../../10E9B8307EC361BF768FD0371DAD8A51.js");

Page({
    data: {},
    onGotUserInfo: function(n) {
        e.getCache("userinfo") || e.getUserInfo(n.detail.userInfo, function(n) {
            1e3 != e && wx.navigateBack();
        });
    },
    onLoad: function(e) {
        wx.hideShareMenu();
    },
    onShow: function() {
        wx.hideShareMenu();
    }
});