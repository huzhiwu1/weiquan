Component({
    externalClasses: [ "i-class" ],
    properties: {
        height: {
            type: String,
            value: "300"
        },
        itemHeight: {
            type: Number,
            value: 18
        }
    },
    relations: {
        "../index-item/index": {
            type: "child",
            linked: function() {
                this._updateDataChange();
            },
            linkChanged: function() {
                this._updateDataChange();
            },
            unlinked: function() {
                this._updateDataChange();
            }
        }
    },
    data: {
        scrollTop: 0,
        fixedData: [],
        current: 0,
        timer: null,
        startTop: 0,
        itemLength: 0,
        currentName: "",
        isTouches: !1
    },
    methods: {
        loop: function() {},
        _updateDataChange: function() {
            var t = this, e = this.getRelationNodes("../index-item/index"), a = e.length, i = this.data.fixedData;
            a > 0 && (this.data.timer && (clearTimeout(this.data.timer), this.setData({
                timer: null
            })), this.data.timer = setTimeout(function() {
                var a = [];
                e.forEach(function(t) {
                    t.data.name && -1 === i.indexOf(t.data.name) && (a.push(t.data.name), t.updateDataChange());
                }), t.setData({
                    fixedData: a,
                    itemLength: e.length
                }), t.setTouchStartVal();
            }, 0), this.setData({
                timer: this.data.timer
            }));
        },
        handlerScroll: function(t) {
            var e = this, a = t.detail.scrollTop;
            this.getRelationNodes("../index-item/index").forEach(function(t, i) {
                var n = t.data, r = n.top + n.height;
                a < r && a >= n.top && e.setData({
                    current: i,
                    currentName: n.currentName
                });
            });
        },
        getCurrentItem: function(t) {
            var e = this.getRelationNodes("../index-item/index"), a = {};
            return a = e[t].data, a.total = e.length, a;
        },
        triggerCallback: function(t) {
            this.triggerEvent("change", t);
        },
        handlerFixedTap: function(t) {
            var e = t.currentTarget.dataset.index, a = this.getCurrentItem(e);
            this.setData({
                scrollTop: a.top,
                currentName: a.currentName,
                isTouches: !0
            }), this.triggerCallback({
                index: e,
                current: a.currentName
            });
        },
        handlerTouchMove: function(t) {
            var e = this.data, a = (t.touches[0] || {}).pageY - e.startTop, i = Math.ceil(a / e.itemHeight);
            i = i >= e.itemLength ? e.itemLength - 1 : i;
            var n = this.getCurrentItem(i);
            n.name !== this.data.currentName && wx.vibrateShort(), this.setData({
                scrollTop: n.top,
                currentName: n.name,
                isTouches: !0
            }), this.triggerCallback({
                index: i,
                current: n.name
            });
        },
        handlerTouchEnd: function() {
            this.setData({
                isTouches: !1
            });
        },
        setTouchStartVal: function() {
            var t = this;
            wx.createSelectorQuery().in(this).select(".i-index-fixed").boundingClientRect(function(e) {
                t.setData({
                    startTop: e.top
                });
            }).exec();
        }
    }
});