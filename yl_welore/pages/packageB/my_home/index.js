var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        show: !0,
        sex: 1,
        user_info: {},
        current: "tab1",
        index_page: 1,
        pay_index: 1,
        data_list: [],
        new_list: [],
        page: 1,
        pay_di: !1,
        my_di: !1,
        del_mod: !1,
        liwu: !1,
        animationDataLi: {},
        li_number: 1,
        li_list: [],
        home_pl_check: !1,
        pl_id: 0,
        home_pl_text: ""
    },
    onLoad: function(e) {
        this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx,
            id: e.id,
            design: t.globalData.design
        }), this.get_user_info(), this.get_liwu_all(), this.get_my_list();
    },
    onShow: function() {
        var e = t.getCache("userinfo");
        this.setData({
            uid: e.uid
        }), this.get_user_info();
    },
    home_pl: function(t) {
        console.log(t), this.setData({
            home_pl_check: !0,
            pl_id: t.currentTarget.dataset.id,
            pl_key: t.currentTarget.dataset.key,
            pl_wey: t.currentTarget.dataset.wey
        });
    },
    home_pl_cai: function(t) {
        this.setData({
            home_pl_text: t.detail.value
        });
    },
    do_user_pl: function() {
        if ("" != this.data.home_pl_text) {
            wx.showLoading({
                title: "评论中...",
                mask: !0
            });
            var i = this, n = t.getCache("userinfo"), s = new Object();
            s.token = n.token, s.openid = n.openid, s.much_id = t.siteInfo.uniacid, s.uid = n.uid, 
            s.text = this.data.home_pl_text, s.id = this.data.pl_id, s.reply_type = 0;
            var o = t.api_root + "User/add_paper_reply";
            e.POST(o, {
                params: s,
                success: function(t) {
                    if (console.log(t), "success" == t.data.status) {
                        a({
                            content: t.data.msg
                        }), i.hideModal();
                        var e = i.data.new_list;
                        console.log(e), e[i.data.pl_wey].list[i.data.pl_key].study_repount = parseInt(e[i.data.pl_wey].list[i.data.pl_key].study_repount) + 1, 
                        i.setData({
                            new_list: e
                        }), wx.hideLoading();
                    } else a({
                        content: t.data.msg
                    }), wx.hideLoading();
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
        } else a({
            content: "内容不能为空！"
        });
    },
    preventTouchMove: function() {},
    get_liwu_all: function() {
        var a = this, i = t.getCache("userinfo"), n = new Object();
        n.token = i.token, n.openid = i.openid, n.much_id = t.siteInfo.uniacid, n.uid = i.uid;
        var s = t.api_root + "User/get_liwu";
        e.POST(s, {
            params: n,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    li_list: t.data.info,
                    user_liwu: t.data.user_info
                }) : a.setData({
                    li_if: !0,
                    li_msg: t.data.msg
                }), setTimeout(function() {
                    a.setData({
                        li_if: !1
                    });
                }, 3e3);
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
    get_liwu: function() {
        this.setData({
            liwu: !0
        });
    },
    liwu_index: function(t) {
        var e = t.currentTarget.dataset.k, a = (t.currentTarget.dataset.id, this.data.li_list[e]);
        this.setData({
            li_index: e,
            li_number: 1,
            li_sum: a.tr_conch
        });
    },
    colse_li: function() {
        this.setData({
            liwu: !1
        });
    },
    reward: function() {
        var i = this, n = t.getCache("userinfo"), s = new Object();
        s.token = n.token, s.openid = n.openid, s.num = this.data.li_number, s.uid = n.uid, 
        s.user_id = this.data.id, s.much_id = t.siteInfo.uniacid, s.li_id = this.data.li_list[this.data.li_index].id;
        var o = t.api_root + "User/user_reward";
        e.POST(o, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (a({
                    content: t.data.msg
                }), i.get_user_info(), i.get_liwu_all()) : a({
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
    handleChange1: function(t) {
        var e = t.detail.value, a = this.data.li_list[this.data.li_index];
        this.setData({
            li_number: e,
            li_sum: (a.tr_conch * e).toFixed(2)
        });
    },
    handleChange: function(t) {
        var e = t.detail;
        a({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            data_list: [],
            new_list: [],
            page: 1,
            index_page: 1,
            pay_di: !1,
            my_di: !1
        }), "tab1" == e.key && this.get_my_list(), "tab2" == e.key && this.get_my_pay(), 
        this.setData({
            current: e.key
        });
    },
    cancel: function() {
        var i = t.api_root + "User/get_user_cancel", n = this, s = t.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, o.much_id = t.siteInfo.uniacid, o.uid = this.data.id, 
        o.this_uid = s.uid, o.is_user = this.data.user_info.is_user, e.POST(i, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (a({
                    content: t.data.msg
                }), n.get_user_info()) : a({
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
    guard: function() {
        wx.navigateTo({
            url: "/yl_welore/pages/packageB/user_guard/index?id=" + this.data.id
        });
    },
    get_user_info: function() {
        var i = t.api_root + "User/get_user_info_my", n = this, s = t.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, o.uid = this.data.id, o.much_id = t.siteInfo.uniacid, 
        o.this_uid = s.uid, e.POST(i, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? n.setData({
                    user_info: t.data.info,
                    sex: t.data.info.gender
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
    get_my_list: function() {
        var i = t.api_root + "User/get_my_list", n = this, s = t.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, o.uid = s.uid, o.much_id = t.siteInfo.uniacid, 
        o.id = this.data.id, o.type = this.data.current, o.index_page = this.data.index_page;
        var d = this.data.new_list;
        e.POST(i, {
            params: o,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && n.setData({
                        my_di: !0
                    });
                    for (var e = 0; e < t.data.info.length; e++) d.push(t.data.info[e]);
                    n.setData({
                        new_list: d
                    }), a.hide();
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
    del_mod: function(t) {
        var e = t.currentTarget.dataset.id;
        this.setData({
            paper_id: e,
            del_mod: !0
        });
    },
    hideModal: function() {
        this.setData({
            del_mod: !1,
            home_pl_check: !1
        });
    },
    onReachBottom: function() {
        a({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), "tab1" == this.data.current && (this.setData({
            index_page: this.data.index_page + 1
        }), this.get_my_list()), "tab2" == this.data.current && (this.setData({
            page: this.data.page + 1
        }), this.get_my_pay()), a.hide();
    },
    _navback: function() {
        var t = getCurrentPages(), e = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (e.setData({
            show: !1
        }), wx.navigateBack()) : this._backhome();
    },
    _backhome: function() {
        wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        var e = t.globalData.forward;
        return this.setData({
            show: !1
        }), e ? {
            title: e.title,
            path: "/yl_welore/pages/packageB/my_home/index?id=" + this.data.id,
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
            path: "/yl_welore/pages/packageB/my_home/index?id=" + this.data.id,
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