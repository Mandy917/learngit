App({
    globalData: {
        g_isPlayingMusic: false,
        g_currentMusicPostId: null,
        doubanBase: 'https://api.douban.com',
        userInfo: null
    },
    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    }
})


//生命周期函数
// App({
//   onLaunch: function () {
//     console.log('onLanuch');
//   },
//   onShow: function () {
//     console.log('onShow');
//   },
//   onHide: function () {
//     console.log('onHide');
//   },
//   onError: function (msg) {
//     console.log('onError');
//   }
// })