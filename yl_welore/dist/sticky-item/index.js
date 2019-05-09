Component({
    externalClasses: [ "i-class" ],
    options: {
        multipleSlots: !0
    },
    relations: {
        "../sticky/index": {
            type: "parent"
        }
    },
    data: {
        top: 0,
        height: 0,
        isFixed: !1,
        index: -1
    },
    methods: {
        updateScrollTopChange: function(t) {
            var e = this.data, i = e.top, a = e.height;
            this.setData({
                isFixed: t >= i && t < i + a
            });
        },
        updateDataChange: function(t) {
            var e = this;
            wx.createSelectorQuery().in(this).select(".i-sticky-item").boundingClientRect(function(i) {
                i && e.setData({
                    top: i.top,
                    height: i.height,
                    index: t
                });
            }).exec();
        }
    }
});