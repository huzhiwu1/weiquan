var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page(function(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}({
    data: {
        nvabarData: {
            showCapsule: 0,
            title: "我的守护榜",
            height: 2 * t.globalData.height + 20
        },
        page: 1,
        info: []
    },
    onLoad: function(e) {
        this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx,
            id: e.id
        }), this.get_user_guard();
    },
    onShow: function() {
        this.setData({
            page: 1,
            info: []
        });
    },
    get_user_guard: function() {
        var n = this, i = t.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.uid = this.data.id, s.much_id = t.siteInfo.uniacid;
        var o = t.api_root + "User/get_user_guard";
        e.POST(o, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? n.setData({
                    info: t.data.info
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
    onShareAppMessage: function() {},
    _navback: function() {
        var t = getCurrentPages(), e = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (e.setData({
            show: !1
        }), wx.navigateBack()) : wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    }
}, "onShareAppMessage", function() {
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
}));