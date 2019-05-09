var t = getApp(), e = require("../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        isIpx: t.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            height: 2 * t.globalData.height + 20
        },
        title: "",
        navLeftItems: [],
        navRightItems: [],
        curNav: -1,
        di_msg: !0,
        page: 1
    },
    lower: function() {
        this.setData({
            page: this.data.page + 1
        }), this.data.curNav > 0 && this.get_right_item();
    },
    onLoad: function(e) {
        this.setData({
            height: t.globalData.height,
            title: "全部" + t.globalData.design.landgrave,
            design: t.globalData.design
        }), this.get_left_needle(), this.get_right_item();
    },
    onShow: function() {},
    add_trailing: function(n) {
        var i = this, s = n.currentTarget.dataset.index, o = n.currentTarget.dataset.id, c = t.getCache("userinfo"), g = new Object();
        g.token = c.token, g.openid = c.openid, g.uid = c.uid, g.much_id = t.siteInfo.uniacid, 
        g.tory_id = o, g.is_trailing = 0;
        var r = t.api_root + "User/set_user_trailing";
        e.POST(r, {
            params: g,
            success: function(t) {
                if ("success" == t.data.status) {
                    var e = i.data.navRightItems;
                    e[s].is_trailing = !0, i.setData({
                        navRightItems: e
                    }), a({
                        content: t.data.msg
                    });
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
    get_left_type: function(t) {
        this.setData({
            curNav: t.currentTarget.dataset.id,
            page: 1,
            navRightItems: []
        }), this.get_right_item();
    },
    get_left_needle: function() {
        var n = this, i = t.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.much_id = t.siteInfo.uniacid;
        var o = t.api_root + "User/get_left_needle";
        e.POST(o, {
            params: s,
            success: function(t) {
                "success" == t.data.status ? n.setData({
                    navLeftItems: t.data.info
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
    get_right_item: function() {
        var n = this, i = t.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.uid = i.uid, s.much_id = t.siteInfo.uniacid, 
        s.get_id = n.data.curNav, s.page = n.data.page;
        var o = t.api_root + "User/get_right_needle", c = n.data.navRightItems;
        e.POST(o, {
            params: s,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) c.push(t.data.info[e]);
                    n.setData({
                        navRightItems: c
                    });
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
    _navback: function() {
        var t = getCurrentPages(), e = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (e.setData({
            show: !1
        }), wx.navigateBack()) : this._backhome();
    },
    _backhome: function() {
        wx.redirectTo({
            url: "/yl_welore/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        var e = t.globalData.forward;
        return console.log(e), e ? {
            title: e.title,
            path: "/yl_welore/pages/square/index",
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
            path: "/yl_welore/pages/square/index",
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