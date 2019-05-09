var t = getApp(), e = wx.getRecorderManager(), a = wx.createInnerAudioContext(), i = (require("../../../util/wxParse/wxParse.js"), 
require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js")), o = {
    duration: 6e4,
    sampleRate: 16e3,
    numberOfChannels: 1,
    encodeBitRate: 96e3,
    format: "mp3",
    frameSize: 50
}, s = "", n = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast;

Page({
    data: {
        address_latitude: "",
        address_longitude: "",
        is_position: !1,
        position: "",
        position_name: "",
        is_open: !1,
        fa_type: 0,
        is_submit: !1,
        visible2: !1,
        text_color: !1,
        get_hidden: !0,
        actions4: [ {
            color: "#2ae0c8"
        }, {
            color: "#a2e1d4"
        }, {
            color: "#acf6ef"
        }, {
            color: "#cbf5fb"
        }, {
            color: "#bdf3d4"
        }, {
            color: "#e6e2c3"
        }, {
            color: "#e3c887"
        }, {
            color: "#fad8be"
        }, {
            color: "#fbb8ac"
        }, {
            color: "#fe6673"
        }, {
            color: "#D24D57"
        }, {
            color: "#EB7347"
        }, {
            color: "#FC9D99"
        }, {
            color: "#26A65B"
        }, {
            color: "#AEDD81"
        }, {
            color: "#84AF9B"
        }, {
            color: "#00CCFF"
        }, {
            color: "#D0D0D0"
        }, {
            color: "#2C3E50"
        }, {
            color: "#000000"
        } ],
        isIpx: t.globalData.isIpx,
        nvabarData: {},
        file: "",
        file_ss: 0,
        scope_record: !0,
        text: "",
        is_title: !1,
        title_value: "",
        title_color: "#000000",
        img_arr: [],
        img_length: 9,
        img_botton: !0,
        is_vip: 0,
        check_fa_class: !1,
        showLeft: !1,
        navLeftItems: [],
        navRightItems: [],
        curNav: -1,
        di_msg: !0,
        page: 1,
        red_type: 1,
        zong_red_money: "0.00",
        xian_red_money: "",
        zong_red_count: "",
        version: 1,
        title_arbor: 1
    },
    onLoad: function(e) {
        this.setData({
            copyright: t.globalData.copyright,
            design: t.globalData.design,
            height: t.globalData.height,
            fa_type: e.type,
            fa_class: e.fa_class,
            title: "发布到" + e.name,
            title_arbor: t.globalData.copyright.title_arbor,
            nvabarData: {
                showCapsule: !0,
                height: 2 * t.globalData.height + 20
            }
        }), this.get_user_info(), 2 == e.type && this.setData({
            is_title: !0
        }), 0 == e.fa_class && this.setData({
            check_fa_class: !0
        }), this.get_user_vip(), this.get_left_needle(), this.get_right_item(), this.get_diy();
    },
    onChangePosition: function(t) {
        var e = this, a = t.detail;
        this.setData({
            is_position: a.value
        }), 1 == a.value && wx.chooseLocation({
            success: function(t) {
                console.log(t), e.setData({
                    position: t.address,
                    position_name: t.name,
                    address_latitude: t.latitude,
                    address_longitude: t.longitude,
                    ppooss: t.name + "-" + t.address
                });
            },
            fail: function(t) {
                console.log(t), "chooseLocation:fail cancel" != t.errMsg ? e.setData({
                    visible_pos: !0,
                    is_position: !1
                }) : e.setData({
                    is_position: !1
                });
            }
        });
    },
    get_diy: function() {
        var e = t.api_root + "User/get_diy", a = this, o = t.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, s.uid = o.uid, s.much_id = t.siteInfo.uniacid, 
        s.version = t.version, i.POST(e, {
            params: s,
            success: function(t) {
                console.log(t), a.setData({
                    version: t.data.version,
                    open_file: t.data.open_file
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
    set_red_type: function() {
        this.setData({
            red_type: 1 == this.data.red_type ? 0 : 1,
            zong_red_money: "0.00",
            xian_red_money: ""
        });
    },
    get_red_money_d: function(t) {
        var e = t.detail.detail.value;
        if ("" != e) {
            var a = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g, i = ((e = a.test(e) ? e.replace(a, "$2$3$4") : "0.00") * this.data.zong_red_count).toFixed(2);
            this.setData({
                xian_red_money: e,
                zong_red_money: i
            });
        }
    },
    get_red_money: function(t) {
        var e = t.detail.detail.value;
        if ("" != e) {
            var a = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;
            e = a.test(e) ? e.replace(a, "$2$3$4") : "0.00", this.setData({
                zong_red_money: parseFloat(e).toFixed(2),
                xian_red_money: e
            });
            var i = this.data.zong_red_count;
            if ("" != i) {
                if (e / i < .01) return n({
                    content: "单个红包不可低于0.01"
                }), void this.setData({
                    is_submit: !0
                });
                this.setData({
                    is_submit: !1
                });
            }
        }
    },
    get_red_count: function(t) {
        var e = t.detail.detail.value;
        if ("" != e) if (0 != e) if (/^[0-9]*$/g.test(e) || (e = "1"), this.setData({
            zong_red_count: e
        }), 1 == this.data.red_type) {
            if ("" != this.data.xian_red_money) {
                if (this.data.xian_red_money / e < .01) return n({
                    content: "单个红包不可低于0.01"
                }), void this.setData({
                    is_submit: !0
                });
                this.setData({
                    is_submit: !1
                });
            }
        } else {
            var a = (this.data.xian_red_money * e).toFixed(2);
            this.setData({
                zong_red_money: a,
                is_submit: !1
            });
        } else this.setData({
            zong_red_count: 1
        });
    },
    select_qq_id: function(t) {
        this.setData({
            title: "发布到" + t.currentTarget.dataset.name,
            showLeft: !this.data.showLeft,
            fa_class: t.currentTarget.dataset.id,
            get_hidden: !this.data.get_hidden
        });
    },
    toggleLeft: function() {
        this.setData({
            showLeft: !this.data.showLeft,
            get_hidden: 1 != this.data.get_hidden
        });
    },
    lower: function() {
        this.setData({
            page: this.data.page + 1
        }), this.data.curNav > 0 && this.get_right_item();
    },
    get_left_needle: function() {
        var e = this, a = t.getCache("userinfo"), o = new Object();
        o.token = a.token, o.openid = a.openid, o.much_id = t.siteInfo.uniacid;
        var s = t.api_root + "User/get_left_needle";
        i.POST(s, {
            params: o,
            success: function(t) {
                "success" == t.data.status ? e.setData({
                    navLeftItems: t.data.info
                }) : n({
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
    get_right_item: function() {
        var e = this, a = t.getCache("userinfo"), o = new Object();
        o.token = a.token, o.openid = a.openid, o.uid = a.uid, o.much_id = t.siteInfo.uniacid, 
        o.get_id = e.data.curNav, o.page = e.data.page;
        var s = t.api_root + "User/get_right_needle", r = e.data.navRightItems;
        i.POST(s, {
            params: o,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var a = 0; a < t.data.info.length; a++) r.push(t.data.info[a]);
                    e.setData({
                        navRightItems: r
                    });
                } else n({
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
        var e = t.api_root + "User/get_user_info", a = this, o = t.getCache("userinfo"), s = new Object();
        s.token = o.token, s.openid = o.openid, i.POST(e, {
            params: s,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    user_info: t.data.info
                }) : n({
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
    get_user_vip: function() {
        var e = this, a = t.getCache("userinfo"), o = new Object();
        o.token = a.token, o.openid = a.openid, o.much_id = t.siteInfo.uniacid, o.uid = a.uid;
        var s = t.api_root + "User/check_user_vip";
        i.POST(s, {
            params: o,
            success: function(t) {
                e.setData({
                    is_vip: t.data
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
        if (0 == this.data.fa_class) return n({
            content: "请选择发布的" + this.data.design.landgrave
        }), void this.setData({
            showLeft: !0,
            get_hidden: !1
        });
        if (console.log(this.data.zong_red_money), console.log(this.data.user_info.fraction), 
        parseFloat(this.data.zong_red_money) > parseFloat(this.data.user_info.fraction)) n({
            content: "所需余额不足"
        }); else {
            wx.showLoading({
                title: "正在发布...",
                mask: !0
            });
            var e = this;
            e.setData({
                is_submit: !0
            });
            var a = t.getCache("userinfo"), i = new Object();
            if ("" == this.data.title_value && 1 == this.data.title_arbor) return n({
                content: "标题不能为空"
            }), e.setData({
                is_submit: !1
            }), void wx.hideLoading();
            if (2 != this.data.fa_type && "" == this.data.text && 0 == this.data.img_arr.length) return n({
                content: "内容不能为空"
            }), wx.hideLoading(), void e.setData({
                is_submit: !1
            });
            if (i.title = this.data.title_value, i.color = this.data.title_color, i.content = this.data.text, 
            i.img_arr = this.data.img_arr, i.uid = a.uid, i.token = a.token, i.openid = a.openid, 
            i.is_open = 0 == this.data.is_open ? 1 : 0, i.type = this.data.fa_type, i.fa_class = this.data.fa_class, 
            i.mch_id = t.siteInfo.uniacid, i.file_ss = this.data.file_ss, i.version = t.version, 
            i.position_name = this.data.position_name, i.position = this.data.position, i.address_latitude = this.data.address_latitude, 
            i.address_longitude = this.data.address_longitude, this.data.red_paper && (i.red_paper = 1 == this.data.red_paper ? 1 : 0, 
            i.red_type = this.data.red_type, i.zong_red_count = this.data.zong_red_count, i.zong_red_money = this.data.zong_red_money), 
            console.log(i), 2 == this.data.fa_type && "" == this.data.file) return n({
                content: "请添加视频"
            }), wx.hideLoading(), void e.setData({
                is_submit: !1
            });
            1 == this.data.fa_type || 2 == this.data.fa_type ? wx.uploadFile({
                url: t.api_root + "User/img_upload",
                filePath: e.data.file,
                name: "sngpic",
                formData: {
                    token: a.token,
                    openid: a.openid,
                    much_id: t.siteInfo.uniacid
                },
                header: {
                    "Content-Type": "multipart/form-data"
                },
                success: function(t) {
                    var a = JSON.parse(t.data);
                    console.log(a), i.user_file = a.url, e.add_submit(i);
                },
                fail: function(t) {
                    n({
                        content: "上传错误！",
                        type: "error"
                    }), wx.hideLoading(), e.setData({
                        is_submit: !1
                    });
                }
            }) : (i.user_file = "", e.add_submit(i), n.hide(), wx.hideLoading());
        }
    },
    add_submit: function(e) {
        var a = this, o = t.api_root + "User/add_circle";
        i.POST(o, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? (n({
                    content: t.data.msg,
                    duration: 2e3
                }), setTimeout(function() {
                    wx.reLaunch({
                        url: "/yl_welore/pages/index/index"
                    });
                }, 2e3)) : (a.setData({
                    is_submit: !1
                }), n({
                    content: t.data.msg,
                    duration: 0
                })), setTimeout(function() {
                    n.hide();
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
    onChange: function(t) {
        var e = t.detail;
        this.setData({
            is_open: e.value
        });
    },
    onChange_red_paper: function(t) {
        var e = t.detail;
        this.setData({
            red_paper: e.value,
            is_submit: e.value
        });
    },
    hideModal: function() {
        this.setData({
            text_color: !1,
            get_hidden: !0
        });
    },
    color_select: function() {
        this.setData({
            text_color: !0,
            get_hidden: !1
        });
    },
    handleClick4: function(t) {
        console.log(t);
        var e = t.currentTarget.dataset.index;
        this.setData({
            text_color: !1,
            get_hidden: !0,
            title_color: this.data.actions4[e].color
        });
    },
    set_title_value: function(t) {
        var e = t.detail.value;
        this.setData({
            title_value: e
        });
    },
    set_title: function() {
        this.data.is_title ? this.setData({
            is_title: !1
        }) : this.setData({
            is_title: !0
        });
    },
    add_video: function() {
        var t = this;
        wx.chooseVideo({
            sourceType: [ "album", "camera" ],
            maxDuration: t.data.copyright.video_setting,
            compressed: !0,
            success: function(e) {
                console.log(e), wx.hideLoading(), t.data.copyright.video_setting < e.duration ? n({
                    content: "视频最长为" + t.data.copyright.video_setting + "秒！请重新上传"
                }) : t.setData({
                    file: e.tempFilePath
                });
            }
        });
    },
    start: function() {
        var t = this;
        t.setData({
            file_ss: 0
        }), e.start(o), e.onStart(function() {
            s = setInterval(function() {
                var e = t.data.file_ss + 1;
                e >= 60 && t.touchEnd(), t.setData({
                    file_ss: e
                });
            }, 1e3);
        }), e.onError(function(t) {
            console.log(t);
        });
    },
    get_text_len: function(t) {
        var e = t.detail.value;
        this.setData({
            text: e
        });
    },
    stop: function() {
        var t = this, a = this;
        e.stop(), e.onStop(function(e) {
            t.tempFilePath = e.tempFilePath, console.log("停止录音", e.tempFilePath), a.setData({
                file: e.tempFilePath
            }), clearInterval(s), s = "";
        });
    },
    play: function() {
        a.autoplay = !0, a.src = this.data.file, a.play(), a.onPlay(function() {
            console.log("开始播放");
        }), a.onError(function(t) {
            console.log(t.errMsg), console.log(t.errCode);
        });
    },
    handleClose: function() {
        this.setData({
            visible2: !1,
            visible_pos: !1
        });
    },
    handleOk: function() {
        wx.openSetting(), this.setData({
            visible2: !1,
            visible_pos: !1
        });
    },
    touchStart: function() {
        var t = this;
        if (wx.getSetting({
            success: function(e) {
                0 == e.authSetting["scope.record"] ? wx.authorize({
                    scope: "scope.record",
                    fail: function() {
                        t.setData({
                            visible2: !0,
                            scope_record: !1
                        });
                    }
                }) : t.setData({
                    scope_record: !0
                });
            }
        }), 0 == t.data.scope_record) return !1;
        n({
            duration: 0,
            content: "正在录音",
            image: "https://wq.inotnpc.com/addons/yl_welore/web/static/wechat/yuyin.gif",
            mask: !1
        }), this.start();
    },
    touchEnd: function() {
        n.hide(), this.stop();
    },
    chooseImage: function() {
        var e = this, a = t.getCache("userinfo"), i = t.api_root + "User/img_upload";
        wx.chooseImage({
            count: e.data.img_length,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(o) {
                n({
                    content: "上传中...",
                    type: "loading"
                });
                var s = o.tempFilePaths;
                e.setData({
                    img_length: e.data.img_length - s.length
                }), e.data.img_length <= 0 && e.setData({
                    img_botton: !1
                });
                for (var r = 0, c = s.length; r < c; r++) wx.uploadFile({
                    url: i,
                    filePath: s[r],
                    name: "sngpic",
                    formData: {
                        token: a.token,
                        openid: a.openid,
                        much_id: t.siteInfo.uniacid
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(t) {
                        console.log(t);
                        var a = JSON.parse(t.data);
                        console.log(a), "error" == a.status ? n({
                            content: a.msg
                        }) : (e.setData({
                            img_arr: e.data.img_arr.concat(a.url)
                        }), n.hide());
                    },
                    fail: function(t) {
                        n({
                            content: "上传错误！",
                            type: "error"
                        });
                    }
                });
            }
        });
    },
    previewOneImage: function() {
        var e = this, a = t.getCache("userinfo"), i = t.api_root + "User/img_upload";
        wx.chooseImage({
            count: 1,
            sizeType: [ "original", "compressed" ],
            sourceType: [ "album", "camera" ],
            success: function(o) {
                wx.showLoading({
                    title: "上传中...",
                    mask: !0
                });
                var s = o.tempFilePaths;
                wx.uploadFile({
                    url: i,
                    filePath: s[0],
                    name: "sngpic",
                    formData: {
                        token: a.token,
                        openid: a.openid,
                        much_id: t.siteInfo.uniacid
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(t) {
                        console.log(t);
                        var a = JSON.parse(t.data);
                        console.log(a), "error" == a.status ? n({
                            content: a.msg
                        }) : (e.setData({
                            img_arr: e.data.img_arr.concat(a.url),
                            img_botton: !1
                        }), wx.hideLoading()), console.log(e.data.img_botton);
                    },
                    fail: function(t) {
                        n({
                            content: "上传错误！",
                            type: "error"
                        });
                    }
                });
            }
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
    clearImage: function(t) {
        var e = this, a = t.target.dataset.index, i = e.data.img_arr;
        i.splice(a, 1), e.setData({
            img_arr: i,
            img_length: e.data.img_length + 1
        }), e.data.img_length > 0 && e.setData({
            img_botton: !0
        });
    },
    previewImage: function(t) {
        console.log(t);
        for (var e = this.data.img_arr, a = [], i = 0; i < e.length; i++) a.push(e[i]);
        wx.previewImage({
            current: t.target.dataset.src,
            urls: a
        });
    },
    onShareAppMessage: function() {
        var e = t.globalData.forward;
        return console.log(e), e ? {
            title: e.title,
            path: "/yl_welore/pages/index/index",
            imageUrl: e.reis_img,
            success: function(t) {
                n({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                n({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/index/index",
            success: function(t) {
                n({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                n({
                    content: "转发失败"
                });
            }
        };
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