function t(t, e) {
    var a = void 0, n = void 0, i = void 0;
    try {
        a = t.toString().split(".")[1].length;
    } catch (t) {
        a = 0;
    }
    try {
        n = e.toString().split(".")[1].length;
    } catch (t) {
        n = 0;
    }
    return i = Math.pow(10, Math.max(a, n)), (Math.round(t * i) + Math.round(e * i)) / i;
}

Component({
    externalClasses: [ "i-class" ],
    properties: {
        size: String,
        value: {
            type: Number,
            value: 1
        },
        min: {
            type: Number,
            value: -1 / 0
        },
        max: {
            type: Number,
            value: 1 / 0
        },
        step: {
            type: Number,
            value: 1
        }
    },
    methods: {
        handleChangeStep: function(e, a) {
            var n = e.currentTarget.dataset, i = (void 0 === n ? {} : n).disabled, l = this.data.step, u = this.data.value;
            return i ? null : ("minus" === a ? u = t(u, -l) : "plus" === a && (u = t(u, l)), 
            u < this.data.min || u > this.data.max ? null : void this.handleEmit(u, a));
        },
        handleMinus: function(t) {
            this.handleChangeStep(t, "minus");
        },
        handlePlus: function(t) {
            this.handleChangeStep(t, "plus");
        },
        handleBlur: function(t) {
            var e = this, a = t.detail.value, n = this.data, i = n.min, l = n.max;
            a ? ((a = +a) > l ? a = l : a < i && (a = i), this.handleEmit(a)) : setTimeout(function() {
                e.handleEmit(a);
            }, 16);
        },
        handleEmit: function(t, e) {
            var a = {
                value: t
            };
            e && (a.type = e), this.triggerEvent("change", a);
        }
    }
});