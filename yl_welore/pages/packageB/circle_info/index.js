var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        user_info: {},
        current: "男",
        anhao: "tab1",
        img: "",
        nick_name: "",
        autograph: "",
        shenqing: !1,
        animationSqData: {},
        shenqing_text: "",
        da_mod: !1,
        get_tc_text: "",
        anhao_mode: !1
    },
    onLoad: function(e) {
        var a = t.getCache("userinfo");
        this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx,
            id: e.id,
            uid: a.uid,
            design: t.globalData.design
        });
    },
    onShow: function() {
        this.get_qq_info();
    },
    set_anhao: function() {
        this.setData({
            anhao_mode: !0
        });
    },
    get_ah_text: function(t) {
        this.setData({
            this_atcipher: t.detail.value
        });
    },
    set_get_new_ah: function() {},
    update_ah: function() {
        if (this.data.info.atcipher == this.data.this_atcipher) return this.hideModal(), 
        void a({
            content: "没有做任何更改!"
        });
        var n = t.api_root + "User/update_atcipher", i = this, o = t.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, s.much_id = t.siteInfo.uniacid, s.id = this.data.id, 
        s.this_atcipher = this.data.this_atcipher, e.POST(n, {
            params: s,
            success: function(t) {
                console.log(t), i.hideModal(), "success" == t.data.status ? (a({
                    content: t.data.msg
                }), i.get_qq_info()) : a({
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
    open_atence: function() {
        var n = t.api_root + "User/open_atence", i = this, o = t.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, s.much_id = t.siteInfo.uniacid, s.id = this.data.id, 
        s.atcipher_type = this.data.info.atence, e.POST(n, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (a({
                    content: t.data.msg
                }), i.get_qq_info()) : a({
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
    get_ah_random: function() {
        var a = t.api_root + "User/get_ah_random", n = this, i = t.getCache("userinfo"), o = new Object();
        o.token = i.token, o.openid = i.openid, e.POST(a, {
            params: o,
            success: function(t) {
                console.log(t), n.setData({
                    this_atcipher: t.data
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
    ts_admin: function(t) {
        this.setData({
            user_id: t.currentTarget.dataset.id,
            user_type: t.currentTarget.dataset.type,
            user_qq: t.currentTarget.dataset.qq,
            tousu: !0
        });
    },
    tc_submit: function() {
        var n = t.api_root + "User/add_tc_submit", i = this, o = t.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, s.much_id = t.siteInfo.uniacid, s.uid = o.uid, 
        s.id = this.data.id, s.user_id = this.data.user_id, s.user_type = this.data.user_type, 
        s.labor = this.data.user_qq, s.get_tc_text = this.data.get_tc_text, e.POST(n, {
            params: s,
            success: function(t) {
                console.log(t), t.data.status, i.setData({
                    get_tc_text: "",
                    tousu: !1
                }), a({
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
    get_tc_text: function(t) {
        this.setData({
            get_tc_text: t.detail.value
        });
    },
    get_shenqing_text: function(t) {
        this.setData({
            shenqing_text: t.detail.value
        });
    },
    da_mod: function() {
        this.setData({
            da_mod: !0
        });
    },
    xiao_mod: function() {
        this.setData({
            xiao_mod: !0
        });
    },
    hideModal: function() {
        this.setData({
            da_mod: !1,
            xiao_mod: !1,
            anhao_mode: !1
        });
    },
    shenqing_da_qq: function(t) {
        var e = this, a = wx.createAnimation({
            duration: 150,
            timingFunction: "linear"
        });
        e.animation = a, a.translateY(230).step(), e.setData({
            animationSqData: a.export(),
            shenqing: !0,
            shenqing_type: t.currentTarget.dataset.key
        }), setTimeout(function() {
            a.translateY(0).step(), e.setData({
                animationSqData: a.export()
            });
        }, 100);
    },
    no_shenqing_da_qq: function() {
        this.setData({
            shenqing: !1,
            tousu: !1
        });
    },
    shenqing_submit: function() {
        var n = t.api_root + "User/add_territory_learned", i = this, o = t.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, s.much_id = t.siteInfo.uniacid, s.id = this.data.id, 
        s.upshot = this.data.shenqing_text, s.shenqing_type = this.data.shenqing_type, e.POST(n, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (a({
                    content: t.data.msg
                }), i.no_shenqing_da_qq()) : a({
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
    get_qq_info: function() {
        var n = t.api_root + "User/get_qq_info", i = this, o = t.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, s.much_id = t.siteInfo.uniacid, s.id = this.data.id, 
        e.POST(n, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? i.setData({
                    info: t.data.info,
                    this_atcipher: t.data.info.atcipher,
                    da_qq: t.data.info.da_qq,
                    xiao_qq: t.data.info.xiao_qq
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
    previewOneImage: function() {
        var e = this, n = t.getCache("userinfo"), i = t.api_root + "User/img_upload";
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(o) {
                a({
                    content: "上传中...",
                    type: "loading"
                });
                var s = o.tempFilePaths;
                wx.uploadFile({
                    url: i,
                    filePath: s[0],
                    name: "sngpic",
                    formData: {
                        token: n.token,
                        openid: n.openid,
                        much_id: t.siteInfo.uniacid
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(t) {
                        console.log(t);
                        var n = JSON.parse(t.data);
                        console.log(n), "error" == n.status ? a({
                            content: n.msg
                        }) : (e.setData({
                            img: n.url
                        }), a.hide());
                    },
                    fail: function(t) {
                        a({
                            content: "上传错误！",
                            type: "error"
                        });
                    }
                });
            }
        });
    },
    handleFruitChange: function(t) {
        var e = t.detail, a = void 0 === e ? {} : e;
        this.setData({
            current: a.value
        });
    },
    copyBtn: function(t) {
        wx.setClipboardData({
            data: t.currentTarget.dataset.no,
            success: function(t) {}
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