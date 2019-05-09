var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = function(t, e) {
    console.warn(t), console.log("接受到的值为：", e);
};

Component({
    externalClasses: [ "i-class" ],
    options: {
        multipleSlots: !0
    },
    relations: {
        "../cell-group/index": {
            type: "parent"
        }
    },
    properties: {
        title: {
            type: String
        },
        label: {
            type: String
        },
        value: {
            type: String
        },
        onlyTapFooter: {
            type: Boolean
        },
        isLink: {
            type: null,
            value: ""
        },
        linkType: {
            type: String,
            value: "navigateTo"
        },
        url: {
            type: String,
            value: ""
        }
    },
    data: {
        isLastCell: !0
    },
    methods: {
        navigateTo: function() {
            var i = this.data.url, a = t(this.data.isLink);
            this.triggerEvent("click", {}), this.data.isLink && i && "true" !== i && "false" !== i && ("boolean" === a || "string" === a ? -1 !== [ "navigateTo", "redirectTo", "switchTab", "reLaunch" ].indexOf(this.data.linkType) ? wx[this.data.linkType].call(wx, {
                url: i
            }) : e("linkType 属性可选值为 navigateTo，redirectTo，switchTab，reLaunch", this.data.linkType) : e("isLink 属性值必须是一个字符串或布尔值", this.data.isLink));
        },
        handleTap: function() {
            this.data.onlyTapFooter || this.navigateTo();
        },
        updateIsLastCell: function(t) {
            this.setData({
                isLastCell: t
            });
        }
    }
});