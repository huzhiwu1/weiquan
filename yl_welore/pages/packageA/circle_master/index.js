var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        user_list: []
    },
    onLoad: function(e) {
        var a = t.getCache("userinfo");
        this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx,
            uid: a.uid,
            design: t.globalData.design
        }), this.user_mastert();
    },
    onShow: function() {},
    user_mastert: function() {
        var n = t.api_root + "User/user_mastert", o = this, i = t.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.much_id = t.siteInfo.uniacid, e.POST(n, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? o.setData({
                    user_list: t.data.info,
                    user_info: t.data.user_info
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
    get_qq_info: function() {
        var n = t.api_root + "User/get_qq_info", o = this, i = t.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.much_id = t.siteInfo.uniacid, s.id = this.data.id, 
        e.POST(n, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? o.setData({
                    info: t.data.info,
                    da_qq: t.data.info.da_qq,
                    xiao_qq: t.data.info.xiao_qq
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
    previewOneImage: function() {
        var e = this, n = t.getCache("userinfo"), o = t.api_root + "User/img_upload";
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(i) {
                a({
                    content: "上传中...",
                    type: "loading"
                });
                var s = i.tempFilePaths;
                wx.uploadFile({
                    url: o,
                    filePath: s[0],
                    name: "sngpic",
                    formData: {
                        token: n.token,
                        openid: n.openid,
                        much_id: t.siteInfo.uniacid
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(t) {
                        console.log(t);
                        var n = JSON.parse(t.data);
                        console.log(n), "error" == n.status ? a({
                            content: n.msg
                        }) : (e.setData({
                            img: n.url
                        }), a.hide());
                    },
                    fail: function(t) {
                        a({
                            content: "上传错误！",
                            type: "error"
                        });
                    }
                });
            }
        });
    },
    handleFruitChange: function(t) {
        var e = t.detail, a = void 0 === e ? {} : e;
        this.setData({
            current: a.value
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