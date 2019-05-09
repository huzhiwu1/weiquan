var t = getApp(), e = require("../../../../10E9B8307EC361BF768FD0371DAD8A51.js"), a = require("../../../../5A7158247EC361BF3C1730235F9D8A51.js").$Toast, i = !1, s = 0, o = 0;

wx.getSystemInfo({
    success: function(t) {
        s = t.windowWidth, o = t.windowHeight;
    }
}), Page({
    startX: 0,
    startY: 0,
    context: null,
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
            color: "#2ae0c8 "
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
            title_arbor: t.globalData.copyright.title_arbor,
            nvabarData: {
                showCapsule: !0,
                height: 2 * t.globalData.height + 20
            },
            title: "发布到" + e.name
        }), 0 == e.fa_class && this.setData({
            check_fa_class: !0
        }), this.cleardraw(), this.get_user_info(), this.get_user_vip(), this.get_left_needle(), 
        this.get_right_item(), this.get_diy();
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
    get_user_info: function() {
        var i = t.api_root + "User/get_user_info", s = this, o = t.getCache("userinfo"), n = new Object();
        n.token = o.token, n.openid = o.openid, e.POST(i, {
            params: n,
            success: function(t) {
                console.log(t), "success" == t.data.status ? s.setData({
                    user_info: t.data.info
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
    get_diy: function() {
        var a = t.api_root + "User/get_diy", i = this, s = t.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, o.uid = s.uid, o.much_id = t.siteInfo.uniacid, 
        o.version = t.version, e.POST(a, {
            params: o,
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
    onChange_red_paper: function(t) {
        var e = t.detail;
        this.setData({
            red_paper: e.value,
            is_submit: e.value
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
            var i = /^(\.*)(\d+)(\.?)(\d{0,2}).*$/g;
            e = i.test(e) ? e.replace(i, "$2$3$4") : "0.00", this.setData({
                zong_red_money: parseFloat(e).toFixed(2),
                xian_red_money: e
            });
            var s = this.data.zong_red_count;
            if ("" != s) {
                if (e / s < .01) return a({
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
                if (this.data.xian_red_money / e < .01) return a({
                    content: "单个红包不可低于0.01"
                }), void this.setData({
                    is_submit: !0
                });
                this.setData({
                    is_submit: !1
                });
            }
        } else {
            var i = (this.data.xian_red_money * e).toFixed(2);
            this.setData({
                zong_red_money: i
            });
        } else this.setData({
            zong_red_count: 1
        });
    },
    select_qq_id: function(t) {
        console.log(t), this.setData({
            title: "发布到" + t.currentTarget.dataset.name,
            showLeft: !this.data.showLeft,
            fa_class: t.currentTarget.dataset.id,
            get_hidden: !this.data.get_hidden
        });
    },
    toggleLeft: function() {
        this.setData({
            showLeft: !this.data.showLeft,
            get_hidden: !this.data.get_hidden
        });
    },
    lower: function() {
        this.setData({
            page: this.data.page + 1
        }), this.data.curNav > 0 && this.get_right_item();
    },
    get_left_needle: function() {
        var i = this, s = t.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, o.much_id = t.siteInfo.uniacid;
        var n = t.api_root + "User/get_left_needle";
        e.POST(n, {
            params: o,
            success: function(t) {
                "success" == t.data.status ? i.setData({
                    navLeftItems: t.data.info
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
    get_right_item: function() {
        var i = this, s = t.getCache("userinfo"), o = new Object();
        o.token = s.token, o.openid = s.openid, o.uid = s.uid, o.much_id = t.siteInfo.uniacid, 
        o.get_id = i.data.curNav, o.page = i.data.page;
        var n = t.api_root + "User/get_right_needle", c = i.data.navRightItems;
        e.POST(n, {
            params: o,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    for (var e = 0; e < t.data.info.length; e++) c.push(t.data.info[e]);
                    i.setData({
                        navRightItems: c
                    });
                } else a({
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
    color_ssss: function(t) {
        this.setData({
            cccc: t.currentTarget.dataset.color
        });
    },
    canvasIdErrorCallback: function(t) {},
    canvasStart: function(t) {
        this.startX = t.changedTouches[0].x, this.startY = t.changedTouches[0].y, this.context.setStrokeStyle(this.data.cccc), 
        this.context.setLineWidth(7), this.context.setLineCap("round"), this.context.beginPath();
    },
    canvasMove: function(t) {
        var e = t.changedTouches[0].x, a = t.changedTouches[0].y;
        this.context.moveTo(this.startX, this.startY), this.context.lineTo(e, a), this.context.stroke(), 
        this.startX = e, this.startY = a, wx.drawCanvas({
            canvasId: "canvas",
            reserve: !0,
            actions: this.context.getActions()
        });
    },
    canvasEnd: function(t) {
        i = !1;
    },
    cleardraw: function() {
        this.startX = 0, this.startY = 0, this.context = wx.createCanvasContext("canvas"), 
        this.context.clearRect(0, 0, s, o), this.context.draw();
    },
    get_user_vip: function() {
        var a = this, i = t.getCache("userinfo"), s = new Object();
        s.token = i.token, s.openid = i.openid, s.much_id = t.siteInfo.uniacid, s.uid = i.uid;
        var o = t.api_root + "User/check_user_vip";
        e.POST(o, {
            params: s,
            success: function(t) {
                a.setData({
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
        if (0 == this.data.fa_class) return a({
            content: "请选择发布的" + this.data.design.landgrave
        }), void this.setData({
            showLeft: !0,
            get_hidden: !1
        });
        var e = t.getCache("userinfo"), i = t.api_root + "User/img_upload", s = this;
        if (console.log(parseFloat(this.data.zong_red_money)), console.log(parseFloat(this.data.user_info.fraction)), 
        !(parseFloat(this.data.zong_red_money) > parseFloat(this.data.user_info.fraction))) return 0 == this.startX ? (wx.showModal({
            title: "提示",
            content: "画布内容不能为空！",
            showCancel: !1
        }), !1) : "" == s.data.title_value && 1 == this.data.title_arbor ? (a({
            content: "标题不能为空"
        }), void s.setData({
            is_submit: !1
        })) : void wx.canvasToTempFilePath({
            canvasId: "canvas",
            success: function(o) {
                wx.uploadFile({
                    url: i,
                    filePath: o.tempFilePath,
                    name: "sngpic",
                    formData: {
                        token: e.token,
                        openid: e.openid,
                        much_id: t.siteInfo.uniacid
                    },
                    header: {
                        "Content-Type": "multipart/form-data"
                    },
                    success: function(i) {
                        console.log(i);
                        var o = JSON.parse(i.data);
                        if (console.log(o), "error" == o.status) a({
                            content: o.msg
                        }); else {
                            s.setData({
                                img_arr: s.data.img_arr.concat(o.url)
                            }), a({
                                content: "正在发布....",
                                icon: "prompt",
                                duration: 0,
                                mask: !1
                            }), s.setData({
                                is_submit: !0
                            });
                            var n = new Object();
                            if (2 != s.data.fa_type && "" == s.data.text && 0 == s.startX) return a({
                                content: "内容不能为空"
                            }), void s.setData({
                                is_submit: !1
                            });
                            n.title = s.data.title_value, n.color = s.data.title_color, n.content = s.data.text, 
                            n.img_arr = s.data.img_arr, n.uid = e.uid, n.token = e.token, n.openid = e.openid, 
                            n.is_open = 0 == s.data.is_open ? 1 : 0, n.type = s.data.fa_type, n.fa_class = s.data.fa_class, 
                            n.mch_id = t.siteInfo.uniacid, n.file_ss = s.data.file_ss, n.user_file = "", n.position_name = s.data.position_name, 
                            n.position = s.data.position, n.address_latitude = s.data.address_latitude, n.address_longitude = s.data.address_longitude, 
                            s.data.red_paper && (n.red_paper = 1 == s.data.red_paper ? 1 : 0, n.red_type = s.data.red_type, 
                            n.zong_red_count = s.data.zong_red_count, n.zong_red_money = s.data.zong_red_money), 
                            s.add_submit(n), a.hide();
                        }
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
        a({
            content: "所需余额不足"
        });
    },
    add_submit: function(i) {
        var s = this, o = t.api_root + "User/add_circle";
        e.POST(o, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? wx.navigateBack() : (s.setData({
                    is_submit: !1
                }), a({
                    content: t.data.msg,
                    duration: 0
                })), setTimeout(function() {
                    a.hide();
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
    get_text_len: function(t) {
        var e = t.detail.value;
        this.setData({
            text: e
        });
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