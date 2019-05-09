var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

wx.createInnerAudioContext();

Page({
    data: {
        isIpx: t.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            title: "禁言列表",
            height: 2 * t.globalData.height + 20
        },
        page: 1,
        user_list: []
    },
    onLoad: function(e) {
        this.setData({
            height: t.globalData.height,
            page: 1,
            id: e.id
        }), this.get_my_rec();
    },
    onShow: function() {},
    get_my_rec: function() {
        var n = this, i = t.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.much_id = t.siteInfo.uniacid, s.uid = i.uid, 
        s.id = this.data.id;
        var o = t.api_root + "User/get_user_banned_qq";
        e.POST(o, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? n.setData({
                    user_list: t.data.info
                }) : a({
                    content: t.data.msg
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
    add_envite_sulord: function(n) {
        var i = this, s = t.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, o.much_id = t.siteInfo.uniacid, o.uid = s.uid, 
        o.id = n.currentTarget.dataset.id;
        var c = t.api_root + "User/jie_user_banned";
        e.POST(c, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (a({
                    content: t.data.msg
                }), i.get_my_rec()) : a({
                    content: t.data.msg
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
    onReachBottom: function() {
        a({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_my_rec(), a.hide();
    },
    _navback: function() {
        var t = getCurrentPages(), e = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (e.setData({
            show: !1
        }), wx.navigateBack()) : wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    }
});