Component({
    externalClasses: [ "i-class" ],
    relations: {
        "../radio/index": {
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
        }
    },
    methods: {
        changeCurrent: function() {
            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.data.current, n = this.getRelationNodes("../radio/index");
            n.length > 0 && n.forEach(function(n) {
                n.changeCurrent(e === n.data.value);
            });
        },
        emitEvent: function(e) {
            this.triggerEvent("change", e);
        }
    }
});