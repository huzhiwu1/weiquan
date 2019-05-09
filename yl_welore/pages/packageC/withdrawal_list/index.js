var t = getApp(), a = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), i = (require("../../../../5E0B68B67EC361BF386D00B1C8BD8A51.js"), 
require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast);

Page({
    data: {
        user_info: {},
        nvabarData: {
            showCapsule: 0,
            title: "提现明细",
            height: 2 * t.globalData.height + 20
        },
        withdraw_list: []
    },
    onLoad: function(a) {
        this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx,
            page: 1
        }), this.withdraw_list();
    },
    onShow: function() {},
    withdraw_list: function() {
        var i = t.api_root + "User/get_withdraw_list", e = this, n = t.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.uid = n.uid, o.much_id = t.siteInfo.uniacid, 
        o.page = this.data.page, a.POST(i, {
            params: o,
            success: function(t) {
                e.setData({
                    withdraw_list: t.data
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
        i({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            page: this.data.page + 1
        }), this.withdraw_list(), i.hide();
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
            path: "/yl_welore/pages/index/index",
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