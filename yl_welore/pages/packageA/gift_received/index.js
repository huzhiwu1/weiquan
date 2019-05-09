var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

wx.createInnerAudioContext();

Page({
    data: {
        isIpx: t.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            title: "我收到的礼物",
            height: 2 * t.globalData.height + 20
        },
        page: 1,
        my_list: [],
        di_msg: !1
    },
    onLoad: function(e) {
        this.setData({
            height: t.globalData.height,
            page: 1
        }), this.get_my_rec();
    },
    onShow: function() {},
    get_my_rec: function() {
        var n = this, i = t.getCache("userinfo"), o = new Object();
        o.token = i.token, o.openid = i.openid, o.much_id = t.siteInfo.uniacid, o.uid = i.uid, 
        o.page = this.data.page;
        var s = t.api_root + "User/get_my_rec", c = n.data.my_list;
        e.POST(s, {
            params: o,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) c.push(t.data.info[e]);
                    n.setData({
                        my_list: c
                    }), 0 == t.data.info.length && n.setData({
                        di_msg: !0
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
        }), this.get_my_rec(), a.hide();
    },
    _navback: function() {
        var t = getCurrentPages(), e = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (e.setData({
            show: !1
        }), wx.navigateBack()) : wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
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