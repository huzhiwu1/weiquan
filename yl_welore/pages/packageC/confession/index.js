var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = (require("../../../../5E0B68B67EC361BF386D00B1C8BD8A51.js"), 
require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast);

Page({
    data: {
        info: [],
        nvabarData: {
            showCapsule: 0,
            title: "禁言申诉",
            height: 2 * t.globalData.height + 20
        },
        page: 1,
        sc_text: "",
        sc_msg: !1
    },
    onLoad: function(e) {
        this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx
        });
    },
    onShow: function() {
        this.get_user_banned();
    },
    get_user_banned: function() {
        var n = t.api_root + "User/get_user_banned", s = this, i = t.getCache("userinfo"), o = new Object();
        o.token = i.token, o.openid = i.openid, o.much_id = t.siteInfo.uniacid, o.uid = i.uid, 
        e.POST(n, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? s.setData({
                    info: t.data.info
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
    user_mutter: function(t) {
        this.setData({
            sc_msg: !0,
            id: t.currentTarget.dataset.id
        });
    },
    is_sc_text: function(t) {
        this.setData({
            sc_text: t.detail.value
        });
    },
    hideModal: function() {
        this.setData({
            sc_msg: !1
        });
    },
    do_user_mutter: function() {
        var n = t.api_root + "User/do_user_mutter", s = this, i = t.getCache("userinfo"), o = new Object();
        o.token = i.token, o.openid = i.openid, o.much_id = t.siteInfo.uniacid, o.uid = i.uid, 
        o.id = this.data.info[this.data.id].id, o.tory_id = this.data.info[this.data.id].tory_id, 
        o.beget = this.data.sc_text, e.POST(n, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (s.setData({
                    sc_msg: !1
                }), a({
                    content: t.data.msg
                }), s.get_user_banned()) : a({
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
    _navback: function() {
        wx.navigateBack();
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