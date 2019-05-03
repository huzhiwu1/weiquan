var _data;

function _defineProperty(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var app = getApp(), http = require("../../util/http.js"), _require = require("../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: (_data = {
        user_info: {},
        check_phone: !1,
        plaza_current: "plaza",
        nvabarData: {
            showCapsule: 0,
            title: "广场",
            height: 2 * app.globalData.height + 20
        },
        diy: "",
        needle: [],
        info: [],
        page: 1,
        tj_page: 1,
        tj_list: [],
        is_show: !0,
        not_jia: !1,
        di_msg: !1
    }, _defineProperty(_data, "diy", {}), _defineProperty(_data, "isPopping", !1), _defineProperty(_data, "animPlus", {}), 
    _defineProperty(_data, "animCollect1", {}), _defineProperty(_data, "animCollect", {}), 
    _defineProperty(_data, "animTranspond", {}), _defineProperty(_data, "animInput", {}), 
    _defineProperty(_data, "animBack", {}), _defineProperty(_data, "version", 0), _data),
    hideModal: function() {
        this.setData({
            check_phone: !1
        });
    },
    getPhoneNumber: function(t) {
        if ("getPhoneNumber:ok" == t.detail.errMsg) {
            var e = app.api_root + "User/get_user_phone", a = this, i = app.getCache("userinfo"), n = new Object();
            n.token = i.token, n.openid = i.openid, n.uid = i.uid, n.much_id = app.siteInfo.uniacid, 
            n.encryptedData = t.detail.encryptedData, n.iv = t.detail.iv, n.sessionKey = i.sessionKey, 
            http.POST(e, {
                params: n,
                success: function(t) {
                    $Toast({
                        content: t.data.msg
                    }), a.setData({
                        check_phone: !1
                    }), a.get_user_info();
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
        var t = app.api_root + "User/get_user_info", e = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
                    user_info: t.data.info
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
    nav_add: function(t) {
        this.setData({
            copyright: app.globalData.copyright
        });
        var e = t.currentTarget.dataset.k, a = this.data.diy;
        if (1 != this.data.copyright.force_phone_arbor || this.data.user_info.user_phone) {
            if ("tuwen" == e && wx.navigateTo({
                url: "/yl_welore/pages/packageA/add/index?type=0&fa_class=0&name="
            }), "tuya" == e) if (1 == a.user_vip.graffiti_member) {
                if (1 != a.vip) return void $Toast({
                    content: "此功能仅限VIP用户使用"
                });
                wx.navigateTo({
                    url: "/yl_welore/pages/packageA/canvas/index?type=0&fa_class=0&name="
                });
            } else wx.navigateTo({
                url: "/yl_welore/pages/packageA/canvas/index?type=0&fa_class=0&name="
            });
            if ("yuyin" == e) if (1 == a.user_vip.voice_member) {
                if (1 != a.vip) return void $Toast({
                    content: "此功能仅限VIP用户使用"
                });
                wx.navigateTo({
                    url: "/yl_welore/pages/packageA/add/index?type=1&fa_class=0&name="
                });
            } else wx.navigateTo({
                url: "/yl_welore/pages/packageA/add/index?type=1&fa_class=0&name="
            });
            if ("shipin" == e) if (1 == a.user_vip.video_member) {
                if (1 != a.vip) return void $Toast({
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
        var t = app.api_root + "User/get_diy", e = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, i.much_id = app.siteInfo.uniacid, i.version = app.version, 
        i.uid = a.uid, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), e.setData({
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
    get_aa_dd: function(t) {
        var e = t.detail;
        "home" == e.key && wx.redirectTo({
            url: "/yl_welore/pages/index/index"
        }), "plaza" == e.key && wx.redirectTo({
            url: "/yl_welore/pages/circle/index"
        }), "goods" == e.key && wx.redirectTo({
            url: "/yl_welore/pages/shell_mall/index"
        }), "user" == e.key && wx.redirectTo({
            url: "/yl_welore/pages/user/index"
        }), "add" == e.key && this.plus();
    },
    onLoad: function(t) {
        this.setData({
            height: app.globalData.height,
            design: app.globalData.design
        }), this.get_guanchang(), this.setData({
            info: [],
            tj_list: [],
            page: 1,
            not_jia: !1
        }), this.get_my_trailing(), this.get_tj_list();
    },
    onShow: function() {
        app.check_user_status(), this.get_diy(), this.setData({
            isPopping: !1,
            copyright: app.globalData.copyright
        }), this.takeback(), this.data.is_show;
    },
    plus: function() {
        var t = this;
        console.log(t.data.isPopping), 0 == t.data.isPopping ? (t.popp(), t.setData({
            isPopping: !0,
            plaza_current: "add"
        })) : 1 == t.data.isPopping && (t.takeback(), t.setData({
            isPopping: !1,
            plaza_current: "plaza"
        }));
    },
    popp: function() {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), e = wx.createAnimation({
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
        t.rotateZ(225).step(), e.translate(90, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        a.translate(90, -105).rotateZ(360).opacity(1).width("60px").step(), i.translate(-10, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        n.translate(-110, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        0 == this.data.version && s.translate(180, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        o.backgroundColor("#F7F9FA").height(190).step(), this.setData({
            animPlus: t.export(),
            animCollect1: a.export(),
            animCollect: e.export(),
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
        }), e = wx.createAnimation({
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
        });
        t.rotateZ(0).step(), e.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        a.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), i.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        o.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), n.backgroundColor("transparent").height(45).step(), 
        this.setData({
            animPlus: t.export(),
            animCollect: e.export(),
            animTranspond: a.export(),
            animInput: i.export(),
            animationM: o.export(),
            animBack: n.export()
        });
    },
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            tj_page: this.data.tj_page + 1
        }), this.get_tj_list(), $Toast.hide();
    },
    get_tj_list: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.uid = t.uid, e.much_id = app.siteInfo.uniacid, 
        e.page = a.data.tj_page;
        var i = app.api_root + "User/get_tj_list", n = a.data.tj_list;
        http.POST(i, {
            params: e,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && a.setData({
                        di_msg: !0
                    });
                    for (var e = 0; e < t.data.info.length; e++) n.push(t.data.info[e]);
                    a.setData({
                        tj_list: n
                    });
                } else $Toast({
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
    get_my_trailing: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.uid = t.uid, e.much_id = app.siteInfo.uniacid, 
        e.get_id = -1, e.page = a.data.page;
        var i = app.api_root + "User/get_right_needle", n = a.data.info;
        http.POST(i, {
            params: e,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && a.setData({
                        not_jia: !0
                    });
                    for (var e = 0; e < t.data.info.length; e++) n.push(t.data.info[e]);
                    a.setData({
                        info: n
                    });
                } else $Toast({
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
    nex_my_qq: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_my_trailing(), $Toast.hide();
    },
    get_guanchang: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid;
        var i = app.api_root + "User/get_all_needle";
        http.POST(i, {
            params: a,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
                    needle: t.data.info
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
    previewImage: function(t) {
        this.setData({
            is_show: !1
        });
        var e = t.target.dataset.src, a = (t.target.dataset.id, t.target.dataset.key);
        wx.previewImage({
            current: e,
            urls: this.data.tj_list[a].img
        });
    },
    onPullDownRefresh: function() {
        setTimeout(function() {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1500), this.onLoad();
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