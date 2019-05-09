var t = getApp(), e = require("../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = 1, i = 1, n = require("../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast, s = wx.createInnerAudioContext();

Page({
    data: {
        tabbar: {},
        copyright: {},
        isIpx: t.globalData.isIpx,
        user_info: {},
        home_current: "home",
        http_root: t.http_root,
        visible: !1,
        actions_name: "按发帖时间",
        actions: [ {
            name: "按发帖时间",
            type: "fatie"
        }, {
            name: "按最后回帖时间",
            type: "huifu"
        } ],
        new_list: [],
        show: !0,
        inputShowed: !1,
        inputVal: "",
        current: "tab1",
        nvabarData: {
            showCapsule: 0,
            height: 2 * t.globalData.height + 20
        },
        title: "",
        di_msg: !1,
        ad_info: {},
        diy: {},
        version: 0,
        home_pl_check: !1,
        pl_id: 0,
        home_pl_text: "",
        order_time: "fatie",
        images: []
    },
    onParentEvent: function(t) {
        this.onLoad();
    },
    imageLoad: function(t) {
        var e = t.detail.width / t.detail.height;
        if (console.log(e), e > 1) var a = 345, i = 345 / e; else var a = 150, i = 150 / e;
        var n = this.data.images;
        n[t.target.dataset.index] = {
            width: a,
            height: i > 300 ? 300 : i
        }, console.log(i), this.setData({
            images: n
        });
    },
    handleCancel: function(t) {
        t.currentTarget.dataset.user_id, this.data.actions1, this.data.info;
        this.setData({
            visible: !0
        });
    },
    handleCancel1: function() {
        this.setData({
            visible: !1
        });
    },
    handleClickItem1: function(e) {
        var i = e.detail.index, n = this.data.actions[i];
        console.log(n), this.setData({
            visible: !1,
            order_time: n.type,
            actions_name: n.name
        });
        var s = new Object();
        s.type = n.type, s.name = n.name, t.setCache("order_actions", s);
        t.getCache("order_actions");
        a = 1, this.get_index_list_one();
    },
    home_pl: function(t) {
        console.log(t), this.setData({
            home_pl_check: !0,
            pl_id: t.currentTarget.dataset.id,
            pl_key: t.currentTarget.dataset.key
        });
    },
    hideModal: function() {
        this.setData({
            home_pl_check: !1
        });
    },
    get_user_info: function() {
        var a = t.api_root + "User/get_user_info", i = this, s = t.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, e.POST(a, {
            params: o,
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
            var a = this, i = t.getCache("userinfo"), s = new Object();
            s.token = i.token, s.openid = i.openid, s.much_id = t.siteInfo.uniacid, s.uid = i.uid, 
            s.text = this.data.home_pl_text, s.id = this.data.pl_id, s.reply_type = 0;
            var o = t.api_root + "User/add_paper_reply";
            e.POST(o, {
                params: s,
                success: function(t) {
                    if (console.log(t), "success" == t.data.status) {
                        n({
                            content: t.data.msg
                        }), a.hideModal();
                        var e = a.data.new_list;
                        e[a.data.pl_key].study_repount = parseInt(e[a.data.pl_key].study_repount) + 1, a.setData({
                            new_list: e
                        }), wx.hideLoading();
                    } else n({
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
        } else n({
            content: "内容不能为空！"
        });
    },
    preventTouchMove: function() {},
    get_ad: function() {
        var a = this, i = t.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.much_id = t.siteInfo.uniacid;
        var o = t.api_root + "User/get_ad";
        e.POST(o, {
            params: s,
            success: function(t) {
                console.log(t), "账户未授权!" == t.data.msg && wx.navigateTo({
                    url: "/yl_welore/pages/author/index?type=0"
                }), "success" == t.data.status ? a.setData({
                    ad_info: t.data.info,
                    sw_info: t.data.info_sw
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
    rotate3d: function(t) {
        var e = this, a = e.data.new_list, i = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        e.animation_zan = i, i.rotate3d(0, 1, 0, 180).step(), a[t].animationData_zan = i.export(), 
        e.setData({
            new_list: a
        }), setTimeout(function() {
            var a = e.data.new_list;
            i.rotate3d(0, 1, 0, 0).step(), a[t].animationData_zan = i.export(), e.setData({
                new_list: a
            });
        }, 100);
    },
    handleChange: function(t) {
        var e = t.detail;
        n({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            new_list: []
        }), a = 1, i = 1, "tab2" == e.key && this.get_my_index_list(), "tab1" == e.key && this.get_index_list_one(), 
        this.setData({
            current: e.key,
            di_msg: !1
        });
    },
    onLoad: function(e) {
        var i = this;
        i.setData({
            height: t.globalData.height
        });
        var n = t.getCache("order_actions");
        n ? this.setData({
            actions_name: n.name
        }) : ((n = new Object()).type = "fatie", n.name = "按发帖时间", t.setCache("order_actions", n)), 
        i.get_user_info(), a = 1, "tab1" == this.data.current && this.get_index_list_one(), 
        "tab2" == this.data.current && this.get_my_index_list();
    },
    onShow: function() {
        wx.hideTabBar(), this.get_diy(), this.authority(), t.check_user_status(), 0 != this.data.show && (n({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.get_ad(), this.get_diy(), this.get_user_info(), n.hide());
    },
    authority: function() {
        var a = t.api_root + "User/get_authority", i = this, n = t.getCache("userinfo"), s = new Object();
        s.token = n.token, s.openid = n.openid, s.much_id = t.siteInfo.uniacid, e.POST(a, {
            params: s,
            success: function(t) {
                i.setData({
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
    get_diy: function() {
        var a = t.api_root + "User/get_diy", i = this, n = t.getCache("userinfo"), s = new Object();
        s.uid = n.uid, s.token = n.token, s.openid = n.openid, s.much_id = t.siteInfo.uniacid, 
        s.version = t.version, e.POST(a, {
            params: s,
            success: function(e) {
                console.log(e), i.setData({
                    version: e.data.version,
                    title: e.data.home_title
                }), wx.setStorageSync("is_diy", e.data), console.log(t.getCache("is_diy")), t.editTabbar();
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
    add_zan: function(a) {
        var i = a.currentTarget.dataset.id, s = a.currentTarget.dataset.key, o = this, c = t.getCache("userinfo"), d = new Object();
        d.token = c.token, d.openid = c.openid, d.id = i, d.uid = c.uid, d.much_id = t.siteInfo.uniacid, 
        d.applaud_type = 0, d.zan_type = 1 == this.data.new_list[s].is_info_zan ? 1 : 0;
        var r = o.data.new_list;
        wx.vibrateShort(), 0 == r[s].is_info_zan ? r[s].is_info_zan = !0 : r[s].is_info_zan = !1, 
        o.setData({
            new_list: r
        }), o.rotate3d(s);
        var u = t.api_root + "User/add_user_zan";
        e.POST(u, {
            params: d,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (r[s].info_zan_count = t.data.info_zan_count, 
                o.setData({
                    new_list: r
                })) : n({
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
    get_index_list_one: function() {
        var a = t.api_root + "User/get_index_list", i = this, s = t.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, o.uid = s.uid, o.much_id = t.siteInfo.uniacid, 
        o.version = t.version;
        var c = t.getCache("order_actions");
        o.order_time = c ? c.type : this.data.order_time, o.index_page = 1, e.POST(a, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (i.setData({
                    new_list: t.data.info
                }), n.hide()) : n({
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
    get_my_index_list: function() {
        var a = t.api_root + "User/get_my_index_list", s = this, o = t.getCache("userinfo"), c = new Object();
        c.token = o.token, c.openid = o.openid, c.index_page = i, c.much_id = t.siteInfo.uniacid, 
        c.version = t.version, c.uid = o.uid;
        var d = s.data.new_list;
        e.POST(a, {
            params: c,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) d.push(t.data.info[e]);
                    s.setData({
                        new_list: d
                    }), 0 == t.data.info.length && s.setData({
                        di_msg: !0
                    }), n.hide();
                }
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
    get_index_list: function() {
        var i = t.api_root + "User/get_index_list", s = this, o = t.getCache("userinfo"), c = new Object();
        c.token = o.token, c.openid = o.openid, c.index_page = a, c.much_id = t.siteInfo.uniacid, 
        c.version = t.version;
        var d = t.getCache("order_actions");
        c.order_time = d ? d.type : this.data.order_time;
        var r = s.data.new_list;
        e.POST(i, {
            params: c,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) r.push(t.data.info[e]);
                    s.setData({
                        new_list: r
                    }), 0 == t.data.info.length && s.setData({
                        di_msg: !0
                    }), n.hide();
                }
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
        var e = t.target.dataset.src, a = t.target.dataset.id;
        wx.previewImage({
            current: e,
            urls: this.data.new_list[a].image_part
        });
    },
    play: function(t) {
        for (var e = this, a = this.data.new_list, i = 0; i < a.length; i++) a[i].is_voice = !1;
        this.setData({
            new_list: a
        });
        var n = t.currentTarget.dataset.key;
        s.src = t.currentTarget.dataset.vo, s.play(), a[n].is_voice = !0, this.setData({
            new_list: a,
            new_list_index: n
        }), s.onEnded(function(t) {
            a[n].is_voice = !1, e.setData({
                new_list: a
            });
        });
    },
    stop: function(t) {
        s.stop();
        var e = t.currentTarget.dataset.key, a = this.data.new_list;
        a[e].is_voice = !1, this.setData({
            new_list: a
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
        }, 1500), "tab1" == this.data.current && this.get_index_list_one(), "tab2" == this.data.current && (i = 1, 
        this.get_my_index_list()), this.get_ad();
    },
    onReachBottom: function() {
        n({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), "tab1" == this.data.current && (a++, this.get_index_list()), "tab2" == this.data.current && (i++, 
        this.get_my_index_list()), n.hide();
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