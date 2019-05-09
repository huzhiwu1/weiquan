var e = getApp(), t = require("../../../10E9B8307EC361BF768FD0371DAD8A51.js");

Page({
    data: {
        copyright: {},
        type: 0
    },
    onGotUserInfo: function(t) {
        e.removeCache("userinfo");
        var i = this;
        e.getCache("userinfo") || e.getUserInfo(t.detail.userInfo, function(t) {
            1e3 != e && (0 == i.data.type ? wx.reLaunch({
                url: "/yl_welore/pages/index/index"
            }) : wx.reLaunch({
                url: "/yl_welore/pages/packageA/article/index?id=" + i.data.id + "&info_type=" + i.data.info_type
            }));
        });
    },
    onLoad: function(e) {
        this.setData({
            type: e.type,
            info_type: e.info_type,
            id: e.id
        }), wx.hideShareMenu();
    },
    onShow: function() {
        wx.hideShareMenu(), this.authority();
    },
    authority: function() {
        var i = e.api_root + "Login/get_authority", n = this, o = e.getCache("userinfo"), a = new Object();
        a.token = o.token, a.openid = o.openid, a.much_id = e.siteInfo.uniacid, t.POST(i, {
            params: a,
            success: function(e) {
                console.log(e), n.setData({
                    copyright: e.data
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