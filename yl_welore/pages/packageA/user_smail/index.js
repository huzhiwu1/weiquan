var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), n = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

wx.createInnerAudioContext();

Page({
    data: {
        isIpx: t.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            title: "站内信",
            height: 2 * t.globalData.height + 20
        },
        my_list: [],
        del_mod: !1,
        bj_mod: !1
    },
    onLoad: function(e) {
        this.setData({
            height: t.globalData.height
        }), this.get_my_rec();
    },
    onShow: function() {},
    del_user_smail: function(t) {
        this.setData({
            del_id: t.currentTarget.dataset.id,
            del_mod: !0
        });
    },
    get_all_mod: function() {
        this.setData({
            bj_mod: !0
        });
    },
    hideModal: function() {
        this.setData({
            del_mod: !1,
            bj_mod: !1
        });
    },
    get_all: function() {
        var a = this, s = t.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, o.much_id = t.siteInfo.uniacid, o.uid = s.uid;
        var i = t.api_root + "User/up_user_smail_all";
        e.POST(i, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (n({
                    content: t.data.msg
                }), a.hideModal(), a.get_my_rec()) : n({
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
    up_user_smail: function(a) {
        var s = this, o = t.getCache("userinfo"), i = new Object();
        i.token = o.token, i.openid = o.openid, i.much_id = t.siteInfo.uniacid, i.id = a.currentTarget.dataset.id;
        var c = t.api_root + "User/up_user_smail";
        e.POST(c, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? s.get_my_rec() : n({
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
    del_do: function() {
        var a = this, s = t.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, o.much_id = t.siteInfo.uniacid, o.id = this.data.del_id;
        var i = t.api_root + "User/del_user_smail";
        e.POST(i, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (a.setData({
                    del_mod: !1
                }), n({
                    content: t.data.msg
                }), a.get_my_rec()) : n({
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
    get_my_rec: function() {
        var a = this, s = t.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, o.much_id = t.siteInfo.uniacid, o.uid = s.uid;
        var i = t.api_root + "User/get_user_smail";
        e.POST(i, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    my_list: t.data.info
                }) : n({
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
        n({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_my_rec(), n.hide();
    },
    _navback: function() {
        var t = getCurrentPages(), e = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (e.setData({
            show: !1
        }), wx.navigateBack()) : wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        var e = t.globalData.forward;
        return console.log(e), e ? {
            title: e.title,
            path: "/yl_welore/pages/index/index",
            imageUrl: e.reis_img,
            success: function(t) {
                n({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                n({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/index/index",
            success: function(t) {
                n({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                n({
                    content: "转发失败"
                });
            }
        };
    }
});