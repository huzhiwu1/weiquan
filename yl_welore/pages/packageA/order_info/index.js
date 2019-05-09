var t = getApp(), a = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), e = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        isIpx: t.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            title: "订单详情",
            height: 2 * t.globalData.height + 20
        },
        order_info: {}
    },
    onLoad: function(a) {
        this.setData({
            height: t.globalData.height,
            id: a.id,
            design: t.globalData.design
        }), this.get_my_order();
    },
    onShow: function() {},
    get_my_order: function() {
        var n = this, i = t.getCache("userinfo"), o = new Object();
        o.token = i.token, o.openid = i.openid, o.much_id = t.siteInfo.uniacid, o.uid = i.uid, 
        o.id = this.data.id;
        var s = t.api_root + "User/get_my_order";
        a.POST(s, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? n.setData({
                    order_info: t.data.info
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
    copyBtn: function(t) {
        wx.setClipboardData({
            data: t.currentTarget.dataset.no,
            success: function(t) {}
        });
    },
    _navback: function() {
        var t = getCurrentPages(), a = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (a.setData({
            show: !1
        }), wx.navigateBack()) : wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    }
});