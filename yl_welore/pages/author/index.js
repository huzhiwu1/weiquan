var app = getApp(), http = require("../../util/http.js");

Page({
    data: {
        copyright: {},
        type: 0
    },
    onGotUserInfo: function(e) {
        app.removeCache("userinfo");
        var t = this;
        app.getCache("userinfo") || app.getUserInfo(e.detail.userInfo, function(e) {
            1e3 != app && (0 == t.data.type ? wx.reLaunch({
                url: "/yl_welore/pages/index/index"
            }) : wx.reLaunch({
                url: "/yl_welore/pages/packageA/article/index?id=" + t.data.id + "&info_type=" + t.data.info_type
            }));
        });
        // 这里接的是商城的授权逻辑
        var n = this;
        "getUserInfo:ok" == e.detail.errMsg && getApp().core.login({
            // 这是用户同意授权后的操作
            success: function(o) {
                var t = o.code;
                n.unionLogin({
                    code: t,
                    user_info: e.detail.rawData,
                    encrypted_data: e.detail.encryptedData,
                    iv: e.detail.iv,
                    signature: e.detail.signature
                });
            },
            fail: function(o) {}
        });
    },
    onLoad: function(e) {
        this.setData({
            type: e.type,
            info_type: e.info_type,
            id: e.id
        }), wx.hideShareMenu();
    },
    onShow: function() {
        wx.hideShareMenu(), this.authority();
    },
    authority: function() {
        var e = app.api_root + "Login/get_authority", t = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, i.much_id = app.siteInfo.uniacid, http.POST(e, {
            params: i,
            success: function(e) {
                console.log(e), t.setData({
                    copyright: e.data
                });
            },
            fail: function() {
                wx.showModal({
                    title: "提示",
                    content: "网络繁忙，请稍候重试！",
                    showCancel: !1,
                    success: function(e) {}
                });
            }
        });
    },
    // 这里要接的是商城的授权逻辑
    unionLogin: function(e) {
        var o = getCurrentPages().pop(), n = this;
        getApp().core.showLoading({
            title: "正在登录",
            mask: !0
        }), getApp().request({
            url: getApp().api.passport.login,
            method: "POST",
            data: e,
            success: function(e) {
                if (0 == e.code) {
                    o.setData({
                        __user_info: e.data
                    }), getApp().setUser(e.data), getApp().core.setStorageSync(getApp().const.ACCESS_TOKEN, e.data.access_token), 
                    getApp().trigger.run(getApp().trigger.events.login);
                    var t = getApp().core.getStorageSync(getApp().const.STORE);
                    e.data.binding || !t.option.phone_auth || t.option.phone_auth && 0 == t.option.phone_auth ? n.loadRoute() : ("undefined" == typeof wx && n.loadRoute(), 
                    n.setPhone()), n.setUserInfoShowFalse();
                } else getApp().login_complete = !1, getApp().core.showModal({
                    title: "提示",
                    content: e.msg,
                    showCancel: !1
                });
            },
            fail: function() {
                getApp().login_complete = !1;
            },
            complete: function() {
                getApp().core.hideLoading();
            }
        });
    },
});