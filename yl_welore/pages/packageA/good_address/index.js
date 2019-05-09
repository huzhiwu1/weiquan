var e = getApp(), t = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = (require("../../../util/wxParse/wxParse.js"), 
require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast);

Page({
    data: {
        isIpx: e.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            title: "收货地址",
            height: 2 * e.globalData.height + 20
        },
        user_info: {},
        is_submit: !1
    },
    onLoad: function(t) {
        e.authority(), this.setData({
            height: e.globalData.height,
            id: t.id,
            copyright: e.globalData.copyright
        }), this.get_user_info();
    },
    onShow: function() {},
    formSubmit: function(n) {
        var i = this;
        i.setData({
            is_submit: !0
        });
        var s = e.api_root + "User/exchange_goods_do", o = e.getCache("userinfo"), c = new Object();
        c.token = o.token, c.openid = o.openid, c.uid = o.uid, c.much_id = e.siteInfo.uniacid, 
        c.id = this.data.id, c.real_name = n.detail.value.real_name, c.phone = n.detail.value.phone, 
        c.address = n.detail.value.address, c.remark = n.detail.value.remarks, t.POST(s, {
            params: c,
            success: function(e) {
                console.log(e), "success" == e.data.status ? (a({
                    content: e.data.msg
                }), setTimeout(function() {
                    wx.redirectTo({
                        url: "/yl_welore/pages/packageA/user_order/index"
                    });
                }, 1500)) : (a({
                    content: e.data.msg
                }), i.setData({
                    is_submit: !1
                }));
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
    },
    get_user_info: function() {
        var n = e.api_root + "User/get_user_info", i = this, s = e.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, t.POST(n, {
            params: o,
            success: function(e) {
                console.log(e), "success" == e.data.status ? i.setData({
                    user_info: e.data.info
                }) : a({
                    content: e.data.msg
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
    },
    _navback: function() {
        var e = getCurrentPages(), t = (e[e.length - 1], e[e.length - 2]);
        1 != e.length ? (t.setData({
            show: !1
        }), wx.navigateBack()) : wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        var t = e.globalData.forward;
        return console.log(t), t ? {
            title: t.title,
            path: "/yl_welore/pages/index/index",
            imageUrl: t.reis_img,
            success: function(e) {
                a({
                    content: "转发成功"
                });
            },
            fail: function(e) {
                a({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/index/index",
            success: function(e) {
                a({
                    content: "转发成功"
                });
            },
            fail: function(e) {
                a({
                    content: "转发失败"
                });
            }
        };
    }
});