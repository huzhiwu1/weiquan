var t = getApp(), e = (require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), 
require("../../../../5E0B68B67EC361BF386D00B1C8BD8A51.js"), require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast);

Page({
    data: {
        info: [],
        nvabarData: {
            showCapsule: 0,
            title: "关于我们",
            height: 2 * t.globalData.height + 20
        },
        version: t.version,
        page: 1
    },
    onLoad: function(e) {
        t.authority(), this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx,
            copyright: t.globalData.copyright
        });
    },
    call_phone: function(t) {
        var e = t.currentTarget.dataset.phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    onShow: function() {},
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