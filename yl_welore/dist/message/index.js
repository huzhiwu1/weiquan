var t = Object.assign || function(t) {
    for (var e = 1; e < arguments.length; e++) {
        var a = arguments[e];
        for (var n in a) Object.prototype.hasOwnProperty.call(a, n) && (t[n] = a[n]);
    }
    return t;
}, e = {
    visible: !1,
    content: "",
    duration: 2,
    type: "default"
}, a = null;

Component({
    externalClasses: [ "i-class" ],
    data: t({}, e),
    methods: {
        handleShow: function(e) {
            var n = this, i = e.type, o = void 0 === i ? "default" : i, r = e.duration, s = void 0 === r ? 2 : r;
            this.setData(t({}, e, {
                type: o,
                duration: s,
                visible: !0
            }));
            var l = 1e3 * this.data.duration;
            a && clearTimeout(a), 0 !== l && (a = setTimeout(function() {
                n.handleHide(), a = null;
            }, l));
        },
        handleHide: function() {
            this.setData(t({}, e));
        }
    }
});