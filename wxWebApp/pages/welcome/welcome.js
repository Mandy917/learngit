var app = getApp();

Page({
    data: {
        userInfo: {}
    },
    onLoad: function () {
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    },
    onTap: function () {
        // wx.navigateTo({
        //   url: '../posts/post',
        // })
        // wx.redirectTo({
        //   url: '../posts/post'
        // })

        // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
        wx.switchTab({
            url: '../posts/post',
        })


    }
})