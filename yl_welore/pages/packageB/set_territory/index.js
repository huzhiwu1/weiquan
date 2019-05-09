var e = getApp(), t = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = (require("../../../../5E0B68B67EC361BF386D00B1C8BD8A51.js"), 
require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast);

Page({
    data: {
        nvabarData: {
            showCapsule: 0,
            height: 2 * e.globalData.height + 20
        },
        needle: [],
        needle_index: 0,
        img_arr: [],
        img_botton: !0,
        this_qz: !0,
        this_qx: !1,
        is_submit: !1,
        title: ""
    },
    onLoad: function(t) {
        this.setData({
            height: e.globalData.height,
            isIpx: e.globalData.isIpx,
            design: e.globalData.design,
            title: "创建" + e.globalData.design.landgrave
        });
    },
    onShow: function() {
        this.get_needle();
    },
    onChange: function(e) {
        var t = e.detail;
        this.setData({
            this_qz: t.value
        });
    },
    onChange_qx: function(e) {
        var t = e.detail;
        this.setData({
            this_qx: t.value
        });
    },
    formSubmit: function(n) {
        var i = this;
        i.setData({
            is_submit: !0
        });
        var o = new Object(), s = e.getCache("userinfo");
        o.needle_id = this.data.needle[this.data.needle_index].id, o.realm_icon = this.data.img_arr[0], 
        o.is_gnaw_qulord = 0 == this.data.this_qz ? 0 : 1, o.attention = 0 == this.data.this_qx ? 0 : 1, 
        o.realm_name = n.detail.value.qq_name, o.realm_synopsis = n.detail.value.qq_content, 
        o.solicit_origin = n.detail.value.qq_apply, o.token = s.token, o.openid = s.openid, 
        o.uid = s.uid, o.much_id = e.siteInfo.uniacid;
        var l = e.api_root + "User/add_territory_petition";
        t.POST(l, {
            params: o,
            success: function(e) {
                console.log(e), "success" == e.data.status ? (a({
                    content: e.data.msg
                }), setTimeout(function() {
                    wx.navigateBack();
                }, 2e3)) : (i.setData({
                    is_submit: !1
                }), a({
                    content: e.data.msg
                }));
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
    needleChange: function(e) {
        this.setData({
            needle_index: e.detail.value
        });
    },
    get_needle: function() {
        var n = this, i = e.getCache("userinfo"), o = new Object();
        o.token = i.token, o.openid = i.openid, o.uid = i.uid, o.much_id = e.siteInfo.uniacid;
        var s = e.api_root + "User/get_left_needle";
        t.POST(s, {
            params: o,
            success: function(e) {
                console.log(e), "success" == e.data.status ? n.setData({
                    needle: e.data.info
                }) : a({
                    content: e.data.msg
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
    previewOneImage: function() {
        var t = this, n = e.getCache("userinfo"), i = e.api_root + "User/img_upload";
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                a({
                    content: "上传中...",
                    type: "loading"
                });
                var o = e.tempFilePaths;
                wx.uploadFile({
                    url: i,
                    filePath: o[0],
                    name: "sngpic",
                    formData: {
                        token: n.token,
                        openid: n.openid
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(e) {
                        console.log(e);
                        var n = JSON.parse(e.data);
                        console.log(n), "error" == n.status ? a({
                            content: n.msg
                        }) : (t.setData({
                            img_arr: t.data.img_arr.concat(n.url),
                            img_botton: !1
                        }), a.hide()), console.log(t.data.img_botton);
                    },
                    fail: function(e) {
                        a({
                            content: "上传错误！",
                            type: "error"
                        });
                    }
                });
            }
        });
    },
    clearOneImage: function(e) {
        var t = this, a = e.target.dataset.index, n = t.data.img_arr;
        n.splice(a, 1), t.setData({
            img_arr: n
        }), t.setData({
            img_botton: !0
        });
    },
    _navback: function() {
        wx.navigateBack();
    },
    onShareAppMessage: function() {
        var t = e.globalData.forward;
        return console.log(t), t ? {
            title: t.title,
            path: "/yl_welore/pages/index/index",
            imageUrl: t.reis_img,
            success: function(e) {
                a({
                    content: "转发成功"
                });
            },
            fail: function(e) {
                a({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/index/index",
            success: function(e) {
                a({
                    content: "转发成功"
                });
            },
            fail: function(e) {
                a({
                    content: "转发失败"
                });
            }
        };
    }
});