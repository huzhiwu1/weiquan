var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (t[i] = a[i]);
    }
    return t;
}, e = {
    visible: !1,
    content: "",
    icon: "",
    image: "",
    duration: 2,
    mask: !0,
    type: "default"
}, a = null;

Component({
    externalClasses: [ "i-class" ],
    data: t({}, e),
    methods: {
        handleShow: function(e) {
            var i = this, n = e.type, o = void 0 === n ? "default" : n, s = e.duration, r = void 0 === s ? 2 : s;
            this.setData(t({}, e, {
                type: o,
                duration: r,
                visible: !0
            }));
            var l = 1e3 * this.data.duration;
            a && clearTimeout(a), 0 !== l && (a = setTimeout(function() {
                i.handleHide(), a = null;
            }, l));
        },
        handleHide: function() {
            this.setData(t({}, e));
        }
    }
});