var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../../5E0B68B67EC361BF386D00B1C8BD8A51.js"), n = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        user_info: {},
        nvabarData: {
            showCapsule: 0,
            title: "VIP会员",
            height: 2 * t.globalData.height + 20
        },
        pay_list: [],
        pay_index: 0,
        pay_info: {},
        visible_bei: !1,
        pay: !1,
        animationPay: {},
        pay_money: [ {
            money: 6
        }, {
            money: 30
        }, {
            money: 68
        }, {
            money: 168
        }, {
            money: 328
        }, {
            money: 648
        } ],
        money_index: 0
    },
    onLoad: function(e) {
        t.authority(), this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx,
            design: t.globalData.design,
            copyright: t.globalData.copyright
        }), console.log(this.data.copyright);
    },
    onShow: function() {
        this.get_user_hon(), this.get_user_info();
    },
    get_pay: function() {
        var t = this, e = wx.createAnimation({
            duration: 150,
            timingFunction: "linear"
        });
        t.animation = e, e.translateY(230).step(), t.setData({
            animationPay: e.export(),
            pay: !0
        }), setTimeout(function() {
            e.translateY(0).step(), t.setData({
                animationPay: e.export()
            });
        }, 100);
    },
    no_pay: function() {
        this.setData({
            pay: !1
        });
    },
    beiClose: function() {
        this.setData({
            visible_bei: !1
        });
    },
    beiOk: function() {
        this.setData({
            visible_bei: !1
        }), this.bei_pay();
    },
    get_user_info: function() {
        var a = t.api_root + "User/get_user_info", i = this, o = t.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, e.POST(a, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? i.setData({
                    user_info: t.data.info
                }) : n({
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
    get_user_hon: function() {
        var a = this, i = t.getCache("userinfo"), o = new Object();
        o.token = i.token, o.openid = i.openid, o.uid = i.uid, o.much_id = t.siteInfo.uniacid;
        var s = t.api_root + "User/get_user_honorary";
        e.POST(s, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    pay_list: t.data.info,
                    pay_info: t.data.info[0]
                }) : n({
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
    get_pay_index: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            pay_index: e,
            pay_info: this.data.pay_list[e]
        });
    },
    get_pay_money: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            money_index: e
        });
    },
    pay_check: function() {
        this.setData({
            visible_bei: !0
        });
    },
    bei_pay: function() {
        var a = this, i = t.getCache("userinfo"), o = new Object();
        o.token = i.token, o.openid = i.openid, o.uid = i.uid, o.much_id = t.siteInfo.uniacid, 
        o.time = this.data.pay_info.time;
        var s = t.api_root + "Pay/index";
        e.POST(s, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (n({
                    content: t.data.msg
                }), a.get_user_info(), a.get_user_hon()) : 1 == a.data.copyright.recharge_arbor ? (n({
                    content: t.data.msg
                }), a.get_pay()) : n({
                    content: "余额不足！"
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
    pay_submit: function() {
        var i = this.data.pay_money[this.data.money_index].money, o = this, s = t.getCache("userinfo"), c = new Object();
        c.token = s.token, c.openid = s.openid, c.uid = s.uid, c.much_id = t.siteInfo.uniacid, 
        c.money = i;
        var u = t.api_root + "Pay/do_pay";
        e.POST(u, {
            params: c,
            success: function(t) {
                if (console.log(t), "OK" == t.data.return_msg) {
                    var e = (Date.parse(new Date()) / 1e3).toString(), i = "prepay_id=" + t.data.prepay_id, s = t.data.nonce_str, c = a.hexMD5("appId=" + t.data.appid + "&nonceStr=" + s + "&package=" + i + "&signType=MD5&timeStamp=" + e + "&key=" + t.data.app_info.app_key).toUpperCase();
                    wx.requestPayment({
                        timeStamp: e,
                        nonceStr: s,
                        package: i,
                        signType: "MD5",
                        paySign: c,
                        success: function(t) {
                            n({
                                content: "充值成功！"
                            }), o.get_user_info(), o.no_pay();
                        },
                        complete: function() {
                            o.get_user_info(), o.no_pay();
                        }
                    });
                } else n({
                    content: t.data.msg
                }), o.get_pay();
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
                n({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                n({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/index/index",
            success: function(t) {
                n({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                n({
                    content: "转发失败"
                });
            }
        };
    }
});