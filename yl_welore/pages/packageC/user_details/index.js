var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../../5E0B68B67EC361BF386D00B1C8BD8A51.js"), n = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        current: "tab1",
        user_info: {},
        nvabarData: {
            showCapsule: 0,
            title: "零钱明细",
            height: 2 * t.globalData.height + 20
        },
        pay_list: [],
        pay_index: 0,
        pay_info: {},
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
        }, {
            money: 1
        } ],
        money_index: 0,
        amount_list: [],
        page: 1,
        di_msg: !1,
        yes_mod: !1,
        withdraw: !1,
        withdraw_number: "",
        dh_confer_t: !1,
        dh_confer_j: !1,
        ji_money: "0.00",
        bei_money: "",
        ji_money_b: "0.00",
        bei_money_b: ""
    },
    onLoad: function(e) {
        t.authority(), this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx,
            page: 1,
            design: t.globalData.design,
            copyright: t.globalData.copyright
        }), console.log(this.data.copyright), this.get_user_info(), this.get_user_amount();
    },
    onShow: function() {},
    dh_confer: function() {
        this.setData({
            dh_confer_t: !0
        });
    },
    get_num: function(t) {
        var e = t.detail.value;
        if ("" != e) {
            var a = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;
            e = a.test(e) ? e.replace(a, "$2$3$4") : "", console.log(this.data.user_info.conch), 
            console.log(e), parseFloat(e) > parseFloat(this.data.user_info.conch) && (e = this.data.user_info.conch), 
            this.setData({
                ji_money: (10 * e).toFixed(2),
                bei_money: e
            });
        } else this.setData({
            ji_money: "0.00",
            bei_money: ""
        });
    },
    get_num_b: function(t) {
        var e = t.detail.value;
        if (console.log(e), "" != e) {
            var a = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;
            e = a.test(e) ? e.replace(a, "$2$3$4") : "", console.log(this.data.user_info.fraction), 
            console.log(e), parseFloat(e) > parseFloat(this.data.user_info.fraction) && (e = this.data.user_info.fraction);
            var n = (e / 10).toFixed(3), o = n.substr(0, n.length - 1);
            this.setData({
                ji_money_b: o,
                bei_money_b: e
            });
        } else this.setData({
            ji_money_b: "0.00",
            bei_money_b: ""
        });
    },
    add_bei_ji: function() {
        var a = this;
        if ("" == a.data.bei_money || a.data.bei_money <= 0) n({
            content: "请填写正确兑换的数量"
        }); else {
            var o = t.api_root + "User/add_bei_ji", i = t.getCache("userinfo"), s = new Object();
            s.token = i.token, s.openid = i.openid, s.uid = i.uid, s.much_id = t.siteInfo.uniacid, 
            s.bei_money = a.data.bei_money, e.POST(o, {
                params: s,
                success: function(t) {
                    console.log(t), "success" == t.data.status ? (a.setData({
                        page: 1
                    }), n({
                        content: t.data.msg
                    }), a.hideModal(), a.get_user_info(), a.get_user_amount()) : n({
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
        }
    },
    set_this_money: function(t) {
        var e = t.detail.value, a = this.data.pay_money;
        a[6].money = e, this.setData({
            pay_money: a
        });
    },
    hideModal: function() {
        this.setData({
            dh_confer_j: !1,
            withdraw: !1,
            withdraw_card: !1,
            dh_confer_t: !1,
            ji_money: "0.00",
            bei_money: "",
            ji_money_b: "0.00",
            bei_money_b: ""
        });
    },
    yes_mod: function() {
        this.setData({
            dh_confer_j: !0
        });
    },
    get_ji_bei: function() {
        var a = this;
        if ("" == a.data.bei_money_b || a.data.bei_money_b <= 0) n({
            content: "请填写正确兑换的数量"
        }); else {
            var o = t.api_root + "User/get_ji_bei", i = t.getCache("userinfo"), s = new Object();
            s.token = i.token, s.openid = i.openid, s.uid = i.uid, s.much_id = t.siteInfo.uniacid, 
            s.bei_money_b = a.data.ji_money_b, e.POST(o, {
                params: s,
                success: function(t) {
                    console.log(t), "success" == t.data.status ? (a.hideModal(), a.setData({
                        page: 1
                    }), n({
                        content: t.data.msg
                    }), a.get_user_info(), a.get_user_amount()) : (a.setData({
                        yes_mod: !1
                    }), n({
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
        }
    },
    handleChange: function(t) {
        var e = t.detail;
        this.setData({
            amount_list: [],
            page: 1
        }), this.setData({
            current: e.key
        }), this.get_user_amount();
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
    get_user_amount: function() {
        var a = t.api_root + "User/get_user_amount", o = this, i = t.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.uid = i.uid, s.much_id = t.siteInfo.uniacid, 
        s.page = this.data.page, s.evaluate = this.data.current;
        var c = o.data.amount_list;
        e.POST(a, {
            params: s,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && o.setData({
                        di_msg: !0
                    });
                    for (var e = 0; e < t.data.info.length; e++) c.push(t.data.info[e]);
                    o.setData({
                        amount_list: c,
                        setting: t.data.setting
                    });
                } else n({
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
    get_user_info: function() {
        var a = t.api_root + "User/get_user_info", o = this, i = t.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, e.POST(a, {
            params: s,
            success: function(t) {
                if ("success" == t.data.status) {
                    var e = (t.data.info.fraction / 10).toFixed(3);
                    o.setData({
                        user_info: t.data.info,
                        dd_fraction: e.substring(0, e.length - 1),
                        bei_ji: o.data.copyright.conch_convert - t.data.info.bei_ji < 0 ? 0 : o.data.copyright.conch_convert - t.data.info.bei_ji,
                        bei_ji_b: o.data.copyright.fraction_convert - t.data.info.ji_bei < 0 ? 0 : o.data.copyright.fraction_convert - t.data.info.ji_bei
                    });
                } else n({
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
    get_pay_money: function(t) {
        var e = t.currentTarget.dataset.index;
        this.setData({
            money_index: e
        });
    },
    pay_submit: function() {
        var o = this.data.pay_money[this.data.money_index].money;
        if (console.log(o), o) {
            var i = this, s = t.getCache("userinfo"), c = new Object();
            c.token = s.token, c.openid = s.openid, c.uid = s.uid, c.much_id = t.siteInfo.uniacid, 
            c.money = o;
            var _ = t.api_root + "Pay/do_pay";
            e.POST(_, {
                params: c,
                success: function(t) {
                    if (console.log(t), "OK" == t.data.return_msg) {
                        var e = (Date.parse(new Date()) / 1e3).toString(), o = "prepay_id=" + t.data.prepay_id, s = t.data.nonce_str, c = a.hexMD5("appId=" + t.data.appid + "&nonceStr=" + s + "&package=" + o + "&signType=MD5&timeStamp=" + e + "&key=" + t.data.app_info.app_key).toUpperCase();
                        wx.requestPayment({
                            timeStamp: e,
                            nonceStr: s,
                            package: o,
                            signType: "MD5",
                            paySign: c,
                            success: function(t) {
                                n({
                                    content: "充值成功！"
                                }), i.setData({
                                    page: 1,
                                    amount_list: []
                                }), i.get_user_info(), i.no_pay(), i.get_user_amount();
                            },
                            complete: function() {
                                i.setData({
                                    page: 1,
                                    amount_list: []
                                }), i.get_user_info(), i.no_pay(), i.get_user_amount();
                            }
                        });
                    } else n({
                        content: "参数错误！"
                    }), i.get_pay();
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
        } else n({
            content: "充值金额错误！"
        });
    },
    onPullDownRefresh: function() {
        n({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), setTimeout(function() {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1500), this.get_user_info(), this.get_user_amount(), n.hide();
    },
    onReachBottom: function() {
        n({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_user_amount(), n.hide();
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