var t = getApp(), n = require("../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        tabbar: {},
        user_current: "user",
        user_info: {},
        nvabarData: {
            showCapsule: 0,
            title: "会员中心",
            height: 2 * t.globalData.height + 20
        },
        animationData: null,
        animationDataD: null,
        flag: !1,
        diy: {},
        isPopping: !1,
        animPlus: {},
        animCollect1: {},
        animCollect: {},
        animTranspond: {},
        animInput: {},
        animBack: {},
        version: 1
    },
    get_diy: function() {
        var a = t.api_root + "User/get_diy", i = this, e = t.getCache("userinfo"), o = new Object();
        o.token = e.token, o.openid = e.openid, o.uid = e.uid, o.much_id = t.siteInfo.uniacid, 
        o.version = t.version, n.POST(a, {
            params: o,
            success: function(t) {
                console.log(t), i.setData({
                    version: t.data.version,
                    diy: t.data
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
    show_qian: function() {
        var t = this;
        console.log("animate");
        var n = wx.createAnimation({
            duration: 750,
            timingFunction: "ease"
        });
        this.animation = n, n.opacity(1).step(), t.setData({
            animationData: n.export()
        });
    },
    bid_qiandao: function() {
        wx.vibrateShort();
        var t = this;
        console.log("animate");
        var n = wx.createAnimation({
            duration: 750,
            timingFunction: "ease"
        });
        this.animation = n, n.opacity(0).step(), t.setData({
            animationData: n.export()
        }), setTimeout(function() {
            t.user_punch();
        }, 400);
    },
    bid_qiandao_d: function() {
        var t = this, n = t.data.user_info;
        n.is_sign = 1, t.setData({
            user_info: n
        });
        var a = wx.createAnimation({
            duration: 200,
            timingFunction: "linear"
        });
        this.animation = a, a.opacity(1).step(), t.setData({
            animationDataD: a.export()
        }), setTimeout(function() {
            a.opacity(1).scale(.4).step(), t.setData({
                animationDataD: a.export()
            });
        }, 200);
    },
    user_punch: function() {
        var i = t.api_root + "User/add_user_punch", e = this, o = t.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, s.much_id = t.siteInfo.uniacid, s.uid = o.uid, 
        n.POST(i, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (a({
                    content: t.data.msg
                }), e.bid_qiandao_d()) : (e.show_qian(), a({
                    content: t.data.msg
                }));
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
    onLoad: function(n) {
        t.authority(), this.setData({
            height: t.globalData.height,
            copyright: t.globalData.copyright,
            design: t.globalData.design
        });
    },
    onShow: function() {
        wx.hideTabBar(), t.editTabbar(), t.check_user_status(), this.get_user_info(), this.get_diy(), 
        this.authority();
    },
    authority: function() {
        var a = t.api_root + "User/get_authority", i = this, e = t.getCache("userinfo"), o = new Object();
        o.token = e.token, o.openid = e.openid, o.much_id = t.siteInfo.uniacid, n.POST(a, {
            params: o,
            success: function(t) {
                i.setData({
                    copyright: t.data
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
    get_user_info: function() {
        var i = t.api_root + "User/get_user_info", e = this, o = t.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, n.POST(i, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
                    user_info: t.data.info,
                    flag: 1 == t.data.info.is_sign
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
    onShareAppMessage: function() {
        var n = t.globalData.forward;
        return console.log(n), n ? {
            title: n.title,
            path: "/yl_welore/pages/index/index",
            imageUrl: n.reis_img,
            success: function(t) {
                a({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                a({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/index/index",
            success: function(t) {
                a({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                a({
                    content: "转发失败"
                });
            }
        };
    }
});