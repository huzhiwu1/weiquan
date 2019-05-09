var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        show: !0,
        nvabarData: {
            showCapsule: 1,
            title: "我的收藏",
            height: 2 * t.globalData.height + 20
        },
        delBtnWidth: 180,
        list: [],
        page: 1,
        di_msg: !1
    },
    onLoad: function(e) {
        var a = t.getCache("userinfo");
        this.setData({
            height: t.globalData.height,
            uid: a.uid,
            page: 1
        }), this.get_user_collection();
    },
    onShow: function() {},
    cancel: function(s) {
        var i = s.currentTarget.dataset.key, n = t.api_root + "User/get_user_cancel", o = this, c = t.getCache("userinfo"), u = new Object();
        u.token = c.token, u.openid = c.openid, u.much_id = t.siteInfo.uniacid, u.uid = this.data.list[i].user_id, 
        u.this_uid = this.data.uid, u.is_user = this.data.list[i].is_user, e.POST(n, {
            params: u,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    a({
                        content: t.data.msg
                    });
                    var e = o.data.list;
                    e[i].is_user = 1 == e[i].is_user ? 0 : 1, o.setData({
                        list: e
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
    get_user_collection: function() {
        var s = t.api_root + "User/get_user_collection", i = this, n = t.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.much_id = t.siteInfo.uniacid, o.uid = n.uid, 
        o.page = this.data.page;
        var c = i.data.list;
        e.POST(s, {
            params: o,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && i.setData({
                        di_msg: !0
                    });
                    for (var e = 0; e < t.data.info.length; e++) c.push(t.data.info[e]);
                    i.setData({
                        list: c
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
    onReachBottom: function() {
        a({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_user_collection(), a.hide();
    },
    delItem: function(t) {
        var e = t.currentTarget.dataset.index, a = this.data.list;
        a.splice(e, 1), this.setData({
            list: a
        });
    },
    _navback: function() {
        var t = getCurrentPages();
        t[t.length - 1];
        t[t.length - 2].setData({
            show: !1
        }), wx.navigateBack();
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