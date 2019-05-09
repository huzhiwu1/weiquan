var t = getApp(), a = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js");

Page({
    data: {
        info: [],
        nvabarData: {
            showCapsule: 0,
            title: "发帖须知",
            height: 2 * t.globalData.height + 20
        }
    },
    onLoad: function(a) {
        t.authority(), this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx
        });
    },
    onShow: function() {
        var i = t.api_root + "User/get_post_notice", e = this, n = t.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.much_id = t.siteInfo.uniacid, a.POST(i, {
            params: o,
            success: function(t) {
                e.setData({
                    info: t.data
                });
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