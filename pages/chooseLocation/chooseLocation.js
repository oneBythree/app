//logs.js
Page({
    data: {

    },
    onLoad: function(e) {
        this.searchInBounds(e)
    },
    searchInBounds: function(e) {
        var url = 'https://www.bjfxr.com/analyse/tracingchain/distance';
        var _latitude = e.latitude;
        var _longitude = e.longitude;
        wx.request({
            url: url,
            data: { 'x_coordinate': _latitude,'y_coordinate':_longitude},
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res);
                console.log("查询切换商家接口成功");
            },
            fail: function(res) {
                console.log(res);
                console.log("查询二维码失败");
            }
        })
    }
})
