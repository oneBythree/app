/**
 * api接口
 */


//查询条形码接口
var barUri = 'https://www.bjfxr.com/analyse/tracingchain/barcode';

function searchBarCode(nodeId, code) {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: barUri,
            data: { 'node_id': nodeId, 'trace_code': code },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log("查询条形维码成功");
                resolve(res)
            },
            fail: function(res) {
                reject(res)
                console.log("查询条形维码失败");
            }
        })
    })
}


//查询二维码接口
var qrcodeUri = 'https://www.bjfxr.com/analyse/tracingchain/qrcode'

function searchQrCode(code) {
    return new Promise(function(resolve, reject) {
        wx.request({
            url: qrcodeUri,
            data: { 'trace_code': code },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log("查询二维码成功");
                resolve(res)
            },
            fail: function(res) {
                console.log("查询二维码失败");
                reject(res)
            }
        })
    })
}

module.exports.searchBarCode = searchBarCode;
module.exports.searchQrCode = searchQrCode;
