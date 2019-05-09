var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../util/wxParse/wxParse.js"), i = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        isIpx: t.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            title: "商品详情",
            height: 2 * t.globalData.height + 20
        },
        good_info: {}
    },
    onLoad: function(e) {
        this.setData({
            height: t.globalData.height,
            id: e.id,
            design: t.globalData.design
        }), this.get_goods();
    },
    onShow: function() {},
    exchange: function() {
        var a = this, o = t.getCache("userinfo"), n = new Object();
        n.token = o.token, n.openid = o.openid, n.much_id = t.siteInfo.uniacid, n.uid = o.uid, 
        n.id = this.data.id;
        var s = t.api_root + "User/exchange_goods";
        e.POST(s, {
            params: n,
            success: function(t) {
                console.log(t), "success" == t.data.status ? wx.redirectTo({
                    url: "/yl_welore/pages/packageA/good_address/index?id=" + a.data.id
                }) : i({
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
    get_goods: function() {
        var o = this, n = t.getCache("userinfo"), s = new Object();
        s.token = n.token, s.openid = n.openid, s.much_id = t.siteInfo.uniacid, s.uid = n.uid, 
        s.id = this.data.id;
        var c = t.api_root + "User/get_goods";
        e.POST(c, {
            params: s,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    var e = t.data.info.product_detail;
                    o.setData({
                        good_info: t.data.info
                    }), a.wxParse("article", "html", e, o, 5);
                } else i({
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
        }), wx.navigateBack()) : wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        var e = t.globalData.forward;
        return console.log(e), e ? {
            title: e.title,
            path: "/yl_welore/pages/packageA/good_info/index?id=" + this.data.id,
            imageUrl: e.reis_img,
            success: function(t) {
                i({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                i({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/packageA/good_info/index?id=" + this.data.id,
            success: function(t) {
                i({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                i({
                    content: "转发失败"
                });
            }
        };
    }
});