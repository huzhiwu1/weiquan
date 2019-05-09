var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = (require("../../../../5E0B68B67EC361BF386D00B1C8BD8A51.js"), 
require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast);

Page({
    data: {
        nvabarData: {
            showCapsule: 0,
            title: "提现",
            height: 2 * t.globalData.height + 20
        },
        setting: {},
        withdraw: !1,
        withdraw_money: "",
        withdraw_number: ""
    },
    onLoad: function(e) {
        this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx,
            page: 1
        });
    },
    onShow: function() {
        this.get_raws_setting();
    },
    get_raws_setting: function() {
        var a = t.api_root + "User/get_raws_setting", i = this, n = t.getCache("userinfo"), s = new Object();
        s.token = n.token, s.openid = n.openid, s.uid = n.uid, s.much_id = t.siteInfo.uniacid, 
        e.POST(a, {
            params: s,
            success: function(t) {
                i.setData({
                    setting: t.data
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
    get_withdraw_card: function(t) {
        this.setData({
            withdraw_number: t.detail.value
        });
    },
    get_money: function(t) {
        var e = t.detail.value.replace(".", "");
        this.setData({
            withdraw_money: e
        });
    },
    withdraw: function() {
        this.setData({
            withdraw: !0
        });
    },
    hideModal: function() {
        this.setData({
            withdraw: !1
        });
    },
    withdraw_do: function() {
        if (this.hideModal(), 1 == this.data.setting.open_offline_payment && "" == this.data.withdraw_number) return a({
            content: "支付宝账号不能为空"
        }), !1;
        if ("" == this.data.withdraw_money || this.data.withdraw_money <= 0) return a({
            content: "提现金额不正确"
        }), !1;
        var i = t.api_root + "User/withdraw", n = this, s = t.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, o.uid = s.uid, o.much_id = t.siteInfo.uniacid, 
        o.withdraw_number = this.data.withdraw_number, o.withdraw_money = this.data.withdraw_money, 
        e.POST(i, {
            params: o,
            success: function(t) {
                console.log(t), n.hideModal(), a("success" == t.data.status ? {
                    content: t.data.msg
                } : {
                    content: t.data.msg
                }), n.setData({
                    withdraw_money: "",
                    withdraw_number: ""
                }), n.get_raws_setting();
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