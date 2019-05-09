function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

var e, a = getApp(), n = require("../../../10E9B8307EC361BF768FD0371DAD8A51.js"), i = require("../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: (e = {
        tabbar: {},
        user_info: {},
        plaza_current: "plaza",
        nvabarData: {
            showCapsule: 0,
            title: "广场",
            height: 2 * a.globalData.height + 20
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
    }, t(e, "diy", {}), t(e, "isPopping", !1), t(e, "animPlus", {}), t(e, "animCollect1", {}), 
    t(e, "animCollect", {}), t(e, "animTranspond", {}), t(e, "animInput", {}), t(e, "animBack", {}), 
    t(e, "version", 0), e),
    get_user_info: function() {
        var t = a.api_root + "User/get_user_info", e = this, o = a.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, n.POST(t, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
                    user_info: t.data.info
                }) : i({
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
            height: a.globalData.height,
            design: a.globalData.design
        }), this.get_guanchang(), this.setData({
            info: [],
            tj_list: [],
            page: 1,
            not_jia: !1
        }), this.get_my_trailing(), this.get_tj_list();
    },
    onShow: function() {
        wx.hideTabBar(), a.editTabbar(), a.check_user_status(), this.setData({
            isPopping: !1,
            copyright: a.globalData.copyright
        }), 0 != this.data.is_show && this.authority();
    },
    authority: function() {
        var t = a.api_root + "User/get_authority", e = this, i = a.getCache("userinfo"), o = new Object();
        o.token = i.token, o.openid = i.openid, o.much_id = a.siteInfo.uniacid, n.POST(t, {
            params: o,
            success: function(t) {
                e.setData({
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
    onReachBottom: function() {
        i({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            tj_page: this.data.tj_page + 1
        }), this.get_tj_list(), i.hide();
    },
    get_tj_list: function() {
        var t = this, e = a.getCache("userinfo"), o = new Object();
        o.token = e.token, o.openid = e.openid, o.uid = e.uid, o.much_id = a.siteInfo.uniacid, 
        o.page = t.data.tj_page;
        var s = a.api_root + "User/get_tj_list", c = t.data.tj_list;
        n.POST(s, {
            params: o,
            success: function(e) {
                if (console.log(e), "success" == e.data.status) {
                    0 == e.data.info.length && t.setData({
                        di_msg: !0
                    });
                    for (var a = 0; a < e.data.info.length; a++) c.push(e.data.info[a]);
                    t.setData({
                        tj_list: c
                    });
                } else i({
                    content: e.data.msg
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
        var t = this, e = a.getCache("userinfo"), o = new Object();
        o.token = e.token, o.openid = e.openid, o.uid = e.uid, o.much_id = a.siteInfo.uniacid, 
        o.get_id = -1, o.page = t.data.page;
        var s = a.api_root + "User/get_right_needle", c = t.data.info;
        n.POST(s, {
            params: o,
            success: function(e) {
                if (console.log(e), "success" == e.data.status) {
                    0 == e.data.info.length && t.setData({
                        not_jia: !0
                    });
                    for (var a = 0; a < e.data.info.length; a++) c.push(e.data.info[a]);
                    t.setData({
                        info: c
                    });
                } else i({
                    content: e.data.msg
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
        i({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_my_trailing(), i.hide();
    },
    get_guanchang: function() {
        var t = this, e = a.getCache("userinfo"), o = new Object();
        o.token = e.token, o.openid = e.openid, o.much_id = a.siteInfo.uniacid;
        var s = a.api_root + "User/get_all_needle";
        n.POST(s, {
            params: o,
            success: function(e) {
                console.log(e), "success" == e.data.status ? t.setData({
                    needle: e.data.info
                }) : i({
                    content: e.data.msg
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
        var t = a.globalData.forward;
        return console.log(t), t ? {
            title: t.title,
            path: "/yl_welore/pages/index/index",
            imageUrl: t.reis_img,
            success: function(t) {
                i({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                i({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/index/index",
            success: function(t) {
                i({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                i({
                    content: "转发失败"
                });
            }
        };
    }
});