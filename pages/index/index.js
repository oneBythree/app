//index.js
//获取应用实例

var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js');

var app = getApp()
Page({
    data: {
        userInfo: {},
        latitude: 0,
        longitude: 0,
        supplierAddress: ''
    },

    onLoad: function(e) {
        console.log('onLoad')
        var that = this
            //调用应用实例的方法获取全局数据
        app.getUserInfo(function(userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })

        if (e.hasOwnProperty('nodeId') && e.hasOwnProperty('latitude') && e.hasOwnProperty('longitude')) { //扫码入口
            that.reverseGeocoder(latitude, e.longitude); //点击切换商家链接
            that.searchInBounds(latitude, e.longitude); //获取附近合作商家
        } else if (e.hasOwnProperty('nodeId') && !e.hasOwnProperty('latitude') && !e.hasOwnProperty('longitude')) { //选择合作商家入口

        } else { //定位入口
            wx.getLocation({ //定位获取地理坐标
                type: 'gcj02',
                success: function(res) {
                    var latitude = res.latitude //x
                    var longitude = res.longitude //y
                    that.setData({
                        'latitude': latitude
                    });
                    that.setData({
                        'longitude': longitude
                    })
                    that.reverseGeocoder(latitude, longitude); //点击切换商家链接
                    that.searchInBounds(latitude, longitude); //获取附近合作商家
                }
            })
        }


    },
    reverseGeocoder: function(latitude, longitude) { //根据坐标转换具体地址
        // 实例划API核心类
        var demo = new QQMapWX({
            key: 'BQOBZ-FIUCJ-QQFF4-KS546-W2BR3-UKFE4' // 腾讯地图key值
        });

        // 调用接口
        demo.reverseGeocoder({
            location: {
                latitude: latitude, //x
                longitude: longitude //y
            },
            success: function(res) {
                console.log(res);
            },
            fail: function(res) {
                console.log('根据坐标转换具体地址失败');
            }
        });
    },
    bindViewLink: function() { //点击切换商家链接
        var that = this;
        wx.navigateTo({
            url: '../chooseLocation/chooseLocation?latitude=' + that.data.latitude + '&longitude=' + that.data.longitude
        })
    },
    searchInBounds: function(latitude, longitude) {
        var url = 'https://www.bjfxr.com/analyse/tracingchain/distance';
        wx.request({
            url: url,
            data: { 'x_coordinate': latitude, 'y_coordinate': longitude },
            header: {
                'Content-Type': 'application/json'
            },
            success: function(res) {
                console.log(res.data[0].data);
                console.log("查询切换商家接口成功");
            },
            fail: function(res) {
                console.log(res);
                console.log("查询切换商家接口失败");
            }
        })
    },
    bindViewCode: function() { //扫码查询
        wx.scanCode({
            success: function(res) {
                var url = '../code/code?code=' + res.result + '&scanType=' + res.scanType + '&nodeId=' + 110108057;
                wx.navigateTo({
                    url: url
                })
            },
            fail: function(res) {

            }
        })
    },
    onShareAppMessage: function() {
        return {
            title: '北京E追溯',
            desc: '肉菜',
            path: '/page/user?id=123'
        }
    }
})
