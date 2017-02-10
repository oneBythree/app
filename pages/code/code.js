//code.js 扫描结果页面
var util = require('../../utils/util.js')

var api = require('../../utils/api.js');

Page({
    data: {
        result: null,
        codeTypeName: '',
    },
    onLoad: function(e) {
        console.log(e);
        this.reqCodeMsg(e);
    },
    reqCodeMsg: function(datapath) {
        var _nodeId = datapath.nodeId;
        var _scanType = datapath.scanType;
        var _code = datapath.code;
        var that = this
        var qrCodeUri = 'https://www.bjfxr.com/analyse/tracingchain/qrcode';
        var barCodeUri = 'https://www.bjfxr.com/analyse/tracingchain/barcode';

        if (_scanType == 'QR_CODE') {
            that.setData({
                codeTypeName: '二维码'
            })

            wx.request({
                url: qrCodeUri,
                data: { 'trace_code': _code },
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res) {
                    console.log(res);
                    console.log("查询二维码成功");
                    var data = res.data[0];
                    if (data.result) {
                        that.setData({
                            result: data.data
                        })
                        console.log(data.data);
                    } else {
                        // wx.showToast({
                        //     title: res.message,
                        //     duration: 2000
                        // })
                    }
                },
                fail: function(res) {
                    console.log(res);
                    console.log("查询二维码失败");
                }
            })
        } else {
            that.setData({
                codeTypeName: '条形码'
            })
            
            wx.request({
                url: barCodeUri,
                data: { 'trace_code': _code, 'node_id': _nodeId },
                header: {
                    'Content-Type': 'application/json'
                },
                success: function(res) {
                    console.log("查询条形码成功");
                    var data = res.data[0];
                    if (data.result) {
                        that.setData({
                            result: data.data
                        })
                    } else {
                        // wx.showToast({
                        //     title: res.message,
                        //     duration: 2000
                        // })
                    }
                },
                fail: function(res) {
                    console.log("查询条形码失败");
                }
            })
        }
    }
})
