var app = getApp(), http = require("../../util/http.js"), index_page = 1, index_my_page = 1, _require = require("../../dist/base/index"), $Toast = _require.$Toast, innerAudioContext = wx.createInnerAudioContext();

Page({
    data: {
        isIpx: app.globalData.isIpx,
        user_info: {},
        check_phone: !1,
        home_current: "home",
        http_root: app.http_root,
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
            height: 2 * app.globalData.height + 20
        },
        title: "",
        di_msg: !1,
        ad_info: {},
        diy: {},
        isPopping: !1,
        animPlus: {},
        animCollect1: {},
        animCollect: {},
        animTranspond: {},
        animInput: {},
        animBack: {},
        version: 0,
        home_pl_check: !1,
        pl_id: 0,
        home_pl_text: "",
        order_time: "fatie"
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
    handleClickItem1: function(t) {
        var e = t.detail.index, a = this.data.actions[e];
        console.log(a), this.setData({
            visible: !1,
            order_time: a.type,
            actions_name: a.name
        });
        var i = new Object();
        i.type = a.type, i.name = a.name, app.setCache("order_actions", i);
        app.getCache("order_actions");
        index_page = 1, this.get_index_list_one();
    },
    get_aa_dd: function(t) {
        var e = t.detail;
        "home" == e.key && wx.redirectTo({
            url: "/yl_welore/pages/index/index"
        }), "plaza" == e.key && wx.redirectTo({
            url: "/yl_welore/pages/circle/index"
        }), "goods" == e.key && wx.redirectTo({
            url: "/yl_welore/pages/shell_mall/index"
        }), "user" == e.key && wx.redirectTo({
            url: "/yl_welore/pages/user/index"
        }), "add" == e.key && this.plus();
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
            home_pl_check: !1,
            check_phone: !1
        });
    },
    getPhoneNumber: function(t) {
        if ("getPhoneNumber:ok" == t.detail.errMsg) {
            var e = app.api_root + "User/get_user_phone", a = this, i = app.getCache("userinfo"), n = new Object();
            n.token = i.token, n.openid = i.openid, n.uid = i.uid, n.much_id = app.siteInfo.uniacid, 
            n.encryptedData = t.detail.encryptedData, n.iv = t.detail.iv, n.sessionKey = i.sessionKey, 
            http.POST(e, {
                params: n,
                success: function(t) {
                    $Toast({
                        content: t.data.msg
                    }), a.setData({
                        check_phone: !1
                    }), a.get_user_info();
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
        var t = app.api_root + "User/get_user_info", e = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? e.setData({
                    user_info: t.data.info
                }) : $Toast({
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
            var a = this, t = app.getCache("userinfo"), e = new Object();
            e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.uid = t.uid, 
            e.text = this.data.home_pl_text, e.id = this.data.pl_id, e.reply_type = 0;
            var i = app.api_root + "User/add_paper_reply";
            http.POST(i, {
                params: e,
                success: function(t) {
                    if (console.log(t), "success" == t.data.status) {
                        $Toast({
                            content: t.data.msg
                        }), a.hideModal();
                        var e = a.data.new_list;
                        e[a.data.pl_key].study_repount = parseInt(e[a.data.pl_key].study_repount) + 1, a.setData({
                            new_list: e
                        }), wx.hideLoading();
                    } else $Toast({
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
        } else $Toast({
            content: "内容不能为空！"
        });
    },
    preventTouchMove: function() {},
    plus: function() {
        var t = this;
        console.log(t.data.isPopping), 0 == t.data.isPopping ? (t.popp(), t.setData({
            isPopping: !0,
            home_current: "add"
        })) : 1 == t.data.isPopping && (t.takeback(), t.setData({
            isPopping: !1,
            home_current: "home"
        }));
    },
    popp: function() {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), a = wx.createAnimation({
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
        t.rotateZ(225).step(), e.translate(90, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        a.translate(90, -105).rotateZ(360).opacity(1).width("60px").step(), i.translate(-10, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        n.translate(-110, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        0 == this.data.version && s.translate(180, -105).rotateZ(360).opacity(1).height("60px").width("60px").step(), 
        o.backgroundColor("#F7F9FA").height(190).step(), this.setData({
            animPlus: t.export(),
            animCollect1: a.export(),
            animCollect: e.export(),
            animTranspond: i.export(),
            animInput: n.export(),
            animationM: s.export(),
            animBack: o.export()
        });
    },
    takeback: function() {
        var t = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), e = wx.createAnimation({
            duration: 500,
            timingFunction: "ease-out"
        }), a = wx.createAnimation({
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
        });
        t.rotateZ(0).step(), e.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        a.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), i.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), 
        o.translate(0, 0).rotateZ(0).opacity(0).height("0rpx").width("0rpx").step(), n.backgroundColor("transparent").height(45).step(), 
        this.setData({
            animPlus: t.export(),
            animCollect: e.export(),
            animTranspond: a.export(),
            animInput: i.export(),
            animationM: o.export(),
            animBack: n.export()
        });
    },
    get_ad: function() {
        var e = this, t = app.getCache("userinfo"), a = new Object();
        a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid;
        var i = app.api_root + "User/get_ad";
        http.POST(i, {
            params: a,
            success: function(t) {
                console.log(t), "账户未授权!" == t.data.msg && wx.navigateTo({
                    url: "/yl_welore/pages/author/index?type=0"
                }), "success" == t.data.status ? e.setData({
                    ad_info: t.data.info,
                    sw_info: t.data.info_sw
                }) : $Toast({
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
    rotate3d: function(e) {
        var a = this, t = a.data.new_list, i = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        (a.animation_zan = i).rotate3d(0, 1, 0, 180).step(), t[e].animationData_zan = i.export(), 
        a.setData({
            new_list: t
        }), setTimeout(function() {
            var t = a.data.new_list;
            i.rotate3d(0, 1, 0, 0).step(), t[e].animationData_zan = i.export(), a.setData({
                new_list: t
            });
        }, 100);
    },
    handleChange: function(t) {
        var e = t.detail;
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            new_list: []
        }), index_my_page = index_page = 1, "tab2" == e.key && this.get_my_index_list(), 
        "tab1" == e.key && this.get_index_list_one(), this.setData({
            current: e.key,
            di_msg: !1
        });
    },
    onLoad: function(t) {
        var e;
        (this.setData({
            height: app.globalData.height
        }), e = app.getCache("order_actions")) ? this.setData({
            actions_name: e.name
        }) : ((e = new Object()).type = "fatie", e.name = "按发帖时间", app.setCache("order_actions", e));
        this.get_user_info(), index_page = 1, "tab1" == this.data.current && this.get_index_list_one(), 
        "tab2" == this.data.current && this.get_my_index_list();
    },
    onShow: function() {
        this.get_diy(), app.check_user_status(), this.setData({
            isPopping: !1,
            copyright: app.globalData.copyright
        }), this.takeback(), 0 != this.data.show && ($Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.get_ad(), this.get_diy(), $Toast.hide());
    },
    nav_add: function(t) {
        this.setData({
            copyright: app.globalData.copyright
        });
        var e = t.currentTarget.dataset.k, a = this.data.diy;
        if (1 != this.data.copyright.force_phone_arbor || this.data.user_info.user_phone) {
            if ("tuwen" == e && wx.navigateTo({
                url: "/yl_welore/pages/packageA/add/index?type=0&fa_class=0&name="
            }), "tuya" == e) if (1 == a.user_vip.graffiti_member) {
                if (1 != a.vip) return void $Toast({
                    content: "此功能仅限VIP用户使用"
                });
                wx.navigateTo({
                    url: "/yl_welore/pages/packageA/canvas/index?type=0&fa_class=0&name="
                });
            } else wx.navigateTo({
                url: "/yl_welore/pages/packageA/canvas/index?type=0&fa_class=0&name="
            });
            if ("yuyin" == e) if (1 == a.user_vip.voice_member) {
                if (1 != a.vip) return void $Toast({
                    content: "此功能仅限VIP用户使用"
                });
                wx.navigateTo({
                    url: "/yl_welore/pages/packageA/add/index?type=1&fa_class=0&name="
                });
            } else wx.navigateTo({
                url: "/yl_welore/pages/packageA/add/index?type=1&fa_class=0&name="
            });
            if ("shipin" == e) if (1 == a.user_vip.video_member) {
                if (1 != a.vip) return void $Toast({
                    content: "此功能仅限VIP用户使用"
                });
                wx.navigateTo({
                    url: "/yl_welore/pages/packageA/add/index?type=2&fa_class=0&name="
                });
            } else wx.navigateTo({
                url: "/yl_welore/pages/packageA/add/index?type=2&fa_class=0&name="
            });
        } else this.setData({
            check_phone: !0
        });
    },
    get_diy: function() {
        var t = app.api_root + "User/get_diy", e = this, a = app.getCache("userinfo"), i = new Object();
        i.uid = a.uid, i.token = a.token, i.openid = a.openid, i.much_id = app.siteInfo.uniacid, 
        i.version = app.version, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), e.setData({
                    version: t.data.version,
                    diy: t.data,
                    title: t.data.home_title
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
    add_zan: function(t) {
        var e = t.currentTarget.dataset.id, a = t.currentTarget.dataset.key, i = this, n = app.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.id = e, o.uid = n.uid, o.much_id = app.siteInfo.uniacid, 
        o.applaud_type = 0, o.zan_type = 1 == this.data.new_list[a].is_info_zan ? 1 : 0;
        var s = i.data.new_list;
        wx.vibrateShort(), 0 == s[a].is_info_zan ? s[a].is_info_zan = !0 : s[a].is_info_zan = !1, 
        i.setData({
            new_list: s
        }), i.rotate3d(a);
        var r = app.api_root + "User/add_user_zan";
        http.POST(r, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (s[a].info_zan_count = t.data.info_zan_count, 
                i.setData({
                    new_list: s
                })) : $Toast({
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
        var t = app.api_root + "User/get_index_list", e = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, i.uid = a.uid, i.much_id = app.siteInfo.uniacid, 
        i.version = app.version;
        var n = app.getCache("order_actions");
        i.order_time = n ? n.type : this.data.order_time, i.index_page = 1, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (e.setData({
                    new_list: t.data.info
                }), $Toast.hide()) : $Toast({
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
        var t = app.api_root + "User/get_my_index_list", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.index_page = index_my_page, i.much_id = app.siteInfo.uniacid, 
        i.version = app.version, i.uid = e.uid;
        var n = a.data.new_list;
        http.POST(t, {
            params: i,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) n.push(t.data.info[e]);
                    a.setData({
                        new_list: n
                    }), 0 == t.data.info.length && a.setData({
                        di_msg: !0
                    }), $Toast.hide();
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
        var t = app.api_root + "User/get_index_list", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.index_page = index_page, i.much_id = app.siteInfo.uniacid, 
        i.version = app.version;
        var n = app.getCache("order_actions");
        i.order_time = n ? n.type : this.data.order_time;
        var o = a.data.new_list;
        http.POST(t, {
            params: i,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) o.push(t.data.info[e]);
                    a.setData({
                        new_list: o
                    }), 0 == t.data.info.length && a.setData({
                        di_msg: !0
                    }), $Toast.hide();
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
        innerAudioContext.src = t.currentTarget.dataset.vo, innerAudioContext.play(), a[n].is_voice = !0, 
        this.setData({
            new_list: a,
            new_list_index: n
        }), innerAudioContext.onEnded(function(t) {
            a[n].is_voice = !1, e.setData({
                new_list: a
            });
        });
    },
    stop: function(t) {
        innerAudioContext.stop();
        var e = t.currentTarget.dataset.key, a = this.data.new_list;
        a[e].is_voice = !1, this.setData({
            new_list: a
        });
    },
    onPullDownRefresh: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), setTimeout(function() {
            wx.hideNavigationBarLoading(), wx.stopPullDownRefresh();
        }, 1500), "tab1" == this.data.current && this.get_index_list_one(), "tab2" == this.data.current && (index_my_page = 1, 
        this.get_my_index_list()), this.get_ad();
    },
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), "tab1" == this.data.current && (index_page++, this.get_index_list()), "tab2" == this.data.current && (index_my_page++, 
        this.get_my_index_list()), $Toast.hide();
    },
    onShareAppMessage: function() {
        var t = app.globalData.forward;
        return console.log(t), t ? {
            title: t.title,
            path: "/yl_welore/pages/index/index",
            imageUrl: t.reis_img,
            success: function(t) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                $Toast({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/index/index",
            success: function(t) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                $Toast({
                    content: "转发失败"
                });
            }
        };
    }
});