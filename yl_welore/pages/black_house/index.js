var e = getApp(), t = require("../../../10E9B8307EC361BF768FD0371DAD8A51.js");

Page({
    data: {},
    onGotUserInfo: function(t) {
        e.getCache("userinfo") || e.getUserInfo(t.detail.userInfo, function(t) {
            1e3 != e && wx.navigateBack();
        });
    },
    onLoad: function(e) {
        wx.hideShareMenu();
    },
    onShow: function() {
        wx.hideShareMenu(), this.get_user_info();
    },
    get_user_info: function() {
        var n = e.api_root + "User/get_user_info", o = this, s = e.getCache("userinfo"), a = new Object();
        a.token = s.token, a.openid = s.openid, t.POST(n, {
            params: a,
            success: function(e) {
                console.log(e), "success" == e.data.status ? o.setData({
                    user_info: e.data.info
                }) : $Toast({
                    content: e.data.msg
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(e) {}
                });
            }
        });
    }
});