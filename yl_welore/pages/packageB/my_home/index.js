var app = getApp(), http = require("../../../util/http.js"), _require = require("../../../dist/base/index"), $Toast = _require.$Toast;

Page({
    data: {
        show: !0,
        sex: 1,
        user_info: {},
        current: "tab1",
        index_page: 1,
        pay_index: 1,
        data_list: [],
        new_list: [],
        page: 1,
        pay_di: !1,
        my_di: !1,
        del_mod: !1,
        liwu: !1,
        animationDataLi: {},
        li_number: 1,
        li_list: [],
        home_pl_check: !1,
        pl_id: 0,
        home_pl_text: "",
        otherShop:false,
    },
    onLoad: function(t) {
        let access_token =  getApp().const.ACCESS_TOKEN;
        this.setData({
            height: app.globalData.height,
            isIpx: app.globalData.isIpx,
            id: t.id,
            design: app.globalData.design,
            access_token : access_token
        }), this.get_user_info(), this.get_liwu_all(), this.get_my_list();
        this.get_other_shop();
    },
    onShow: function() {
        var t = app.getCache("userinfo");
        this.setData({
            uid: t.uid
        }), this.get_user_info();
    },
    home_pl: function(t) {
        console.log(t), this.setData({
            home_pl_check: !0,
            pl_id: t.currentTarget.dataset.id,
            pl_key: t.currentTarget.dataset.key,
            pl_wey: t.currentTarget.dataset.wey
        });
    },
    home_pl_cai: function(t) {
        this.setData({
            home_pl_text: t.detail.value
        });
    },
    do_user_pl: function() {
        if ("" != this.data.home_pl_text) {
            wx.showLoading({
                title: "评论中...",
                mask: !0
            });
            var e = this, t = app.getCache("userinfo"), a = new Object();
            a.token = t.token, a.openid = t.openid, a.much_id = app.siteInfo.uniacid, a.uid = t.uid, 
            a.text = this.data.home_pl_text, a.id = this.data.pl_id, a.reply_type = 0;
            var i = app.api_root + "User/add_paper_reply";
            http.POST(i, {
                params: a,
                success: function(t) {
                    if (console.log(t), "success" == t.data.status) {
                        $Toast({
                            content: t.data.msg
                        }), e.hideModal();
                        var a = e.data.new_list;
                        console.log(a), a[e.data.pl_wey].list[e.data.pl_key].study_repount = parseInt(a[e.data.pl_wey].list[e.data.pl_key].study_repount) + 1, 
                        e.setData({
                            new_list: a
                        }), wx.hideLoading();
                    } else $Toast({
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
        } else $Toast({
            content: "内容不能为空！"
        });
    },
    preventTouchMove: function() {},
    get_liwu_all: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.much_id = app.siteInfo.uniacid, e.uid = t.uid;
        var i = app.api_root + "User/get_liwu";
        http.POST(i, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    li_list: t.data.info,
                    user_liwu: t.data.user_info
                }) : a.setData({
                    li_if: !0,
                    li_msg: t.data.msg
                }), setTimeout(function() {
                    a.setData({
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
    get_liwu: function() {
        this.setData({
            liwu: !0
        });
    },
    liwu_index: function(t) {
        var a = t.currentTarget.dataset.k, e = (t.currentTarget.dataset.id, this.data.li_list[a]);
        this.setData({
            li_index: a,
            li_number: 1,
            li_sum: e.tr_conch
        });
    },
    colse_li: function() {
        this.setData({
            liwu: !1
        });
    },
    reward: function() {
        var a = this, t = app.getCache("userinfo"), e = new Object();
        e.token = t.token, e.openid = t.openid, e.num = this.data.li_number, e.uid = t.uid, 
        e.user_id = this.data.id, e.much_id = app.siteInfo.uniacid, e.li_id = this.data.li_list[this.data.li_index].id;
        var i = app.api_root + "User/user_reward";
        http.POST(i, {
            params: e,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.get_user_info(), a.get_liwu_all()) : $Toast({
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
    handleChange1: function(t) {
        var a = t.detail.value, e = this.data.li_list[this.data.li_index];
        this.setData({
            li_number: a,
            li_sum: (e.tr_conch * a).toFixed(2)
        });
    },
    handleChange: function(t) {
        var a = t.detail;
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), this.setData({
            data_list: [],
            new_list: [],
            page: 1,
            index_page: 1,
            pay_di: !1,
            my_di: !1
        }), "tab1" == a.key && this.get_my_list(), "tab2" == a.key && this.get_my_pay(), 
        this.setData({
            current: a.key
        });
    },
    cancel: function() {
        var t = app.api_root + "User/get_user_cancel", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.much_id = app.siteInfo.uniacid, i.uid = this.data.id, 
        i.this_uid = e.uid, i.is_user = this.data.user_info.is_user, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? ($Toast({
                    content: t.data.msg
                }), a.get_user_info()) : $Toast({
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
    guard: function() {
        wx.navigateTo({
            url: "/yl_welore/pages/packageB/user_guard/index?id=" + this.data.id
        });
    },
    get_user_info: function() {
        var t = app.api_root + "User/get_user_info_my", a = this, e = app.getCache("userinfo"), i = new Object();
        i.token = e.token, i.openid = e.openid, i.uid = this.data.id, i.much_id = app.siteInfo.uniacid, 
        i.this_uid = e.uid, http.POST(t, {
            params: i,
            success: function(t) {
                console.log(t), "success" == t.data.status ? a.setData({
                    user_info: t.data.info,
                    sex: t.data.info.gender
                }) : $Toast({
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
    get_my_list: function() {
        var t = app.api_root + "User/get_my_list", e = this, a = app.getCache("userinfo"), i = new Object();
        i.token = a.token, i.openid = a.openid, i.uid = a.uid, i.much_id = app.siteInfo.uniacid, 
        i.id = this.data.id, i.type = this.data.current, i.index_page = this.data.index_page;
        var s = this.data.new_list;
        http.POST(t, {
            params: i,
            success: function(t) {
                if (console.log(t), "success" == t.data.status) {
                    0 == t.data.info.length && e.setData({
                        my_di: !0
                    });
                    for (var a = 0; a < t.data.info.length; a++) s.push(t.data.info[a]);
                    e.setData({
                        new_list: s
                    }), $Toast.hide();
                } else $Toast({
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
    del_mod: function(t) {
        var a = t.currentTarget.dataset.id;
        this.setData({
            paper_id: a,
            del_mod: !0
        });
    },
    hideModal: function() {
        this.setData({
            del_mod: !1,
            home_pl_check: !1
        });
    },
    onReachBottom: function() {
        $Toast({
            duration: 0,
            content: "加载中",
            type: "loading",
            mask: !1
        }), "tab1" == this.data.current && (this.setData({
            index_page: this.data.index_page + 1
        }), this.get_my_list()), "tab2" == this.data.current && (this.setData({
            page: this.data.page + 1
        }), this.get_my_pay()), $Toast.hide();
    },
    _navback: function() {
        var t = getCurrentPages(), a = (t[t.length - 1], t[t.length - 2]);
        1 != t.length ? (a.setData({
            show: !1
        }), wx.navigateBack()) : this._backhome();
    },
    _backhome: function() {
        wx.reLaunch({
            url: "/yl_welore/pages/index/index"
        });
    },
    onShareAppMessage: function() {
        var t = app.globalData.forward;
        return this.setData({
            show: !1
        }), t ? {
            title: t.title,
            path: "/yl_welore/pages/packageB/my_home/index?id=" + this.data.id,
            imageUrl: t.reis_img,
            success: function(t) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                $Toast({
                    content: "转发失败"
                });
            }
        } : {
            title: "您的好友给您发了一条信息",
            path: "/yl_welore/pages/packageB/my_home/index?id=" + this.data.id,
            success: function(t) {
                $Toast({
                    content: "转发成功"
                });
            },
            fail: function(t) {
                $Toast({
                    content: "转发失败"
                });
            }
        };
    },
    // 这是我用来获取用户入驻商户店铺数据
    get_other_shop(){
        let url = "https://gzzt.zt-gz.cn/web/index.php?r=api%2Fmch%2Findex/qz-user-mch&access_token=XXEoPoK-DgEO_zgIG1ZrKQBW09R6h1jM&openId=ogGzc4rRn90UHPJKL6Xotk1rYrGg";
        let access_token = this.data.access_token;
        let openId = this.data.id;
        let data ={
            
                r: "api/mch/index/qz-user-mch",
                access_token:access_token,
                openId:openId
          
        }
        let that = this;
        getApp().request({
            
            url:url,
            data:data,
            method:"POST",
            success:function(e){
                console.log(e.data);
                let mch_id = parseInt(e.data.id);
                if(e.code==0){
                    // code==0在商户的动态页面的右下角出现一个
                    // 按钮，跳转到该用户的商城
                    that.setData({
                        otherShop:true,
                        mch_id:mch_id
                    })
                }
                
            }
        })
    },
    // 這個是點擊商戶的店鋪按鈕后，要跳轉到商戶的商鋪頁面
    goShop(){
        let that = this;
        wx.navigateTo({
            url:"/mch/shop/shop?mch_id="+that.data.mch_id,
            
        })
    }
});