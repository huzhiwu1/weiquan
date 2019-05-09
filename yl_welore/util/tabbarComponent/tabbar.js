var t = getApp(), e = require("../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast, a = require("../../../10E9B8307EC361BF768FD0371DAD8A51.js");

Component({
    properties: {
        tabbar: {
            type: Object,
            value: {}
        }
    },
    lifetimes: {
        attached: function() {
            this.get_user_info(), this.get_diy(), this.check_login();
        }
    },
    pageLifetimes: {
        show: function() {
            this.setData({
                isPopping: !1
            }), this.takeback();
        }
    },
    data: {
        isIphoneX: t.globalData.isIpx,
        isPopping: !1,
        animPlus: {},
        animCollect1: {},
        animCollect: {},
        animTranspond: {},
        animInput: {},
        animBack: {},
        diy: {},
        user_info: {}
    },
    methods: {
        onTapChild: function(t) {
            var e = {
                id: 999
            }, a = {};
            this.triggerEvent("parentEvent", e, a);
        },
        hideModal: function() {
            this.setData({
                check_phone: !1
            });
        },
        check_login: function() {
            var i = "", n = "";
            wx.checkSession({
                success: function() {
                    console.log(1);
                },
                fail: function() {
                    console.log(2), wx.login({
                        success: function(o) {
                            if (o.code) {
                                var s = t.api_root + "Login/index", r = new Object();
                                r.code = o.code, r.much_id = t.siteInfo.uniacid, a.POST(s, {
                                    params: r,
                                    success: function(a) {
                                        if (console.log(a), 0 == a.data.code) {
                                            if (a.data.info.errcode) return e({
                                                content: "获取用户信息失败"
                                            }), !1;
                                            i = a.data.info.openid, n = a.data.info.session_key;
                                            var o = t.getCache("userinfo");
                                            o.sessionKey = n, t.setCache("userinfo", o);
                                        }
                                    }
                                });
                            } else e({
                                content: "获取用户信息失败"
                            });
                        }
                    });
                }
            });
        },
        get_diy: function() {
            t.setCache("is_diy", "");
            var e = t.api_root + "User/get_diy", i = this, n = t.getCache("userinfo"), o = new Object();
            o.uid = n.uid, o.token = n.token, o.openid = n.openid, o.much_id = t.siteInfo.uniacid, 
            o.version = t.version, a.POST(e, {
                params: o,
                success: function(t) {
                    console.log(t), i.setData({
                        version: t.data.version,
                        diy: t.data,
                        add: t.data.pattern_data.release.list
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
        getPhoneNumber: function(i) {
            if ("getPhoneNumber:ok" == i.detail.errMsg) {
                var n = t.api_root + "User/get_user_phone", o = this, s = t.getCache("userinfo"), r = new Object();
                r.token = s.token, r.openid = s.openid, r.uid = s.uid, r.much_id = t.siteInfo.uniacid, 
                r.encryptedData = i.detail.encryptedData, r.iv = i.detail.iv, r.sessionKey = s.sessionKey, 
                console.log(r), a.POST(n, {
                    params: r,
                    success: function(t) {
                        e({
                            content: t.data.msg
                        }), o.setData({
                            check_phone: !1
                        }), o.get_user_info();
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
        get_user_info: function() {
            var i = t.api_root + "User/get_user_info", n = this, o = t.getCache("userinfo"), s = new Object();
            s.token = o.token, s.openid = o.openid, a.POST(i, {
                params: s,
                success: function(t) {
                    console.log(t), "success" == t.data.status ? n.setData({
                        user_info: t.data.info
                    }) : e({
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
        preventTouchMove: function() {},
        plus: function() {
            var t = this;
            console.log(t.data.isPopping), 0 == t.data.isPopping ? (t.popp(), t.setData({
                isPopping: !0,
                home_current: "add"
            })) : 1 == t.data.isPopping && (t.takeback(), t.setData({
                isPopping: !1,
                home_current: "home"
            }));
        },
        popp: function() {
            var t = this, e = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            }), a = wx.createAnimation({
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
            }), r = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            });
            e.rotateZ(225).step(), a.translate(90, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
            i.translate(90, -105).rotateZ(360).opacity(1).width("60px").step(), n.translate(-10, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
            o.translate(-110, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
            r.translate(180, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
            s.backgroundColor("#F7F9FA").height(190).step(), t.setData({
                animPlus: e.export(),
                animCollect1: i.export(),
                animCollect: a.export(),
                animTranspond: n.export(),
                animInput: o.export(),
                animationM: r.export(),
                animBack: s.export(),
                version: 0
            });
        },
        takeback: function() {
            var t = this, e = wx.createAnimation({
                duration: 500,
                timingFunction: "ease-out"
            }), a = wx.createAnimation({
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
            e.rotateZ(0).step(), a.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
            i.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), n.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
            s.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), o.backgroundColor("transparent").height(45).step(), 
            t.setData({
                animPlus: e.export(),
                animCollect: a.export(),
                animTranspond: i.export(),
                animInput: n.export(),
                animationM: s.export(),
                animBack: o.export()
            });
        },
        nav_add: function(a) {
            this.setData({
                copyright: t.globalData.copyright
            });
            var i = a.currentTarget.dataset.k, n = this.data.diy;
            if (1 != this.data.copyright.force_phone_arbor || this.data.user_info.user_phone || 0 != this.data.version) {
                if ("tuwen" == i && wx.navigateTo({
                    url: "/yl_welore/pages/packageA/add/index?type=0&fa_class=0&name="
                }), "tuya" == i) if (1 == n.user_vip.graffiti_member) {
                    if (1 != n.vip) return void e({
                        content: "此功能仅限VIP用户使用"
                    });
                    wx.navigateTo({
                        url: "/yl_welore/pages/packageA/canvas/index?type=0&fa_class=0&name="
                    });
                } else wx.navigateTo({
                    url: "/yl_welore/pages/packageA/canvas/index?type=0&fa_class=0&name="
                });
                if ("yuyin" == i) if (1 == n.user_vip.voice_member) {
                    if (1 != n.vip) return void e({
                        content: "此功能仅限VIP用户使用"
                    });
                    wx.navigateTo({
                        url: "/yl_welore/pages/packageA/add/index?type=1&fa_class=0&name="
                    });
                } else wx.navigateTo({
                    url: "/yl_welore/pages/packageA/add/index?type=1&fa_class=0&name="
                });
                if ("shipin" == i) if (1 == n.user_vip.video_member) {
                    if (1 != n.vip) return void e({
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
        }
    }
});