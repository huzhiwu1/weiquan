var t = getApp(), e = require("../../../10E9B8307EC361BF768FD0371DAD8A51.js"), i = require("../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        tabbar: {},
        user_info: {},
        goods_current: "goods",
        current_scroll: "0",
        isIpx: t.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            height: 2 * t.globalData.height + 20
        },
        title: "",
        page: 1,
        type_list: [],
        type_id: "",
        shop_list: [],
        di_msg: !1,
        show: !0,
        diy: {},
        isPopping: !1,
        animPlus: {},
        animCollect1: {},
        animCollect: {},
        animTranspond: {},
        animInput: {},
        animBack: {},
        version: 0
    },
    get_user_info: function() {
        var s = t.api_root + "User/get_user_info", a = this, n = t.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, e.POST(s, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
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
    get_diy: function() {
        var i = t.api_root + "User/get_diy", s = this, a = t.getCache("userinfo"), n = new Object();
        n.token = a.token, n.uid = a.uid, n.openid = a.openid, n.uid = a.uid, n.much_id = t.siteInfo.uniacid, 
        n.version = t.version, e.POST(i, {
            params: n,
            success: function(t) {
                console.log(t), s.setData({
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
    onLoad: function(e) {
        this.setData({
            height: t.globalData.height,
            title: t.globalData.design.currency + "商城"
        }), this.setData({
            page: 1,
            shop_list: [],
            di_msg: !1
        }), this.get_shop_type();
    },
    handleChangeScroll: function(t) {
        var e = t.detail;
        this.setData({
            current_scroll: e.key,
            type_id: this.data.type_list[e.key].id
        }), this.setData({
            page: 1,
            shop_list: [],
            di_msg: !1
        }), this.get_shop_list();
    },
    onShow: function() {
        wx.hideTabBar(), t.editTabbar(), this.get_diy(), this.setData({
            isPopping: !1,
            copyright: t.globalData.copyright
        }), this.data.show;
    },
    get_shop_type: function() {
        var s = t.api_root + "User/get_shop_type", a = this, n = t.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.uid = n.uid, o.much_id = t.siteInfo.uniacid, 
        e.POST(s, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (t.data.info.length > 0 && (a.setData({
                    type_id: t.data.info[0].id
                }), a.get_shop_list()), a.setData({
                    type_list: t.data.info,
                    user: t.data.user
                })) : i({
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
    get_shop_list: function() {
        var s = t.api_root + "User/get_shop_list", a = this, n = t.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.much_id = t.siteInfo.uniacid, o.type_id = this.data.type_id, 
        o.page = this.data.page;
        var c = a.data.shop_list;
        e.POST(s, {
            params: o,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && a.setData({
                        di_msg: !0
                    });
                    for (var e = 0; e < t.data.info.length; e++) c.push(t.data.info[e]);
                    a.setData({
                        shop_list: c
                    });
                } else i({
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
        i({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_shop_list(), i.hide();
    },
    onPullDownRefresh: function() {
        i({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), setTimeout(function() {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1500), this.setData({
            page: 1,
            shop_list: [],
            di_msg: !1
        }), this.get_shop_list(), i.hide();
    },
    onShareAppMessage: function() {
        var e = t.globalData.forward;
        return console.log(e), e ? {
            title: e.title,
            path: "/yl_welore/pages/index/index",
            imageUrl: e.reis_img,
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