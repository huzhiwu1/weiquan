var t = getApp(), a = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), e = require("../../../util/wxParse/wxParse.js");

Page({
    data: {
        info: [],
        nvabarData: {
            showCapsule: 0,
            title: "提现须知",
            height: 2 * t.globalData.height + 20
        },
        page: 1
    },
    onLoad: function(a) {
        t.authority(), this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx
        });
    },
    onShow: function() {
        var i = t.api_root + "User/get_raws_setting", n = this, o = t.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, s.much_id = t.siteInfo.uniacid, a.POST(i, {
            params: s,
            success: function(t) {
                console.log(t);
                var a = t.data.notice;
                e.wxParse("article", "html", a, n, 5);
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(t) {}
                });
            }
        });
    },
    _navback: function() {
        wx.navigateBack();
    }
});