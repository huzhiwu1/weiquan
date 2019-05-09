var t = getApp(), a = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), e = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        nvabarData: {
            showCapsule: 0,
            height: 2 * t.globalData.height + 20
        },
        title: "",
        page: 1,
        info: []
    },
    onLoad: function(a) {
        var e = t.getCache("userinfo");
        this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx,
            id: a.id,
            uid: e.uid,
            design: t.globalData.design,
            title: "加入的" + t.globalData.design.landgrave
        });
    },
    onShow: function() {
        this.setData({
            page: 1,
            info: []
        }), this.get_my_trailing();
    },
    get_my_trailing: function() {
        var i = this, n = t.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.uid = this.data.id, o.much_id = t.siteInfo.uniacid, 
        o.get_id = -1, o.page = i.data.page;
        var s = t.api_root + "User/get_right_needle", g = i.data.info;
        a.POST(s, {
            params: o,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var a = 0; a < t.data.info.length; a++) g.push(t.data.info[a]);
                    i.setData({
                        info: g
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
    onReachBottom: function() {
        e({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.get_my_trailing(), e.hide();
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