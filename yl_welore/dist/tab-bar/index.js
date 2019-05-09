var e = getApp(), t = require("../../../10E9B8307EC361BF768FD0371DAD8A51.js");

Component({
    externalClasses: [ "i-class" ],
    relations: {
        "../tab-bar-item/index": {
            type: "child",
            linked: function() {
                this.changeCurrent();
            },
            linkChanged: function() {
                this.changeCurrent();
            },
            unlinked: function() {
                this.changeCurrent();
            }
        }
    },
    properties: {
        current: {
            type: String,
            value: "",
            observer: "changeCurrent"
        },
        color: {
            type: String,
            value: ""
        },
        fixed: {
            type: Boolean,
            value: !1
        },
        background: {
            type: String,
            value: ""
        },
        height: {
            type: String,
            value: ""
        }
    },
    data: {
        list: []
    },
    methods: {
        changeCurrent: function() {
            var e = this, t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data.current, n = this.getRelationNodes("../tab-bar-item/index");
            if (n.length > 0) {
                var i = [];
                n.forEach(function(n) {
                    n.changeCurrent(n.data.key === t), n.changeCurrentColor(e.data.color), i.push({
                        key: n.data.key
                    });
                }), this.setData({
                    list: i
                });
            }
        },
        emitEvent: function(e) {
            this.triggerEvent("change", {
                key: e
            });
        },
        handleClickItem: function(e) {
            var t = e.currentTarget.dataset.key;
            this.emitEvent(t);
        },
        get_aa_dd: function(n) {
            var i = e.getCache("userinfo"), a = new Object();
            a.token = i.token, a.openid = i.openid, a.uid = i.uid, a.much_id = e.siteInfo.uniacid, 
            a.form_id = n.detail.formId;
            var r = e.api_root + "User/add_form_id";
            t.POST(r, {
                params: a,
                success: function(e) {
                    console.log(e);
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
        }
    }
});