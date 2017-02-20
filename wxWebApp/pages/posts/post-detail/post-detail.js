var postsData = require('../../../data/posts-data.js');
var app = getApp();

Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var postId = options.id;
    var postData = postsData.postList[postId];
    this.setData({
      postData: postData,
      currentPostId: postId
    });
    //在小程序中中，如果用户不主动清除缓存，缓存是一直存在的，缓存的限制大小不能超过10M

    /*收藏功能*/
    var postsCollected = wx.getStorageSync('posts_collected');

    if (postsCollected) {
      var postCollected = postsCollected[postId];
      this.setData({
        collected: postCollected
      })
    } else {
      postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }
    /* 收藏功能end */

    

    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId === postId) {
      this.setData({
        isPlayingMusic: true
      })
    }
    this.setMusicMonitor();

  },
  setMusicMonitor: function () {
    var that = this;
    //用框架去调用代码：事件驱动:实现模块与模块间的松耦合
    //点击播放图标和总控开关都会触发这个函数

    //监听音乐播放
    wx.onBackgroundAudioPlay(function () {
      if (app.globalData.g_currentMusicPostId === that.data.currentPostId) {
        that.setData({
          isPlayingMusic: true
        })
      }

      app.globalData.g_isPlayingMusic = true;

    })

    //监听音乐暂停
    wx.onBackgroundAudioPause(function () {
      if (app.globalData.g_currentMusicPostId === that.data.currentPostId) {
        that.setData({
          isPlayingMusic: false
        })
      }
      app.globalData.g_isPlayingMusic = false;

    })

    //监听音乐播放完毕
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
    })
  },
  onCollectionTap: function (event) {
    this.getPostsCollectedSyc();
    //this.getPostsCollectedAsy();
  },
  //同步
  getPostsCollectedSyc: function () {
    //获得当前缓存状态
    var postsCollected = wx.getStorageSync('posts_collected');
    //拿到当前文章的ID值，以获取当前文章是否被收藏的缓存值
    var postCollected = postsCollected[this.data.currentPostId];
    //收藏变成未收藏，未收藏变成收藏
    postCollected = !postCollected;
    postsCollected[this.data.currentPostId] = postCollected;

    //this.showModal(postsCollected,postCollected);
    this.showToast(postsCollected, postCollected);
  },
  //异步:根据业务需求
  getPostsCollectedAsy: function () {
    var that = this;
    //获得当前缓存状态
    wx.getStorage({
      key: 'posts_collected',
      success: function (res) {
        var postsCollected = res.data;
        //拿到当前文章的ID值，以获取当前文章是否被收藏的缓存值
        var postCollected = postsCollected[that.data.currentPostId];
        //收藏变成未收藏，未收藏变成收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;

        //this.showModal(postsCollected,postCollected);
        that.showToast(postsCollected, postCollected);
      }
    })

  },

  showToast: function (postsCollected, postCollected) {
    //更新缓存
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定变量，从而切换图片
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: postCollected ? '收藏成功~' : '取消成功~',
      duration: 1000
    })
  },
  showModal: function (postsCollected, postCollected) {
    var that = this;
    wx.showModal({
      title: '收藏',
      content: postCollected ? '您确定要收藏吗？' : '您确定要取消吗？',
      showCancel: 'true',//默认可以不写
      cancelText: '取消',//默认可以不写
      cancelColor: '#333',
      confirmText: '确定',//默认可以不写
      confirmColor: '#3CC51F',//默认可以不写
      success: function (res) {
        if (res.confirm) {
          //更新缓存
          wx.setStorageSync('posts_collected', postsCollected);
          //更新数据绑定变量，从而切换图片
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },
  onShareTap: function () {
    var itemList = [
      '分享给微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到微博'
    ];
    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function (res) {
        //res.cancel:用户是否点击了'取消'按钮
        //res.tapIndex:点击的数组元素index,从0开始
        wx.showModal({
          title: '用户 ' + itemList[res.tapIndex],
          content: '用户是否取消？' + res.cancel + '现在无法实现分享功能，什么时候能支持呢？'
        })
      }
    })
  },
  //音乐播放：dataUrl及及coverImgUrl不能是本地的音频文件，本地音频文件播放不了
  onMusicTap: function () {
    var currentPostId = this.data.currentPostId,
      dataUrl = postsData.postList[currentPostId].music.url,
      title = postsData.postList[currentPostId].music.title,
      coverImgUrl = postsData.postList[currentPostId].music.coverImg;

    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      //暂停音乐播放
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic: false
      })
      app.globalData.g_isPlayingMusic = false;
    } else {
      wx.playBackgroundAudio({
        dataUrl: dataUrl,
        title: title,
        coverImgUrl: coverImgUrl

      })
      this.setData({
        isPlayingMusic: true
      })

      app.globalData.g_currentMusicPostId = currentPostId;
      app.globalData.g_isPlayingMusic = true;
    }

  },
  onUnload: function () {

  }


})