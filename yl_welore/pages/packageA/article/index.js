var t = function() {
    function t(t, e) {
        var a = [], i = !0, n = !1, s = void 0;
        try {
            for (var o, c = t[Symbol.iterator](); !(i = (o = c.next()).done) && (a.push(o.value), 
            !e || a.length !== e); i = !0) ;
        } catch (t) {
            n = !0, s = t;
        } finally {
            try {
                !i && c.return && c.return();
            } finally {
                if (n) throw s;
            }
        }
        return a;
    }
    return function(e, a) {
        if (Array.isArray(e)) return e;
        if (Symbol.iterator in Object(e)) return t(e, a);
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
    };
}(), e = getApp(), a = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), i = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast, n = wx.getRecorderManager(), s = wx.createInnerAudioContext(), o = {
    duration: 6e4,
    sampleRate: 16e3,
    numberOfChannels: 1,
    encodeBitRate: 96e3,
    format: "mp3",
    frameSize: 50
}, c = wx.getFileSystemManager(), d = "", u = 1, r = "all";

Page({
    data: {
        check_img: "",
        set_img_quan: !1,
        visible: !1,
        visible1: !1,
        visible2: !1,
        zhuanfa: !1,
        actions_index: [],
        actions: [],
        actions1: [],
        actions2: [],
        del_msg: !1,
        tz_jin_msg: !1,
        isIpx: e.globalData.isIpx,
        current: "tab1",
        current_h: "h1",
        nvabarData: {
            showCapsule: 1,
            title: "贴子详情",
            height: 2 * e.globalData.height + 20
        },
        huifu: !1,
        jubao: !1,
        huifu_zan: !1,
        huifu_list: [],
        animationData: {},
        img_arr: [],
        img_botton: !0,
        file: "",
        file_ss: 0,
        text: "",
        jubao_text: "",
        di_msg: !1,
        del_mod: !1,
        info_zan: !1,
        info_zan_count: 0,
        info_sc: !1,
        info_sc_count: 0,
        animationData_zan: {},
        animationData_sc: {},
        animationJbData: {},
        select: !0,
        is_qq_text: "",
        li_number: 1,
        li_list: [],
        sex: 1,
        qrCode: "",
        show: !0,
        reply_and_hui: !1,
        get_reply_and_info: [],
        get_reply_and_list: [],
        get_reply_and_text: "",
        placeholder_reply: "写评论",
        get_reply_and_page: 1,
        di_get_reply: !1,
        get_reply_and_user_id: 0,
        focus: !1,
        version: 0
    },
    get_reply_user: function(t) {
        var e = t.currentTarget.dataset.user_id, a = t.currentTarget.dataset.user_name;
        this.setData({
            placeholder_reply: "回复 " + a + ":",
            get_reply_and_user_id: e,
            focus: !0
        });
    },
    page_get_reply: function() {
        this.setData({
            get_reply_and_page: this.data.get_reply_and_page + 1
        }), this.get_reply_and_hui();
    },
    reply_and: function(t) {
        this.setData({
            get_reply_and_hui_id: t.currentTarget.dataset.hui_id,
            get_reply_and_list: [],
            get_reply_and_page: 1
        });
        var e = this, a = wx.createAnimation({
            duration: 150,
            timingFunction: "ease"
        });
        e.animation = a, a.translateY(550).step(), e.setData({
            animationData: a.export(),
            reply_and_hui: !0,
            select: !1
        }), e.get_reply_and_hui(), setTimeout(function() {
            a.translateY(0).step(), e.setData({
                animationData: a.export()
            });
        }, 100);
    },
    get_reply_and_text: function(t) {
        this.setData({
            get_reply_and_text: t.detail.value
        });
    },
    add_reply_and_hui: function() {
        if (console.log(1), "" != this.data.get_reply_and_text) {
            wx.showLoading({
                title: "正在回复...",
                mask: !0
            });
            var t = this, n = e.getCache("userinfo"), s = new Object();
            s.token = n.token, s.openid = n.openid, s.much_id = e.siteInfo.uniacid, s.uid = n.uid, 
            s.id = this.data.get_reply_and_hui_id, s.user_id = this.data.get_reply_and_user_id, 
            s.duplex_content = this.data.get_reply_and_text;
            var o = e.api_root + "User/add_paper_reply_duplex";
            a.POST(o, {
                params: s,
                success: function(e) {
                    console.log(e), i({
                        content: e.data.msg
                    }), t.setData({
                        get_reply_and_text: "",
                        get_reply_and_list: [],
                        placeholder_reply: "写评论",
                        get_reply_and_page: 1
                    }), t.get_reply_and_hui(), wx.hideLoading();
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
        } else i({
            content: "内容不能为空"
        });
    },
    get_reply_and_hui: function() {
        var t = this, i = e.getCache("userinfo"), n = new Object();
        n.token = i.token, n.openid = i.openid, n.much_id = e.siteInfo.uniacid, n.id = t.data.get_reply_and_hui_id, 
        n.page = this.data.get_reply_and_page;
        var s = e.api_root + "User/get_paper_reply_info", o = t.data.get_reply_and_list;
        a.POST(s, {
            params: n,
            success: function(e) {
                console.log(e), 0 == e.data.list.length && t.setData({
                    di_get_reply: !0
                });
                for (var a = 0; a < e.data.list.length; a++) o.push(e.data.list[a]);
                t.setData({
                    get_reply_and_info: e.data.info,
                    get_reply_and_list: o
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
    add_liwu: function() {
        this.setData({
            huifu: !0,
            select: !1,
            current: "tab3"
        });
    },
    zhuanfa: function(i) {
        wx.showLoading({
            title: "加载中...",
            mask: !0
        }), this.setData({
            select: !1,
            zhuanfa: !0,
            this_user_info: i.detail.userInfo
        });
        var n = this, i = e.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.much_id = e.siteInfo.uniacid, this.data.info.image_part ? this.data.info.image_part.length > 0 && (s.img = this.data.info.image_part[0]) : 1 == this.data.info_zf.whether_open && (s.img = this.data.info_zf.reis_img), 
        2 == this.data.info_type && (s.img = e.http_root + "/addons/yl_welore/web/static/wechat/shipin.png"), 
        1 == this.data.info_type && (s.img = e.http_root + "/addons/yl_welore/web/static/wechat/yuyin.png");
        var o = e.api_root + "User/base64EncodeImage";
        a.POST(o, {
            params: s,
            success: function(e) {
                n.setData({
                    base_data: e.data
                });
                var a = e.data.split(",");
                console.log(a);
                var i = wx.base64ToArrayBuffer(a[1]), s = wx.env.USER_DATA_PATH + "/share_img" + n.data.id + ".png";
                (n.data.info.image_part || 0 != n.data.info_type) && c.writeFileSync(s, i, "binary"), 
                n.setData({
                    fileName: s
                }), wx.getImageInfo({
                    src: s,
                    success: function(e) {
                        wx.getSystemInfo({
                            success: function(a) {
                                console.log(1);
                                var i = e.width / e.height, s = .72 * a.windowWidth / i + 230, o = n.data.info.study_content.replace(/<[^>]*>/g, ""), c = n.textByteLength(o, 35), d = t(c, 3), u = (d[0], 
                                d[1]), r = (d[2], u.length > 15 ? 15 : u.length), s = parseFloat(s + 22 * r);
                                console.log(s), n.setData({
                                    imgheght: s
                                });
                            }
                        });
                    },
                    fail: function() {
                        console.log(2);
                        var e = n.data.info.study_content.replace(/<[^>]*>/g, ""), a = n.textByteLength(e, 35), i = t(a, 3), s = (i[0], 
                        i[1]), o = (i[2], s.length > 15 ? 15 : s.length), c = parseFloat(230 + 22 * o);
                        n.setData({
                            imgheght: c
                        });
                    }
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
    no_zhuanfa: function() {
        this.setData({
            select: !0,
            zhuanfa: !1
        });
    },
    set_img_quan: function() {
        this.setData({
            select: !1,
            set_img_quan: !0,
            zhuanfa: !1
        }), wx.pageScrollTo({
            scrollTop: 0
        }), this.getAvaterInfo();
    },
    no_set_img_quan: function() {
        this.setData({
            select: !0,
            set_img_quan: !1,
            zhuanfa: !1
        });
    },
    getAvaterInfo: function() {
        wx.showLoading({
            title: "生成中...",
            mask: !0
        });
        var t = this, i = e.getCache("userinfo"), n = new Object();
        n.token = i.token, n.openid = i.openid, n.much_id = e.siteInfo.uniacid, n.img = t.data.this_user_info.avatarUrl;
        var s = e.api_root + "User/base64EncodeImage";
        a.POST(s, {
            params: n,
            success: function(e) {
                t.getQrCode(e.data);
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
    getQrCode: function(t) {
        wx.showLoading({
            title: "生成中...",
            mask: !0
        });
        var a = this, a = this, i = e.getCache("userinfo"), n = new Object();
        n.token = i.token, n.openid = i.openid, n.much_id = e.siteInfo.uniacid, n.id = a.data.id;
        var s = e.api_root + "User/qrcode";
        wx.request({
            url: s,
            method: "POST",
            data: n,
            responseType: "arraybuffer",
            header: {
                "content-type": "application/json,charset=utf-8"
            },
            success: function(e) {
                var i = wx.arrayBufferToBase64(e.data);
                a.sharePosteCanvas(t, i);
            }
        });
    },
    sharePosteCanvas: function(e, a) {
        wx.showLoading({
            title: "生成中...",
            mask: !0
        });
        var i = this, n = i.data.this_user_info, s = wx.createCanvasContext("myCanvas", i), o = "";
        wx.createSelectorQuery().select("#canvas-container").boundingClientRect(function(d) {
            var u = d.height;
            d.right;
            o = d.width;
            d.left;
            if (s.save(), s.setFillStyle("#ffffff"), s.fillRect(0, 0, o, u), e) {
                s.beginPath(), s.fill();
                var r = 10, l = 10, _ = e.split(","), h = wx.base64ToArrayBuffer(_[1]), f = wx.env.USER_DATA_PATH + "/head_img" + i.data.id + ".png";
                c.writeFileSync(f, h, "binary"), s.arc(25 + r, 25 + l, 25, 0, 2 * Math.PI, !1), 
                s.clip(), s.drawImage(f, r, l, 50, 50);
            }
            s.restore(), s.setFontSize(12), s.setFillStyle("#999"), s.setTextAlign("left"), 
            s.fillText(n.nickName, r + 60, l + 20), s.setFontSize(14), s.setFillStyle("#000"), 
            s.fillText(i.substr(i.data.info.study_title), r + 60, l + 45);
            var g = i.data.info.study_content.replace(/<[^>]*>/g, "").replace(/\n/g, ""), p = i.textByteLength(g, 35), m = t(p, 3), y = (m[0], 
            m[1]);
            m[2];
            s.setTextAlign("left"), s.setFillStyle("#000");
            console.log(y);
            for (var w = 0; w < y.length && !(w > 15); w++) s.setFontSize(14), console.log(w), 
            o > 270 ? s.fillText(y[w], o - 270, 85 + 22 * w) : s.fillText(y[w], o - 255, 85 + 22 * w);
            var v = wx.base64ToArrayBuffer(a), x = wx.env.USER_DATA_PATH + "/code_img" + i.data.id + ".png";
            c.writeFileSync(x, v, "binary"), s.drawImage(x, o / 2 - 50, u - 140, 110, 110), 
            s.setFontSize(10), s.setFillStyle("#000"), s.fillText("👆微信扫码或长按识别👆", o / 2 - 50, u - 20), 
            console.log(i.data.fileName), i.data.info.study_content ? s.drawImage(i.data.fileName, 0, 70 + 22 * y.length, o, i.data.imgheght - 230 - 22 * y.length) : s.drawImage(i.data.fileName, 0, 70 + 22 * y.length, o, i.data.imgheght - 230), 
            1 == i.data.info_type && (s.setFontSize(20), s.setFillStyle("#fff"), s.fillText(i.data.info.study_voice_time + "''", o - 50, 117 + 22 * y.length), 
            s.fillText(" ♬ ", 20, 117 + 22 * y.length), s.setFontSize(18), s.fillText("一段神秘语音", 50, 117 + 22 * y.length));
        }).exec(), setTimeout(function() {
            s.draw(), wx.canvasToTempFilePath({
                canvasId: "myCanvas",
                success: function(t) {
                    var e = t.tempFilePath;
                    i.setData({
                        imagePath_c: e
                    });
                },
                fail: function(t) {
                    console.log(t);
                }
            }), wx.hideLoading();
        }, 1e3);
    },
    saveShareImg: function() {
        var t = this;
        wx.showLoading({
            title: "正在保存",
            mask: !0
        }), setTimeout(function() {
            wx.canvasToTempFilePath({
                canvasId: "myCanvas",
                success: function(t) {
                    wx.hideLoading();
                    var e = t.tempFilePath;
                    wx.saveImageToPhotosAlbum({
                        filePath: e,
                        success: function(t) {
                            wx.showModal({
                                content: "图片已保存到相册，赶紧晒一下吧~",
                                showCancel: !1,
                                confirmText: "好的",
                                confirmColor: "#333",
                                success: function(t) {
                                    t.confirm;
                                },
                                fail: function(t) {}
                            });
                        },
                        fail: function(t) {
                            console.log(t), "saveImageToPhotosAlbum:fail auth deny" == t.errMsg && wx.showModal({
                                content: "检测到您未打开微信保存图片到相册，开启后即可保存图片",
                                confirmText: "去开启",
                                success: function(t) {
                                    t.confirm ? wx.openSetting({
                                        success: function(t) {}
                                    }) : t.cancel;
                                }
                            });
                        }
                    });
                },
                fail: function(t) {
                    console.log(t);
                }
            }, t);
        }, 1e3);
    },
    substr: function(t) {
        return 0 != t.length && void 0 != t && (t.length > 16 ? t.substring(0, 16) + "..." : t);
    },
    textByteLength: function(t, e) {
        for (var a = 0, i = 1, n = 0, s = [], o = 0; o < t.length; o++) t.charCodeAt(o) > 255 ? (a += 2) > i * e && (a++, 
        s.push(t.slice(n, o)), n = o, i++) : ++a > i * e && (s.push(t.slice(n, o)), n = o, 
        i++);
        return s.push(t.slice(n, t.length)), [ a, s, i ];
    },
    get_liwu_ph: function() {
        var t = this, n = e.getCache("userinfo"), s = new Object();
        s.token = n.token, s.openid = n.openid, s.much_id = e.siteInfo.uniacid, s.uid = this.data.info.user_id;
        var o = e.api_root + "User/get_user_guard";
        a.POST(o, {
            params: s,
            success: function(e) {
                console.log(e), "success" == e.data.status ? t.setData({
                    liwu_ph: e.data.info,
                    liwu_count: e.data.count
                }) : i({
                    content: e.data.msg
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
    handleCancel1: function() {
        this.setData({
            visible: !1,
            select: !0,
            visible1: !1,
            visible2: !1
        });
    },
    handleCancel2: function() {
        this.setData({
            actions: [],
            actions2: []
        });
        var t = this.data.info, e = this.data.actions;
        t.user_id != this.data.uid && "da" != t.is_qq && "xiao" != t.is_qq || e.push({
            name: "删除",
            type: "sc",
            is_qq: t.is_qq,
            icon: "trash"
        }), "da" != t.is_qq && "xiao" != t.is_qq || (e.push({
            name: "置顶",
            type: "zd",
            icon: "packup"
        }), t.user_id != this.data.uid && e.push({
            name: "禁言",
            type: "jy",
            icon: "close"
        }), 0 != t.topping_time && e.push({
            name: "取消置顶",
            type: "qxzd",
            icon: "unfold"
        })), t.user_id != this.data.uid && "no" == t.is_qq && e.push({
            name: "举报",
            type: "jb",
            icon: "warning"
        }), this.setData({
            visible: !0,
            select: !1,
            actions: e
        });
    },
    handleCancel3: function(t) {
        console.log(t), this.setData({
            actions1: []
        });
        var e = t.currentTarget.dataset.user_id, a = this.data.actions1, i = this.data.info;
        if (i.user_id != this.data.uid && "da" != i.is_qq && "xiao" != i.is_qq || a.push({
            name: "删除",
            type: "sc",
            id: t.currentTarget.dataset.id,
            is_qq: i.is_qq,
            user_id: e,
            icon: "trash",
            key: t.currentTarget.dataset.key
        }), e == this.data.uid && "no" == i.is_qq && i.user_id != this.data.uid && a.push({
            name: "删除",
            type: "sc",
            id: t.currentTarget.dataset.id,
            is_qq: i.is_qq,
            user_id: e,
            icon: "trash",
            key: t.currentTarget.dataset.key
        }), e != this.data.uid && "no" == i.is_qq && a.push({
            name: "举报",
            type: "jb",
            id: t.currentTarget.dataset.id,
            user_id: e,
            icon: "warning"
        }), e != this.data.uid && ("da" == i.is_qq || "xiao" == i.is_qq)) {
            a.push({
                name: "禁言",
                type: "jy",
                user_id: e,
                icon: "close"
            });
            var n = this.data.actions2;
            n.push({
                name: "1天",
                day: 1,
                user_id: e
            }, {
                name: "3天",
                day: 3,
                user_id: e
            }, {
                name: "7天",
                day: 7,
                user_id: e
            }, {
                name: "15天",
                day: 15,
                user_id: e
            }, {
                name: "30天",
                day: 30,
                user_id: e
            }), this.setData({
                actions2: n
            });
        }
        this.setData({
            visible1: !0,
            select: !1,
            actions1: a
        });
    },
    handleClickItem2: function(t) {
        var e = t.detail.index, a = this.data.actions1[e];
        if (console.log(a), "jy" == a.type) {
            this.setData({
                actions2: []
            });
            var i = this.data.actions2;
            i.push({
                name: "1天",
                day: 1,
                user_id: a.user_id
            }, {
                name: "3天",
                day: 3,
                user_id: a.user_id
            }, {
                name: "7天",
                day: 7,
                user_id: a.user_id
            }, {
                name: "15天",
                day: 15,
                user_id: a.user_id
            }, {
                name: "30天",
                day: 30,
                user_id: a.user_id
            }), this.setData({
                visible: !1,
                visible1: !1,
                visible2: !0,
                actions2: i
            });
        }
        "jb" == a.type && (this.setData({
            visible1: !1
        }), this.jubao({
            kkk: 1,
            id: a.id
        })), "sc" == a.type && (("da" == a.is_qq || "xiao" == a.is_qq) && a.user_id != this.data.uid ? this.setData({
            visible1: !1,
            del_msg: !0,
            huifu_id: a.id
        }) : this.del_huifu({
            id: a.id,
            key: a.key
        }), this.setData({
            visible1: !1
        }));
    },
    handleClickItem1: function(t) {
        var e = t.detail.index, a = this.data.actions[e], i = this.data.info;
        console.log(a);
        var n = this.data.actions2;
        "jy" == a.type && (n.push({
            name: "1天",
            day: 1,
            user_id: i.user_id
        }, {
            name: "3天",
            day: 3,
            user_id: i.user_id
        }, {
            name: "7天",
            day: 7,
            user_id: i.user_id
        }, {
            name: "15天",
            day: 15,
            user_id: i.user_id
        }, {
            name: "30天",
            day: 30,
            user_id: i.user_id
        }), this.setData({
            visible: !1,
            visible2: !0,
            actions2: n
        })), "jb" == a.type && (this.setData({
            visible: !1
        }), this.jubao({
            kkk: 0,
            id: 0
        })), "zd" == a.type && (this.setData({
            visible: !1,
            select: !0
        }), this.placement()), "qxzd" == a.type && (this.setData({
            visible: !1,
            select: !0
        }), this.placement()), "sc" == a.type && ("da" != a.is_qq && "xiao" != a.is_qq || i.user_id != this.data.uid && this.setData({
            visible1: !1,
            tz_del_msg: !0
        }), i.user_id == this.data.uid && this.del_tz_do(), this.setData({
            visible: !1
        }));
    },
    banned_user: function(t) {
        var e = t.detail.index, a = this.data.actions2[e];
        this.setData({
            actions_index: a,
            visible2: !1,
            tz_jin_msg: !0
        });
    },
    do_banned_user: function() {
        var t = this, n = e.getCache("userinfo"), s = new Object();
        s.token = n.token, s.openid = n.openid, s.much_id = e.siteInfo.uniacid, s.uid = n.uid, 
        s.user_id = this.data.actions_index.user_id, s.day = this.data.actions_index.day, 
        s.refer_type = this.data.info.is_qq, s.tory_id = this.data.info.tory_id, s.beget = this.data.is_qq_text;
        var o = e.api_root + "User/do_banned_user";
        a.POST(o, {
            params: s,
            success: function(e) {
                console.log(e), e.data.status, t.hideModal(), i({
                    content: e.data.msg,
                    duration: 0
                }), setTimeout(function() {
                    i.hide();
                }, 3e3);
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
    placement: function() {
        var t = this, n = e.getCache("userinfo"), s = new Object();
        s.token = n.token, s.openid = n.openid, s.much_id = e.siteInfo.uniacid, s.id = this.data.id;
        var o = e.api_root + "User/placement";
        a.POST(o, {
            params: s,
            success: function(e) {
                console.log(e), "success" == e.data.status ? (i({
                    content: e.data.msg
                }), t.get_article_info()) : i({
                    content: e.data.msg
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
    get_ad: function() {
        var t = this, n = e.getCache("userinfo"), s = new Object();
        s.token = n.token, s.openid = n.openid, s.much_id = e.siteInfo.uniacid;
        var o = e.api_root + "User/get_ad";
        a.POST(o, {
            params: s,
            success: function(e) {
                console.log(e), "账户未授权!" == e.data.msg && wx.navigateTo({
                    url: "/yl_welore/pages/author/index?type=1&id=" + t.data.id + "&info_type=" + t.data.info_type
                }), "success" == e.data.status ? t.setData({
                    ad_info: e.data.info,
                    info_zf: e.data.info_zf
                }) : i({
                    content: e.data.msg
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
    rotate3d: function() {
        var t = this, e = wx.createAnimation({
            duration: 300,
            timingFunction: "ease"
        });
        t.animation_zan = e, e.rotate3d(0, 1, 0, 180).step(), this.setData({
            animationData_zan: e.export()
        }), setTimeout(function() {
            e.rotate3d(0, 1, 0, 0).step(), t.setData({
                animationData_zan: e.export()
            });
        }, 100);
    },
    rotate3d_sc: function() {
        var t = this, e = wx.createAnimation({
            duration: 350,
            timingFunction: "linear"
        });
        t.animation_sc = e, e.rotate(360).step(), this.setData({
            animationData_sc: e.export()
        }), setTimeout(function() {
            t.setData({
                animationData_sc: e.export()
            });
        }, 350);
    },
    handleChange: function(t) {
        var e = t.detail;
        this.setData({
            current: e.key
        });
    },
    handleOpen5: function() {
        this.setData({
            del_mod: !0
        });
    },
    handleChange_h: function(t) {
        var e = t.detail;
        this.setData({
            current_h: e.key
        }), "h1" == e.key && (r = "all"), "h2" == e.key && (r = "main"), "h3" == e.key && (r = "my"), 
        this.hui_fu_page(1);
    },
    onLoad: function(t) {
        var e = decodeURIComponent(t.scene);
        if ("undefined" == e) this.setData({
            id: t.id,
            info_type: t.type
        }); else {
            var a = e.split("-");
            this.setData({
                id: a[0],
                info_type: a[1]
            });
        }
        var i = this;
        wx.getSystemInfo({
            success: function(t) {
                i.setData({
                    platform: t.platform
                });
            }
        });
    },
    onShow: function() {
        if (0 != this.data.show) {
            u = 1, r = "all";
            var t = e.getCache("userinfo");
            this.setData({
                uid: t.uid,
                design: e.globalData.design,
                height: e.globalData.height,
                huifu_list: []
            }), this.get_ad(), this.get_liwu_all(), this.get_article_info(), this.get_diy(), 
            i.hide();
        }
    },
    get_diy: function() {
        var t = e.api_root + "User/get_diy", i = this, n = e.getCache("userinfo"), s = new Object();
        s.token = n.token, s.openid = n.openid, s.uid = n.uid, s.much_id = e.siteInfo.uniacid, 
        s.version = e.version, a.POST(t, {
            params: s,
            success: function(t) {
                console.log(t), i.setData({
                    version: t.data.version
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
    handleChange1: function(t) {
        var e = t.detail.value, a = this.data.li_list[this.data.li_index];
        this.setData({
            li_number: e,
            li_sum: (a.tr_conch * e).toFixed(2)
        });
    },
    reward: function() {
        var t = this, n = e.getCache("userinfo"), s = new Object();
        s.token = n.token, s.openid = n.openid, s.num = this.data.li_number, s.uid = n.uid, 
        s.user_id = this.data.info.user_id, s.much_id = e.siteInfo.uniacid, s.li_id = this.data.li_list[this.data.li_index].id;
        var o = e.api_root + "User/user_reward";
        a.POST(o, {
            params: s,
            success: function(e) {
                console.log(e), "success" == e.data.status ? (i({
                    content: e.data.msg
                }), t.get_liwu_all()) : i({
                    content: e.data.msg
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
    liwu_index: function(t) {
        var e = t.currentTarget.dataset.k, a = (t.currentTarget.dataset.id, this.data.li_list[e]);
        this.setData({
            li_index: e,
            li_number: 1,
            li_sum: a.tr_conch
        });
    },
    get_liwu_all: function() {
        var t = this, i = e.getCache("userinfo"), n = new Object();
        n.token = i.token, n.openid = i.openid, n.much_id = e.siteInfo.uniacid, n.uid = i.uid;
        var s = e.api_root + "User/get_liwu";
        a.POST(s, {
            params: n,
            success: function(e) {
                console.log(e), "success" == e.data.status ? t.setData({
                    li_list: e.data.info,
                    user_liwu: e.data.user_info
                }) : t.setData({
                    li_if: !0,
                    li_msg: e.data.msg
                }), setTimeout(function() {
                    t.setData({
                        li_if: !1
                    });
                }, 3e3);
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
    get_huifu_zan: function(t) {
        var n = t.currentTarget.dataset.kkk, s = t.currentTarget.dataset.index, o = this, c = e.getCache("userinfo"), d = new Object();
        d.token = c.token, d.openid = c.openid, d.id = this.data.id, d.uid = c.uid, d.hui_id = n, 
        d.much_id = e.siteInfo.uniacid;
        var u = e.api_root + "User/add_paper_prely";
        a.POST(u, {
            params: d,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    wx.vibrateShort();
                    var e = o.data.huifu_list;
                    e[s].is_huifu_zan = 0 == e[s].is_huifu_zan, e[s].is_huifu_zan_count = 0 == e[s].is_huifu_zan ? e[s].is_huifu_zan_count - 1 : e[s].is_huifu_zan_count + 1, 
                    o.setData({
                        huifu_list: e
                    });
                } else i({
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
    jubao: function(t) {
        var e = t.kkk, a = t.id, i = this, n = wx.createAnimation({
            duration: 150,
            timingFunction: "linear"
        });
        i.animation = n, n.translateY(230).step(), i.setData({
            animationJbData: n.export(),
            jubao: !0,
            kkk: e,
            type_id: a,
            select: !1
        }), setTimeout(function() {
            n.translateY(0).step(), i.setData({
                animationJbData: n.export()
            });
        }, 100);
    },
    no_jubao: function() {
        this.setData({
            jubao: !1,
            select: !0
        });
    },
    get_jubao_text: function(t) {
        var e = t.detail.value;
        this.setData({
            jubao_text: e
        });
    },
    jubao_submit: function(t) {
        var n = this.data.kkk, s = this, t = e.getCache("userinfo"), o = new Object();
        o.token = t.token, o.openid = t.openid, o.id = 0 == this.data.type_id ? this.data.id : this.data.type_id, 
        o.uid = t.uid, o.tale_type = n, o.much_id = e.siteInfo.uniacid, o.content = s.data.jubao_text;
        var c = e.api_root + "User/add_paper_complaint";
        a.POST(c, {
            params: o,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (i({
                    content: t.data.msg
                }), s.setData({
                    jubao: !1
                })) : i({
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
    add_zan: function(t) {
        var n = t.currentTarget.dataset.kkk, s = this, o = e.getCache("userinfo"), c = new Object();
        c.token = o.token, c.openid = o.openid, c.id = this.data.id, c.uid = o.uid, c.much_id = e.siteInfo.uniacid, 
        c.zan_type = 1 == this.data.info_zan ? 1 : 0, c.applaud_type = n;
        var d = e.api_root + "User/add_user_zan";
        a.POST(d, {
            params: c,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (wx.vibrateShort(), s.setData({
                    info_zan: t.data.info_zan,
                    info_zan_count: t.data.info_zan_count
                }), s.rotate3d(), i({
                    content: t.data.msg
                })) : i({
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
    add_sc: function() {
        var t = this, n = e.getCache("userinfo"), s = new Object();
        s.token = n.token, s.openid = n.openid, s.id = this.data.id, s.uid = n.uid, s.much_id = e.siteInfo.uniacid, 
        s.sc_type = 1 == this.data.info_sc ? 1 : 0, wx.vibrateShort(), 0 == t.data.info_sc ? t.setData({
            info_sc: !0
        }) : t.setData({
            info_sc: !1
        }), t.rotate3d_sc();
        var o = e.api_root + "User/add_user_collect";
        a.POST(o, {
            params: s,
            success: function(e) {
                console.log(e), "success" == e.data.status ? t.setData({
                    info_sc_count: e.data.info_sc_count
                }) : i({
                    content: e.data.msg
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
    submit: function() {
        var t = this, a = e.getCache("userinfo");
        if ("tab1" != this.data.current || "" != this.data.text || 0 != this.data.img_arr.length) if ("tab2" != this.data.current || "" != this.data.file) {
            wx.showLoading({
                title: "回复中...",
                mask: !0
            });
            var n = new Object();
            n.token = a.token, n.openid = a.openid, n.id = this.data.id, n.uid = a.uid, n.much_id = e.siteInfo.uniacid, 
            n.reply_type = "tab1" == this.data.current ? 0 : 1, n.text = this.data.text, n.file_ss = this.data.file_ss, 
            n.img_arr = this.data.img_arr, "" != this.data.file ? wx.uploadFile({
                url: e.api_root + "User/img_upload",
                filePath: t.data.file,
                name: "sngpic",
                formData: {
                    token: a.token,
                    openid: a.openid,
                    much_id: e.siteInfo.uniacid
                },
                header: {
                    "Content-Type": "multipart/form-data"
                },
                success: function(e) {
                    var a = JSON.parse(e.data);
                    n.file = a.url, t.post(n);
                },
                fail: function(t) {
                    i({
                        content: "上传错误！",
                        type: "error"
                    });
                }
            }) : (n.file = this.data.file, t.post(n));
        } else i({
            content: "语音内容不能为空"
        }); else i({
            content: "回复内容不能为空"
        });
    },
    post: function(t) {
        var n = e.api_root + "User/add_paper_reply", s = this;
        a.POST(n, {
            params: t,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (i({
                    content: t.data.msg
                }), s.setData({
                    huifu: !1,
                    file: "",
                    img_arr: [],
                    di_msg: !1,
                    select: !0,
                    img_botton: !0
                }), s.get_article_info(1), wx.hideLoading()) : (i({
                    content: t.data.msg
                }), wx.hideLoading());
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
    ting_play: function(t) {
        for (var e = this, a = this.data.huifu_list, i = 0; i < a.length; i++) a[i].is_voice = !1;
        this.setData({
            huifu_list: a
        });
        var n = t.currentTarget.dataset.key;
        s.src = t.currentTarget.dataset.vo, s.play(), a[n].is_voice = !0, this.setData({
            huifu_list: a,
            huifu_list_index: n
        }), s.onEnded(function(t) {
            a[n].is_voice = !1, e.setData({
                huifu_list: a
            });
        });
    },
    ting_stop: function(t) {
        s.stop();
        var e = t.currentTarget.dataset.key, a = this.data.huifu_list;
        a[e].is_voice = !1, this.setData({
            huifu_list: a
        });
    },
    get_article_info: function() {
        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, n = e.api_root + "User/get_article_info", s = this, o = e.getCache("userinfo"), c = new Object();
        c.token = o.token, c.openid = o.openid, c.id = this.data.id, c.uid = o.uid, c.much_id = e.siteInfo.uniacid, 
        a.POST(n, {
            params: c,
            success: function(e) {
                console.log(e), "success" == e.data.status ? (s.setData({
                    info: e.data.info,
                    info_sc: e.data.info.is_info_sc,
                    info_zan: e.data.info.is_info_zan,
                    info_sc_count: e.data.info.info_sc_count,
                    info_zan_count: e.data.info.info_zan_count
                }), 0 == e.data.info.is_open && wx.hideShareMenu(), s.hui_fu_page(t), s.get_liwu_ph()) : (i({
                    content: e.data.msg,
                    duration: 0
                }), setTimeout(function() {
                    i.hide(), "该信息已被删除" == e.data.msg && s._navback();
                }, 1500));
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
    hui_fu_page: function(t) {
        var n = this;
        1 == t && (u = 1, n.setData({
            huifu_list: []
        }));
        var s = e.api_root + "User/get_article_huifu", o = e.getCache("userinfo"), c = new Object();
        c.token = o.token, c.openid = o.openid, c.id = this.data.id, c.uid = o.uid, c.much_id = e.siteInfo.uniacid, 
        c.page = u, c.show_type = r;
        var d = n.data.huifu_list;
        a.POST(s, {
            params: c,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) if (0 == t.data.huifu.length) n.setData({
                    di_msg: !0
                }); else {
                    for (var e = 0; e < t.data.huifu.length; e++) d.push(t.data.huifu[e]);
                    n.setData({
                        huifu_list: d
                    });
                } else i({
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
        var t = this, a = e.getCache("userinfo"), n = e.api_root + "User/img_upload";
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(e) {
                i({
                    content: "上传中...",
                    type: "loading"
                });
                var s = e.tempFilePaths;
                wx.uploadFile({
                    url: n,
                    filePath: s[0],
                    name: "sngpic",
                    formData: {
                        token: a.token,
                        openid: a.openid
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(e) {
                        console.log(e);
                        var a = JSON.parse(e.data);
                        console.log(a), "error" == a.status ? i({
                            content: a.msg
                        }) : (t.setData({
                            img_arr: t.data.img_arr.concat(a.url),
                            img_botton: !1
                        }), i.hide()), console.log(t.data.img_botton);
                    },
                    fail: function(t) {
                        i({
                            content: "上传错误！",
                            type: "error"
                        });
                    }
                });
            }
        });
    },
    del_huifu: function(t) {
        console.log(t);
        var e = t.id;
        this.setData({
            huifu_id: e,
            huifu_key: t.key,
            del_mod: !0
        });
    },
    clearOneImage: function(t) {
        var e = this, a = t.target.dataset.index, i = e.data.img_arr;
        i.splice(a, 1), e.setData({
            img_arr: i
        }), e.setData({
            img_botton: !0
        });
    },
    get_text: function(t) {
        var e = t.detail.value;
        this.setData({
            text: e
        });
    },
    huifu: function(t) {
        var e = this, a = wx.createAnimation({
            duration: 150,
            timingFunction: "linear"
        });
        e.animation = a, a.translateY(400).step(), e.setData({
            animationData: a.export(),
            huifu: !0,
            select: !1,
            current: "tab1"
        }), setTimeout(function() {
            a.translateY(0).step(), e.setData({
                animationData: a.export()
            });
        }, 100);
    },
    no_huifu: function() {
        var t = this, e = wx.createAnimation({
            duration: 5,
            timingFunction: "linear"
        });
        e.translateY(0).step(), t.setData({
            animationData: e.export(),
            huifu: !1,
            select: !0,
            reply_and_hui: !1
        });
    },
    previewImage: function(t) {
        this.setData({
            show: !1
        });
        var e = t.target.dataset.src;
        wx.previewImage({
            current: e,
            urls: this.data.info.image_part
        });
    },
    previewHuiImage: function(t) {
        this.setData({
            show: !1
        });
        var e = t.target.dataset.src, a = t.target.dataset.index;
        wx.previewImage({
            current: e,
            urls: this.data.huifu_list[a].image_part
        });
    },
    previewHuiAndImage: function(t) {
        this.setData({
            show: !1
        });
        var e = t.target.dataset.src;
        wx.previewImage({
            current: e,
            urls: this.data.get_reply_and_info.image_part
        });
    },
    onReachBottom: function() {
        console.log(u), i({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), u += 1, this.hui_fu_page(), i.hide();
    },
    play: function(t) {
        var e = this, a = this.data.info;
        s.src = t.currentTarget.dataset.vo, s.play(), a.is_voice = !0, this.setData({
            info: a
        }), s.onEnded(function(t) {
            a.is_voice = !1, e.setData({
                info: a
            });
        });
    },
    stop: function(t) {
        s.stop();
        t.currentTarget.dataset.key;
        var e = this.data.info;
        e.is_voice = !1, this.setData({
            info: e
        });
    },
    touchStart: function() {
        i({
            duration: 0,
            content: "正在录音",
            image: e.http_root + "/addons/yl_welore/web/static/wechat/yuyin.gif",
            mask: !1
        }), this.start();
    },
    touchEnd: function() {
        i.hide(), this.stop_hf();
    },
    start: function() {
        var t = this;
        t.setData({
            file_ss: 0
        }), n.start(o), n.onStart(function() {
            d = setInterval(function() {
                var e = t.data.file_ss + 1;
                e >= 60 && t.touchEnd(), t.setData({
                    file_ss: e
                });
            }, 1e3);
        }), n.onError(function(t) {
            console.log(t);
        });
    },
    stop_hf: function() {
        var t = this, e = this;
        n.stop(), n.onStop(function(a) {
            t.tempFilePath = a.tempFilePath, e.setData({
                file: a.tempFilePath
            }), clearInterval(d), d = "";
        });
    },
    play_hf: function() {
        s.autoplay = !0, s.src = this.data.file, s.play(), s.onPlay(function() {});
    },
    hideModal: function() {
        this.setData({
            del_mod: !1,
            del_msg: !1,
            tz_del_msg: !1,
            select: !0,
            tz_jin_msg: !1
        });
    },
    is_qq_text: function(t) {
        this.setData({
            is_qq_text: t.detail.value
        });
    },
    del_do: function() {
        var t = this, n = e.api_root + "User/del_article_huifu", s = e.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, o.uid = s.uid, o.much_id = e.siteInfo.uniacid, 
        o.paper_id = this.data.info.id, o.id = this.data.huifu_id, o.is_qq_text = this.data.is_qq_text;
        var c = t.data.huifu_list;
        a.POST(n, {
            params: o,
            success: function(e) {
                "success" == e.data.status ? (c.splice(t.data.huifu_key, 1), t.setData({
                    del_mod: !1,
                    visible1: !1,
                    del_msg: !1,
                    is_qq_text: "",
                    select: !0,
                    huifu_list: c
                }), i({
                    content: e.data.msg
                })) : (t.setData({
                    del_mod: !1
                }), i({
                    content: e.data.msg
                }));
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
    del_tz_do: function() {
        var t = this, n = e.api_root + "User/del_article", s = e.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, o.uid = s.uid, o.much_id = e.siteInfo.uniacid, 
        o.paper_id = this.data.info.id, o.is_qq_text = this.data.is_qq_text, a.POST(n, {
            params: o,
            success: function(e) {
                console.log(e), "success" == e.data.status ? (t.setData({
                    del_mod: !1,
                    visible1: !1,
                    tz_del_msg: !1,
                    is_qq_text: ""
                }), i({
                    content: e.data.msg,
                    duration: 0
                }), setTimeout(function() {
                    i.hide(), t._navback();
                }, 1500)) : (t.setData({
                    del_mod: !1
                }), i({
                    content: e.data.msg
                }));
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
    onShareAppMessage: function() {
        var t = e.globalData.forward;
        return console.log("/yl_welore/pages/packageA/article/index?id=" + this.data.id + "&type=" + this.data.info_type), 
        t ? {
            title: t.title,
            path: "/yl_welore/pages/packageA/article/index?id=" + this.data.id + "&type=" + this.data.info_type,
            imageUrl: t.reis_img,
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
            title: this.data.info.study_title,
            path: "/yl_welore/pages/packageA/article/index?id=" + this.data.id + "&type=" + this.data.info_type,
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
    },
    _navback: function() {
        var t = getCurrentPages(), e = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (e.setData({
            show: !1
        }), wx.navigateBack()) : this._backhome();
    },
    _backhome: function() {
        wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    }
});