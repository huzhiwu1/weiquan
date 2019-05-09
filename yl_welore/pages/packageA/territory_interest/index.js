var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

wx.createInnerAudioContext();

Page({
    data: {
        isIpx: t.globalData.isIpx,
        nvabarData: {
            showCapsule: 1,
            title: "申请列表",
            height: 2 * t.globalData.height + 20
        },
        page: 1,
        user_list: [],
        envite: !1,
        ins_id: ""
    },
    onLoad: function(e) {
        this.setData({
            height: t.globalData.height,
            page: 1,
            id: e.id
        }), this.get_my_rec();
    },
    onShow: function() {},
    get_my_rec: function() {
        var i = this, n = t.getCache("userinfo"), s = new Object();
        s.token = n.token, s.openid = n.openid, s.much_id = t.siteInfo.uniacid, s.uid = n.uid, 
        s.id = this.data.id, s.page = this.data.page;
        var o = t.api_root + "User/get_user_territory_interest";
        e.POST(o, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? i.setData({
                    user_list: t.data.info
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
    envite_sulord: function(t) {
        this.setData({
            envite: !0,
            ins_id: t.currentTarget.dataset.id,
            data_key: t.currentTarget.dataset.key
        });
    },
    hideModal: function() {
        this.setData({
            envite: !1
        });
    },
    add_envite_sulord: function() {
        this.hideModal(), wx.showLoading({
            title: "操作中...",
            mask: !0
        });
        var i = this, n = t.getCache("userinfo"), s = new Object();
        s.token = n.token, s.openid = n.openid, s.much_id = t.siteInfo.uniacid, s.uid = n.uid, 
        s.id = this.data.ins_id, s.status = this.data.data_key;
        var o = t.api_root + "User/add_territory_interest";
        e.POST(o, {
            params: s,
            success: function(t) {
                "success" == t.data.status ? (a({
                    content: t.data.msg
                }), i.get_my_rec()) : a({
                    content: t.data.msg
                }), wx.hideLoading();
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
    }
});