var n = getApp();

Page({
    data: {
        url: ""
    },
    onLoad: function(o) {
        console.log(o);
        var t = o.url + "?";
        for (var e in o) "url" != e && (t += e + "=" + o[e] + "&");
        console.log(t.substr(0, t.length - 1)), this.setData({
            url: t.substr(0, t.length - 1),
            height: n.globalData.height
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});