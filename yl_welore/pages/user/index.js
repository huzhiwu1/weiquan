var app = getApp(), http = require("../../util/http.js"), _require = require("../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        check_phone: !1,
        user_current: "user",
        user_info: {},
        nvabarData: {
            showCapsule: 0,
            title: "会员中心",
            height: 2 * app.globalData.height + 20
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
    hideModal: function() {
        this.setData({
            check_phone: !1
        });
    },
    getPhoneNumber: function(t) {
        if ("getPhoneNumber:ok" == t.detail.errMsg) {
            var a = app.api_root + "User/get_user_phone", e = this, i = app.getCache("userinfo"), n = new Object();
            n.token = i.token, n.openid = i.openid, n.uid = i.uid, n.much_id = app.siteInfo.uniacid, 
            n.encryptedData = t.detail.encryptedData, n.iv = t.detail.iv, n.sessionKey = i.sessionKey, 
            http.POST(a, {
                params: n,
                success: function(t) {
                    $Toast({
                        content: t.data.msg
                    }), e.setData({
                        check_phone: !1
                    }), e.get_user_info();
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
        }
    },
    plus: function() {
        var t = this;
        console.log(t.data.isPopping), 0 == t.data.isPopping ? (t.popp(), t.setData({
            isPopping: !0,
            user_current: "add"
        })) : 1 == t.data.isPopping && (t.takeback(), t.setData({
            isPopping: !1,
            user_current: "user"
        }));
    },
    popp: function() {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), a = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), i = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), n = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), o = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), s = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        });
        t.rotateZ(225).step(), a.translate(90, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        e.translate(90, -105).rotateZ(360).opacity(1).width("60px").step(), i.translate(-10, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        n.translate(-110, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        0 == this.data.version && s.translate(180, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        o.backgroundColor("#F7F9FA").height(190).step(), this.setData({
            animPlus: t.export(),
            animCollect1: e.export(),
            animCollect: a.export(),
            animTranspond: i.export(),
            animInput: n.export(),
            animationM: s.export(),
            animBack: o.export()
        });
    },
    takeback: function() {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), a = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), i = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), n = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), o = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        });
        t.rotateZ(0).step(), a.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        e.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), i.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        o.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), n.backgroundColor("transparent").height(45).step(), 
        this.setData({
            animPlus: t.export(),
            animCollect: a.export(),
            animTranspond: e.export(),
            animInput: i.export(),
            animationM: o.export(),
            animBack: n.export()
        });
    },
    get_aa_dd: function(t) {
        var a = t.detail;
        "home" == a.key && wx.redirectTo({
            url: "/yl_welore/pages/index/index"
        }), "plaza" == a.key && wx.redirectTo({
            url: "/yl_welore/pages/circle/index"
        }), "goods" == a.key && wx.redirectTo({
            url: "/yl_welore/pages/shell_mall/index"
        }), "user" == a.key && wx.redirectTo({
            url: "/yl_welore/pages/user/index"
        }), "add" == a.key && this.plus();
    },
    nav_add: function(t) {
        this.setData({
            copyright: app.globalData.copyright
        });
        var a = t.currentTarget.dataset.k, e = this.data.diy;
        if (1 != this.data.copyright.force_phone_arbor || this.data.user_info.user_phone) {
            if ("tuwen" == a && wx.navigateTo({
                url: "/yl_welore/pages/packageA/add/index?type=0&fa_class=0&name="
            }), "tuya" == a) if (1 == e.user_vip.graffiti_member) {
                if (1 != e.vip) return void $Toast({
                    content: "此功能仅限VIP用户使用"
                });
                wx.navigateTo({
                    url: "/yl_welore/pages/packageA/canvas/index?type=0&fa_class=0&name="
                });
            } else wx.navigateTo({
                url: "/yl_welore/pages/packageA/canvas/index?type=0&fa_class=0&name="
            });
            if ("yuyin" == a) if (1 == e.user_vip.voice_member) {
                if (1 != e.vip) return void $Toast({
                    content: "此功能仅限VIP用户使用"
                });
                wx.navigateTo({
                    url: "/yl_welore/pages/packageA/add/index?type=1&fa_class=0&name="
                });
            } else wx.navigateTo({
                url: "/yl_welore/pages/packageA/add/index?type=1&fa_class=0&name="
            });
            if ("shipin" == a) if (1 == e.user_vip.video_member) {
                if (1 != e.vip) return void $Toast({
                    content: "此功能仅限VIP用户使用"
                });
                wx.navigateTo({
                    url: "/yl_welore/pages/packageA/add/index?type=2&fa_class=0&name="
                });
            } else wx.navigateTo({
                url: "/yl_welore/pages/packageA/add/index?type=2&fa_class=0&name="
            });
        } else this.setData({
            check_phone: !0
        });
    },
    get_diy: function() {
        var t = app.api_root + "User/get_diy", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.uid = e.uid, i.much_id = app.siteInfo.uniacid, 
        i.version = app.version, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), a.setData({
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
        console.log("animate");
        var t = wx.createAnimation({
            duration: 750,
            timingFunction: "ease"
        });
        (this.animation = t).opacity(1).step(), this.setData({
            animationData: t.export()
        });
    },
    bid_qiandao: function() {
        wx.vibrateShort();
        var t = this;
        console.log("animate");
        var a = wx.createAnimation({
            duration: 750,
            timingFunction: "ease"
        });
        (this.animation = a).opacity(0).step(), t.setData({
            animationData: a.export()
        }), setTimeout(function() {
            t.user_punch();
        }, 400);
    },
    bid_qiandao_d: function() {
        var t = this, a = t.data.user_info;
        a.is_sign = 1, t.setData({
            user_info: a
        });
        var e = wx.createAnimation({
            duration: 200,
            timingFunction: "linear"
        });
        (this.animation = e).opacity(1).step(), t.setData({
            animationDataD: e.export()
        }), setTimeout(function() {
            e.opacity(1).scale(.4).step(), t.setData({
                animationDataD: e.export()
            });
        }, 200);
    },
    user_punch: function() {
        var t = app.api_root + "User/add_user_punch", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.much_id = app.siteInfo.uniacid, i.uid = e.uid, 
        http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.bid_qiandao_d()) : (a.show_qian(), $Toast({
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
    onLoad: function(t) {
        app.authority(), this.setData({
            height: app.globalData.height,
            copyright: app.globalData.copyright,
            design: app.globalData.design
        });
    },
    onShow: function() {
        app.check_user_status(), this.get_user_info(), this.get_diy(), this.setData({
            isPopping: !1
        }), this.takeback();
    },
    get_user_info: function() {
        var t = app.api_root + "User/get_user_info", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    user_info: t.data.info,
                    flag: 1 == t.data.info.is_sign
                }) : $Toast({
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
        var t = app.globalData.forward;
        return console.log(t), t ? {
            title: t.title,
            path: "/yl_welore/pages/index/index",
            imageUrl: t.reis_img,
            success: function(t) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                $Toast({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/index/index",
            success: function(t) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                $Toast({
                    content: "转发失败"
                });
            }
        };
    }
});