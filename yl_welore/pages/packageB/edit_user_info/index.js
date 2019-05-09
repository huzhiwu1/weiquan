var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        user_info: {},
        current: "男",
        img: "",
        nick_name: "",
        autograph: ""
    },
    onLoad: function(e) {
        this.setData({
            height: t.globalData.height,
            isIpx: t.globalData.isIpx
        }), this.get_user_info();
    },
    onShow: function() {},
    get_input: function(t) {
        this.setData({
            nick_name: t.detail.detail.value
        });
    },
    get_text: function(t) {
        this.setData({
            autograph: t.detail.value
        });
    },
    edit_submit: function() {
        var n = t.api_root + "User/edit_user_info", i = this, o = t.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, s.much_id = t.siteInfo.uniacid, s.uid = o.uid, 
        s.img = this.data.img, s.nick_name = this.data.nick_name, s.autograph = this.data.autograph, 
        s.gender = "男" == this.data.current ? 1 : 2, e.POST(n, {
            params: s,
            success: function(t) {
                "success" == t.data.status ? (a({
                    content: t.data.msg
                }), i.get_user_info()) : a({
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
    get_user_info: function() {
        var n = t.api_root + "User/get_user_info", i = this, o = t.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, s.much_id = t.siteInfo.uniacid, e.POST(n, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? i.setData({
                    info: t.data.info,
                    autograph: t.data.info.autograph,
                    nick_name: t.data.info.user_nick_name,
                    img: t.data.info.user_head_sculpture,
                    current: 1 == t.data.info.gender || 0 == t.data.info.gender ? "男" : "女"
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
        var e = this, n = t.getCache("userinfo"), i = t.api_root + "User/img_upload";
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(o) {
                a({
                    content: "上传中...",
                    type: "loading"
                });
                var s = o.tempFilePaths;
                wx.uploadFile({
                    url: i,
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
        var t = getCurrentPages();
        t[t.length - 1];
        t[t.length - 2].setData({
            show: !1
        }), wx.navigateBack();
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