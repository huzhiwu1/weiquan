var t = getApp(), a = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), e = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast, i = wx.createInnerAudioContext();

Page({
    data: {
        user_info: {},
        check_phone: !1,
        visible: !1,
        actions_name: "按发帖时间",
        actions: [ {
            name: "按发帖时间",
            type: "fatie"
        }, {
            name: "按最后回帖时间",
            type: "huifu"
        } ],
        show: !0,
        isIpx: t.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            height: 2 * t.globalData.height + 20
        },
        title: "",
        getInfo: [],
        tory_list: [],
        huifu: !1,
        animationData: {},
        current: "tab1",
        set_guanzhu: "tab1",
        isPopping: !1,
        animPlus: {},
        animCollect: {},
        animTranspond: {},
        animInput: {},
        animBack: {},
        page: 1,
        top_list: [],
        load: !1,
        guanzhu: !1,
        get_gz_text: "",
        get_gz_input: "",
        version: 0,
        home_pl_check: !1,
        pl_id: 0,
        home_pl_text: ""
    },
    onLoad: function(a) {
        if (this.setData({
            height: t.globalData.height,
            design: t.globalData.design,
            id: a.id,
            page: 1
        }), this.get_tory_info(), this.get_user_info(), this.get_placement_top(), 0 != this.data.show) {
            this.setData({
                page: 1,
                tory_list: []
            });
            var e = t.getCache("order_actions_o");
            e ? this.setData({
                actions_name: e.name
            }) : ((e = new Object()).type = "fatie", e.name = "按发帖时间", t.setCache("order_actions_o", e)), 
            this.add_trailing_list();
        }
    },
    getPhoneNumber: function(i) {
        if ("getPhoneNumber:ok" == i.detail.errMsg) {
            var n = t.api_root + "User/get_user_phone", o = this, s = t.getCache("userinfo"), r = new Object();
            r.token = s.token, r.openid = s.openid, r.uid = s.uid, r.much_id = t.siteInfo.uniacid, 
            r.encryptedData = i.detail.encryptedData, r.iv = i.detail.iv, r.sessionKey = s.sessionKey, 
            a.POST(n, {
                params: r,
                success: function(t) {
                    e({
                        content: t.data.msg
                    }), o.setData({
                        check_phone: !1
                    }), o.get_user_info();
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
    get_user_info: function() {
        var i = t.api_root + "User/get_user_info", n = this, o = t.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, a.POST(i, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? n.setData({
                    user_info: t.data.info
                }) : e({
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
    handleClickItem1: function(a) {
        var e = a.detail.index, i = this.data.actions[e];
        console.log(i), this.setData({
            visible: !1,
            order_time: i.type,
            actions_name: i.name
        });
        var n = new Object();
        n.type = i.type, n.name = i.name, t.setCache("order_actions_o", n);
        var o = t.getCache("order_actions_o");
        console.log(o), this.add_trailing_list();
    },
    home_pl: function(t) {
        console.log(t), this.setData({
            home_pl_check: !0,
            pl_id: t.currentTarget.dataset.id,
            pl_key: t.currentTarget.dataset.key
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
            var i = this, n = t.getCache("userinfo"), o = new Object();
            o.token = n.token, o.openid = n.openid, o.much_id = t.siteInfo.uniacid, o.uid = n.uid, 
            o.text = this.data.home_pl_text, o.id = this.data.pl_id, o.reply_type = 0;
            var s = t.api_root + "User/add_paper_reply";
            a.POST(s, {
                params: o,
                success: function(t) {
                    if (console.log(t), "success" == t.data.status) {
                        e({
                            content: t.data.msg
                        }), i.hideModal();
                        var a = i.data.tory_list;
                        a[i.data.pl_key].study_repount = parseInt(a[i.data.pl_key].study_repount) + 1, i.setData({
                            tory_list: a
                        }), wx.hideLoading();
                    } else e({
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
        } else e({
            content: "内容不能为空！"
        });
    },
    preventTouchMove: function() {},
    handleChange: function(t) {
        var a = t.detail;
        this.setData({
            current: a.key
        });
    },
    handleChange_gz: function(t) {
        var a = t.detail;
        this.setData({
            set_guanzhu: a.key
        });
    },
    onShow: function() {
        this.setData({
            isPopping: !1,
            copyright: t.globalData.copyright
        }), this.takeback(), this.get_diy(), this.get_user_info();
    },
    nav_add: function(a) {
        this.setData({
            copyright: t.globalData.copyright
        });
        var i = a.currentTarget.dataset.k, n = this.data.diy;
        if (1 != this.data.copyright.force_phone_arbor || this.data.user_info.user_phone || 0 != this.data.version) {
            if ("tuwen" == i && wx.navigateTo({
                url: "/yl_welore/pages/packageA/add/index?type=0&fa_class=" + this.data.getInfo.id + "&name=" + this.data.getInfo.realm_name
            }), "tuya" == i) if (1 == n.user_vip.graffiti_member) {
                if (1 != n.vip) return void e({
                    content: "VIP专属"
                });
                wx.navigateTo({
                    url: "/yl_welore/pages/packageA/canvas/index?type=0&fa_class=" + this.data.getInfo.id + "&name=" + this.data.getInfo.realm_name
                });
            } else wx.navigateTo({
                url: "/yl_welore/pages/packageA/canvas/index?type=0&fa_class=" + this.data.getInfo.id + "&name=" + this.data.getInfo.realm_name
            });
            if ("yuyin" == i) if (1 == n.user_vip.voice_member) {
                if (1 != n.vip) return void e({
                    content: "VIP专属"
                });
                wx.navigateTo({
                    url: "/yl_welore/pages/packageA/add/index?type=1&fa_class=" + this.data.getInfo.id + "&name=" + this.data.getInfo.realm_name
                });
            } else wx.navigateTo({
                url: "/yl_welore/pages/packageA/add/index?type=1&fa_class=" + this.data.getInfo.id + "&name=" + this.data.getInfo.realm_name
            });
            if ("shipin" == i) if (1 == n.user_vip.video_member) {
                if (1 != n.vip) return void e({
                    content: "VIP专属"
                });
                wx.navigateTo({
                    url: "/yl_welore/pages/packageA/add/index?type=2&fa_class=" + this.data.getInfo.id + "&name=" + this.data.getInfo.realm_name
                });
            } else wx.navigateTo({
                url: "/yl_welore/pages/packageA/add/index?type=2&fa_class=" + this.data.getInfo.id + "&name=" + this.data.getInfo.realm_name
            });
        } else this.setData({
            check_phone: !0
        });
    },
    get_diy: function() {
        var e = t.api_root + "User/get_diy", i = this, n = t.getCache("userinfo"), o = new Object();
        o.uid = n.uid, o.token = n.token, o.openid = n.openid, o.much_id = t.siteInfo.uniacid, 
        o.version = t.version, a.POST(e, {
            params: o,
            success: function(t) {
                "账户未授权!" == t.data.msg && wx.navigateTo({
                    url: "/yl_welore/pages/author/index"
                }), i.setData({
                    version: t.data.version,
                    diy: t.data,
                    title: t.data.home_title,
                    add: t.data.pattern_data.release.list
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
    get_placement_top: function() {
        var i = this, n = t.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.much_id = t.siteInfo.uniacid, o.tory_id = this.data.id;
        var s = t.api_root + "User/get_placement_top";
        a.POST(s, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? i.setData({
                    top_list: t.data.info
                }) : e({
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
    add_trailing_list: function() {
        var i = this, n = t.getCache("userinfo"), o = new Object();
        i.data.getInfo;
        o.token = n.token, o.openid = n.openid, o.uid = n.uid, o.much_id = t.siteInfo.uniacid, 
        o.tory_id = this.data.id, o.index_page = this.data.page, o.version = t.version;
        var s = t.getCache("order_actions_o");
        o.order_time = s ? s.type : this.data.order_time;
        var r = t.api_root + "User/get_index_list", c = i.data.tory_list;
        a.POST(r, {
            params: o,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && i.setData({
                        load: !0
                    });
                    for (var a = 0; a < t.data.info.length; a++) c.push(t.data.info[a]);
                    i.setData({
                        tory_list: c,
                        version: t.data.version
                    });
                } else e({
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
    set_trailing: function() {
        this.setData({
            guanzhu: !0
        });
    },
    hideModal: function() {
        this.setData({
            guanzhu: !1,
            home_pl_check: !1,
            check_phone: !1
        });
    },
    get_gz_text: function(t) {
        this.setData({
            get_gz_text: t.detail.value
        });
    },
    get_gz_input: function(t) {
        this.setData({
            get_gz_input: t.detail.value
        });
    },
    add_trailing: function() {
        var i = this, n = t.getCache("userinfo"), o = new Object(), s = i.data.getInfo;
        if (o.token = n.token, o.openid = n.openid, o.uid = n.uid, o.much_id = t.siteInfo.uniacid, 
        o.tory_id = this.data.id, o.is_trailing = 1 == s.is_trailing ? 1 : 0, o.trailing_type = "tab1" == this.data.set_guanzhu ? 0 : 1, 
        o.trailing_text = "tab1" == this.data.set_guanzhu ? this.data.get_gz_text : this.data.get_gz_input, 
        1 != i.data.guanzhu || o.trailing_text) {
            var r = t.api_root + "User/set_user_trailing";
            a.POST(r, {
                params: o,
                success: function(t) {
                    i.hideModal(), "success" == t.data.status ? (s.is_trailing = 1 != s.is_trailing, 
                    i.setData({
                        getInfo: s
                    }), e({
                        content: t.data.msg
                    })) : e({
                        content: t.data.msg
                    }), i.setData({
                        get_gz_text: "",
                        get_gz_input: ""
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
        } else e({
            content: "内容不能为空"
        });
    },
    get_tory_info: function() {
        var i = this, n = t.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.id = this.data.id, o.uid = n.uid, o.much_id = t.siteInfo.uniacid;
        var s = t.api_root + "User/get_tory_info";
        a.POST(s, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? i.setData({
                    getInfo: t.data.info,
                    title: t.data.info.realm_name
                }) : e({
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
    plus: function() {
        var t = this;
        console.log(t.data.isPopping), 0 == t.data.isPopping ? (t.popp(), t.setData({
            isPopping: !0
        })) : 1 == t.data.isPopping && (t.takeback(), t.setData({
            isPopping: !1
        }));
    },
    popp: function() {
        var t = this, a = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), i = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), n = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), o = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), s = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        });
        a.rotateZ(225).step(), e.translate(90, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        i.translate(-10, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        n.translate(-110, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        0 == t.data.version && s.translate(180, -105).rotateZ(360).opacity(1).height("65px").width("65px").step(), 
        o.backgroundColor("#F7F9FA").height(190).step(), t.setData({
            animPlus: a.export(),
            animCollect: e.export(),
            animTranspond: i.export(),
            animInput: n.export(),
            animationM: s.export(),
            animBack: o.export()
        });
    },
    takeback: function() {
        var t = this, a = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), i = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), n = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), o = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), s = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        });
        a.rotateZ(0).step(), e.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        i.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), n.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        s.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), o.backgroundColor("transparent").height(45).step(), 
        t.setData({
            animPlus: a.export(),
            animCollect: e.export(),
            animTranspond: i.export(),
            animInput: n.export(),
            animationM: s.export(),
            animBack: o.export()
        });
    },
    play: function(t) {
        for (var a = this, e = this.data.tory_list, n = 0; n < e.length; n++) e[n].is_voice = !1;
        this.setData({
            tory_list: e
        });
        var o = t.currentTarget.dataset.key;
        i.src = t.currentTarget.dataset.vo, i.play(), e[o].is_voice = !0, this.setData({
            tory_list: e,
            tory_list_index: o
        }), i.onEnded(function(t) {
            e[o].is_voice = !1, a.setData({
                tory_list: e
            });
        });
    },
    add_top_zan: function(i) {
        var n = i.currentTarget.dataset.id, o = i.currentTarget.dataset.key, s = this, r = t.getCache("userinfo"), c = new Object();
        c.token = r.token, c.openid = r.openid, c.id = n, c.uid = r.uid, c.much_id = t.siteInfo.uniacid, 
        c.zan_type = 1 == this.data.top_list[o].is_info_zan ? 1 : 0;
        var d = s.data.top_list;
        wx.vibrateShort(), 0 == d[o].is_info_zan ? d[o].is_info_zan = !0 : d[o].is_info_zan = !1, 
        s.setData({
            top_list: d
        }), s.rotate3d_top(o), c.applaud_type = 0;
        var u = t.api_root + "User/add_user_zan";
        a.POST(u, {
            params: c,
            success: function(t) {
                var a = s.data.top_list;
                "success" == t.data.status ? (a[o].info_zan_count = t.data.info_zan_count, s.setData({
                    top_list: a
                })) : e({
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
    add_zan: function(i) {
        var n = i.currentTarget.dataset.id, o = i.currentTarget.dataset.key, s = this, r = t.getCache("userinfo"), c = new Object();
        c.token = r.token, c.openid = r.openid, c.id = n, c.uid = r.uid, c.much_id = t.siteInfo.uniacid, 
        c.zan_type = 1 == this.data.tory_list[o].is_info_zan ? 1 : 0;
        var d = s.data.tory_list;
        wx.vibrateShort(), 0 == d[o].is_info_zan ? d[o].is_info_zan = !0 : d[o].is_info_zan = !1, 
        s.setData({
            tory_list: d
        }), s.rotate3d(o), c.applaud_type = 0;
        var u = t.api_root + "User/add_user_zan";
        a.POST(u, {
            params: c,
            success: function(t) {
                var a = s.data.tory_list;
                "success" == t.data.status ? (a[o].info_zan_count = t.data.info_zan_count, s.setData({
                    tory_list: a
                })) : e({
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
    stop: function(t) {
        i.stop();
        var a = t.currentTarget.dataset.key, e = this.data.tory_list;
        e[a].is_voice = !1, this.setData({
            tory_list: e
        });
    },
    previewImage: function(t) {
        var a = t.target.dataset.src, e = t.target.dataset.id;
        wx.previewImage({
            current: a,
            urls: this.data.tory_list[e].image_part
        });
    },
    onPullDownRefresh: function() {
        setTimeout(function() {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1500), this.setData({
            page: 1,
            tory_list: []
        }), this.add_trailing_list();
    },
    onReachBottom: function() {
        e({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.add_trailing_list(), e.hide();
    },
    rotate3d_top: function(t) {
        var a = this, e = a.data.top_list, i = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        a.animation_zan = i, i.rotate3d(0, 1, 0, 180).step(), e[t].animationData_zan = i.export(), 
        a.setData({
            top_list: e
        }), setTimeout(function() {
            var e = a.data.top_list;
            i.rotate3d(0, 1, 0, 0).step(), e[t].animationData_zan = i.export(), a.setData({
                top_list: e
            });
        }, 100);
    },
    rotate3d: function(t) {
        var a = this, e = a.data.tory_list, i = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        a.animation_zan = i, i.rotate3d(0, 1, 0, 180).step(), e[t].animationData_zan = i.export(), 
        a.setData({
            tory_list: e
        }), setTimeout(function() {
            var e = a.data.tory_list;
            i.rotate3d(0, 1, 0, 0).step(), e[t].animationData_zan = i.export(), a.setData({
                tory_list: e
            });
        }, 100);
    },
    onShareAppMessage: function() {
        var a = t.globalData.forward;
        return console.log(a), a ? {
            title: a.title,
            path: "/yl_welore/pages/packageA/circle_info/index?id=" + this.data.id,
            imageUrl: a.reis_img,
            success: function(t) {
                e({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                e({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/packageA/circle_info/index?id=" + this.data.id,
            success: function(t) {
                e({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                e({
                    content: "转发失败"
                });
            }
        };
    },
    _navback: function() {
        wx.navigateBack();
    },
    _backhome: function() {
        wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    }
});