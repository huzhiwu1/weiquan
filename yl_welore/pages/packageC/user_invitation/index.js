var e = getApp(), t = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = (require("../../../../5E0B68B67EC361BF386D00B1C8BD8A51.js"), 
require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast), n = wx.getFileSystemManager();

Page({
    data: {
        info: [],
        nvabarData: {
            showCapsule: 0,
            title: "推荐有奖",
            height: 2 * e.globalData.height + 20
        },
        page: 1,
        set_img_quan: !1,
        this_user_info: {},
        code: "",
        yzm_text: ""
    },
    onLoad: function(t) {
        e.authority();
        var a = decodeURIComponent(t.scene);
        console.log(a);
        var n = e.getCache("userinfo");
        "undefined" != a && n && (this.ger_cor_user_code(a), this.setData({
            scene: a
        })), this.setData({
            height: e.globalData.height,
            isIpx: e.globalData.isIpx,
            copyright: e.globalData.copyright,
            design: e.globalData.design
        });
    },
    onShow: function(t) {
        console.log(t), e.getCache("userinfo") && (this.ger_user_code(), this.data.scene && this.ger_cor_user_code(this.data.scene)), 
        this.get_ad();
    },
    get_ad: function() {
        var a = e.getCache("userinfo"), n = new Object();
        n.token = a.token, n.openid = a.openid, n.much_id = e.siteInfo.uniacid;
        var i = e.api_root + "User/get_ad";
        t.POST(i, {
            params: n,
            success: function(e) {
                console.log(e), "账户未授权!" == e.data.msg && wx.navigateTo({
                    url: "/yl_welore/pages/author/index"
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
    get_yzm_text: function(e) {
        this.setData({
            yzm_text: e.detail.value
        });
    },
    ger_cor_user_code: function(a) {
        var n = this, i = e.getCache("userinfo"), o = new Object();
        o.token = i.token, o.openid = i.openid, o.much_id = e.siteInfo.uniacid, o.uid = a;
        var s = e.api_root + "User/ger_user_code";
        t.POST(s, {
            params: o,
            success: function(e) {
                console.log(e), n.setData({
                    yzm_text: e.data
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
    ger_user_code: function() {
        var a = this, n = e.getCache("userinfo"), i = new Object();
        i.token = n.token, i.openid = n.openid, i.much_id = e.siteInfo.uniacid, i.uid = n.uid;
        var o = e.api_root + "User/ger_user_code";
        t.POST(o, {
            params: i,
            success: function(e) {
                console.log(e), a.setData({
                    code: e.data
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
    add_user_invitation: function() {
        var n = this, i = e.getCache("userinfo"), o = new Object();
        if (o.token = i.token, o.openid = i.openid, o.much_id = e.siteInfo.uniacid, o.uid = i.uid, 
        o.yzm_text = n.data.yzm_text, "" == n.data.yzm_text) return a({
            content: "内容不能为空"
        }), !1;
        var s = e.api_root + "User/add_user_invitation";
        t.POST(s, {
            params: o,
            success: function(e) {
                a("success" == e.data.status ? {
                    content: e.data.msg
                } : {
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
    img_quan: function(e) {
        console.log(e), this.setData({
            set_img_quan: !0,
            this_user_info: e.detail.userInfo
        }), this.getAvaterInfo();
    },
    no_set_img_quan: function() {
        this.setData({
            set_img_quan: !1
        });
    },
    getAvaterInfo: function() {
        wx.showLoading({
            title: "生成中...",
            mask: !0
        });
        var a = this, n = e.getCache("userinfo"), i = new Object();
        i.token = n.token, i.openid = n.openid, i.much_id = e.siteInfo.uniacid, i.img = a.data.this_user_info.avatarUrl;
        var o = e.api_root + "User/base64EncodeImage";
        t.POST(o, {
            params: i,
            success: function(e) {
                a.getQrCode(e.data);
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
    getQrCode: function(t) {
        wx.showLoading({
            title: "生成中...",
            mask: !0
        });
        var a = this, a = this, n = e.getCache("userinfo"), i = new Object();
        i.token = n.token, i.openid = n.openid, i.much_id = e.siteInfo.uniacid, i.uid = n.uid;
        var o = e.api_root + "User/qrcode_code";
        wx.request({
            url: o,
            method: "POST",
            data: i,
            responseType: "arraybuffer",
            header: {
                "content-type": "application/json,charset=utf-8"
            },
            success: function(e) {
                var n = wx.arrayBufferToBase64(e.data);
                a.sharePosteCanvas(t, n);
            }
        });
    },
    sharePosteCanvas: function(e, t) {
        wx.showLoading({
            title: "生成中...",
            mask: !0
        });
        var a = this, i = a.data.this_user_info, o = wx.createCanvasContext("myCanvas", a), s = "";
        wx.createSelectorQuery().select("#canvas-container").boundingClientRect(function(c) {
            var r = c.height;
            c.right;
            s = c.width;
            c.left;
            o.save(), o.setFillStyle("#FFE200"), o.fillRect(0, 0, s, r);
            o.drawImage("../../../style/icon/1033914-20180419150322109-1754886203.png", 0, 0, s, 150), 
            o.beginPath(), o.fill();
            var u = s / 2 - 25, l = e.split(","), d = wx.base64ToArrayBuffer(l[1]), h = wx.env.USER_DATA_PATH + "/head_img.png";
            n.writeFileSync(h, d, "binary"), o.arc(25 + u, 185, 25, 0, 2 * Math.PI, !1), o.clip(), 
            o.drawImage(h, u, 160, 50, 50), o.restore(), o.setFontSize(20), o.setFillStyle("#000"), 
            o.fillText(i.nickName, (s - o.measureText(i.nickName).width) / 2, 235), o.setFontSize(11), 
            o.setFillStyle("#000"), o.fillText("邀你一起赚赏金", (s - o.measureText("邀你一起赚赏金").width) / 2, 260);
            o.drawImage("../../../style/icon/1033914-20180419150331561-740454292.png", s / 2 - 115, 290, 230, 60), 
            o.setFontSize(35), o.setFillStyle("#FFE200"), o.fillText(a.data.code, (s - o.measureText(a.data.code).width) / 2, 325);
            o.drawImage("../../../style/icon/1033914-20180419150338090-1432865429.png", s / 2 - 125, 390, 130, 70), 
            o.setFontSize(10), o.setFillStyle("#000000"), o.fillText("进入小程序输入朋友的邀", s / 2 - 120, 410), 
            o.fillText("请码，各自都会获得赏金", s / 2 - 120, 425), o.fillText("哦~", s / 2 - 120, 440);
            var f = wx.base64ToArrayBuffer(t), g = wx.env.USER_DATA_PATH + "/code_img.png";
            n.writeFileSync(g, f, "binary"), o.drawImage(g, s - 120, 360, 80, 80);
            o.drawImage("../../../style/icon/1033914-20180419150342935-1154229474.png", s - 120, 440, 80, 22);
        }).exec(), setTimeout(function() {
            o.draw(), wx.canvasToTempFilePath({
                canvasId: "myCanvas",
                success: function(e) {
                    var t = e.tempFilePath;
                    a.setData({
                        imagePath_c: t
                    });
                },
                fail: function(e) {
                    console.log(e);
                }
            }), wx.hideLoading();
        }, 1e3);
    },
    saveShareImg: function() {
        var e = this;
        wx.showLoading({
            title: "正在保存",
            mask: !0
        }), setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "myCanvas",
                success: function(e) {
                    wx.hideLoading();
                    var t = e.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: t,
                        success: function(e) {
                            wx.showModal({
                                content: "图片已保存到相册，赶紧晒一下吧~",
                                showCancel: !1,
                                confirmText: "好的",
                                confirmColor: "#333",
                                success: function(e) {
                                    e.confirm;
                                },
                                fail: function(e) {}
                            });
                        },
                        fail: function(e) {
                            console.log(e), "saveImageToPhotosAlbum:fail auth deny" == e.errMsg && wx.showModal({
                                content: "检测到您未打开微信保存图片到相册，开启后即可保存图片",
                                confirmText: "去开启",
                                success: function(e) {
                                    e.confirm ? wx.openSetting({
                                        success: function(e) {}
                                    }) : e.cancel;
                                }
                            });
                        }
                    });
                },
                fail: function(e) {
                    console.log(e);
                }
            }, e);
        }, 1e3);
    },
    _navback: function() {
        var e = getCurrentPages(), t = (e[e.length - 1], e[e.length - 2]);
        1 != e.length ? (t.setData({
            show: !1
        }), wx.navigateBack()) : this._backhome();
    },
    _backhome: function() {
        wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    }
});