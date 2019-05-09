var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        isIpx: t.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            title: "我的订单",
            height: 2 * t.globalData.height + 20
        },
        current: "tab1",
        my_list: [],
        refund_mod: !1,
        refund_del: !1,
        ok_mod: !1,
        page: 1
    },
    onLoad: function(e) {
        this.setData({
            height: t.globalData.height
        }), this.up_user_smail();
    },
    onShow: function() {},
    refund_mod: function(t) {
        this.setData({
            refund_mod: !0,
            id: t.currentTarget.dataset.id
        });
    },
    ok_mod: function(t) {
        this.setData({
            ok_mod: !0,
            id: t.currentTarget.dataset.id
        });
    },
    hideModal: function() {
        this.setData({
            refund_mod: !1,
            refund_del: !1,
            ok_mod: !1
        });
    },
    refund_del: function(t) {
        this.setData({
            refund_del: !0,
            id: t.currentTarget.dataset.id
        });
    },
    bindTextAreaBlur: function(t) {
        this.setData({
            refund_text: t.detail.value
        });
    },
    ok_mod_do: function() {
        var n = this, i = t.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.much_id = t.siteInfo.uniacid, s.uid = i.uid, 
        s.id = this.data.id;
        var o = t.api_root + "User/ok_mod_do";
        e.POST(o, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (a({
                    content: t.data.msg
                }), n.setData({
                    my_list: [],
                    page: 1
                }), n.hideModal(), n.up_user_smail()) : a({
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
    refund_del_do: function() {
        var n = this, i = t.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.much_id = t.siteInfo.uniacid, s.uid = i.uid, 
        s.id = this.data.id;
        var o = t.api_root + "User/refund_del_do";
        e.POST(o, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (a({
                    content: t.data.msg
                }), n.setData({
                    my_list: [],
                    page: 1
                }), n.hideModal(), n.up_user_smail()) : a({
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
    refund_do: function() {
        var n = this, i = t.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.much_id = t.siteInfo.uniacid, s.uid = i.uid, 
        s.refund_text = this.data.refund_text, s.id = this.data.id;
        var o = t.api_root + "User/order_refund";
        e.POST(o, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (a({
                    content: t.data.msg
                }), n.setData({
                    my_list: [],
                    page: 1
                }), n.hideModal(), n.up_user_smail()) : a({
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
    handleChange: function(t) {
        var e = t.detail;
        this.setData({
            my_list: [],
            page: 1,
            current: e.key
        }), this.up_user_smail();
    },
    up_user_smail: function() {
        var n = this, i = t.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.much_id = t.siteInfo.uniacid, s.uid = i.uid, 
        s.order_type = this.data.current, s.page = this.data.page;
        var o = t.api_root + "User/get_order_list", d = n.data.my_list;
        e.POST(o, {
            params: s,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) d.push(t.data.info[e]);
                    n.setData({
                        my_list: d
                    });
                } else a({
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
        }), this.up_user_smail(), a.hide();
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