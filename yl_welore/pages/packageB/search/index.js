var t = getApp(), a = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), e = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast, s = wx.createInnerAudioContext();

Page({
    data: {
        nvabarData: {
            showCapsule: 0,
            title: "搜一搜",
            height: 2 * t.globalData.height + 20
        },
        new_list: [],
        page: 1,
        di_msg: !1,
        get_search: "",
        show: !0,
        clean: !1,
        set_list: !1,
        territory: []
    },
    onLoad: function(a) {
        this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx,
            design: t.globalData.design
        });
    },
    onShow: function() {
        if (0 != this.data.show) {
            var a = t.getCache("search");
            this.setData({
                page: 1,
                new_list: []
            }), a ? (this.setData({
                is_search: !0
            }), this.get_arr_dx(a)) : this.setData({
                is_search: !1
            });
        }
    },
    get_search: function(t) {
        var a = t.detail.value;
        this.setData({
            get_search: a
        });
    },
    col_search: function() {
        this.setData({
            get_search: "",
            set_list: !1
        });
    },
    lishi_search: function(t) {
        this.setData({
            get_search: t.currentTarget.dataset.search
        }), this.setData({
            page: 1,
            new_list: []
        }), this.get_index_list();
    },
    removeStorage: function() {
        this.setData({
            clean: !0
        });
    },
    Close_no: function() {
        this.setData({
            clean: !1
        });
    },
    Close_ok: function() {
        this.setData({
            clean: !1,
            get_lishi: [],
            is_search: !1
        }), t.removeCache("search");
    },
    submit_search: function() {
        var t = this;
        "" != t.data.get_search ? (t.setData({
            page: 1,
            new_list: []
        }), t.get_index_list()) : e({
            content: "搜索内容呢？"
        });
    },
    get_arr_dx: function(e) {
        var s = this, i = t.getCache("userinfo"), n = new Object();
        n.token = i.token, n.openid = i.openid, n.arr = e;
        var o = t.api_root + "User/set_arr_dx";
        a.POST(o, {
            params: n,
            success: function(t) {
                console.log(t), "success" == t.data.status && s.setData({
                    get_lishi: t.data.info
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
    add_zan: function(s) {
        var i = s.currentTarget.dataset.id, n = s.currentTarget.dataset.key, o = this, c = t.getCache("userinfo"), r = new Object();
        r.token = c.token, r.openid = c.openid, r.id = i, r.uid = c.uid, r.much_id = t.siteInfo.uniacid, 
        r.zan_type = 1 == this.data.new_list[n].is_info_zan ? 1 : 0;
        var h = t.api_root + "User/add_user_zan";
        a.POST(h, {
            params: r,
            success: function(t) {
                var a = o.data.new_list;
                "success" == t.data.status ? (a[n].is_info_zan = t.data.info_zan, a[n].info_zan_count = t.data.info_zan_count, 
                o.setData({
                    new_list: a
                }), o.rotate3d(n)) : e({
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
    get_index_list: function() {
        var s = t.api_root + "User/get_search_list", i = this, n = t.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.page = this.data.page, o.search = this.data.get_search, 
        o.much_id = t.siteInfo.uniacid;
        var c = i.data.new_list;
        a.POST(s, {
            params: o,
            success: function(a) {
                if (console.log(a), "success" == a.data.status) {
                    0 == a.data.info.length && i.setData({
                        di_msg: !0
                    });
                    for (n = 0; n < a.data.info.length; n++) c.push(a.data.info[n]);
                    i.setData({
                        new_list: c,
                        set_list: !0,
                        territory: a.data.territory,
                        is_search_yes: a.data.is_search_yes
                    });
                    var s = t.getCache("search");
                    if (s) {
                        for (var n = 0; n < s.length; n++) if (s[n].search == i.data.get_search) return void console.log("相同");
                        s.push({
                            search: i.data.get_search
                        }), t.setCache("search", s);
                    } else t.setCache("search", [ {
                        search: i.data.get_search
                    } ]);
                    e.hide();
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
        this.setData({
            show: !1
        });
        var a = t.target.dataset.src, e = t.target.dataset.id;
        wx.previewImage({
            current: a,
            urls: this.data.new_list[e].image_part
        });
    },
    play: function(t) {
        for (var a = this, e = this.data.new_list, i = 0; i < e.length; i++) e[i].is_voice = !1;
        this.setData({
            new_list: e
        });
        var n = t.currentTarget.dataset.key;
        s.src = t.currentTarget.dataset.vo, s.play(), e[n].is_voice = !0, this.setData({
            new_list: e,
            new_list_index: n
        }), s.onEnded(function(t) {
            e[n].is_voice = !1, a.setData({
                new_list: e
            });
        });
    },
    stop: function(t) {
        s.stop();
        var a = t.currentTarget.dataset.key, e = this.data.new_list;
        e[a].is_voice = !1, this.setData({
            new_list: e
        });
    },
    onReachBottom: function() {
        e({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_index_list(), e.hide();
    },
    rotate3d: function(t) {
        var a = this, e = a.data.new_list, s = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        a.animation_zan = s, s.rotate3d(0, 1, 0, 180).step(), e[t].animationData_zan = s.export(), 
        a.setData({
            new_list: e
        }), setTimeout(function() {
            var e = a.data.new_list;
            s.rotate3d(0, 1, 0, 0).step(), e[t].animationData_zan = s.export(), a.setData({
                new_list: e
            });
        }, 100);
    },
    _navback: function() {
        wx.navigateBack();
    },
    onShareAppMessage: function() {
        var a = t.globalData.forward;
        return console.log(a), a ? {
            title: a.title,
            path: "/yl_welore/pages/index/index",
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
            path: "/yl_welore/pages/index/index",
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
    }
});