var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = (require("../../../../5E0B68B67EC361BF386D00B1C8BD8A51.js"), 
require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast);

Page({
    data: {
        info: [],
        nvabarData: {
            showCapsule: 0,
            title: "举报投诉记录",
            height: 2 * t.globalData.height + 20
        },
        current: "tab1",
        page: 1
    },
    handleChange: function(t) {
        var e = t.detail;
        this.setData({
            current: e.key
        }), this.get_user_report();
    },
    onLoad: function(e) {
        this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx
        });
    },
    onShow: function() {
        this.get_user_report();
    },
    get_user_report: function() {
        var i = t.api_root + "User/get_user_report", s = this, n = t.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.much_id = t.siteInfo.uniacid, o.uid = n.uid, 
        o.is_type = this.data.current, e.POST(i, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? s.setData({
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
    user_mutter: function(t) {
        console.log(t), this.setData({
            sc_msg: !0,
            id: t.currentTarget.dataset.key
        });
    },
    is_sc_text: function(t) {
        this.setData({
            sc_text: t.detail.value
        });
    },
    hideModal: function() {
        this.setData({
            sc_msg: !1
        });
    },
    do_user_mutter: function() {
        var i = t.api_root + "User/do_paper_mutter", s = this, n = t.getCache("userinfo"), o = new Object();
        o.token = n.token, o.openid = n.openid, o.much_id = t.siteInfo.uniacid, o.uid = n.uid, 
        o.id = this.data.info[this.data.id].id, o.tory_id = this.data.info[this.data.id].tory_id, 
        o.is_reply = this.data.info[this.data.id].is_reply, o.tale_content = this.data.sc_text, 
        e.POST(i, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (s.setData({
                    sc_msg: !1
                }), a({
                    content: t.data.msg
                })) : a({
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
        wx.navigateBack();
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