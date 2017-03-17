// 引用脚本文件时，只能是相对路径，不能是绝对路径
var postsData = require('../../data/posts-data.js');

Page({
  data: {
    //小程序总是会读取data对象来做数据绑定，这个动作我们称为A,而这个动作A的执行，是在在onLoad事件执行之后发生的
    scrollTop:0,
    goTopShow:false

  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // this.data.post_key=postsData.postList;//这种方法已经失效
    this.postsReadingInit();
    this.setData({
      post_key: postsData.postList
    });
  },
  scrollTopFun:function(e){
    var top = e.detail.scrollTop;
    if(top>300){
      this.setData({
        goTopShow:true
      })
    }else{
      this.setData({
        goTopShow:false
      })
    }
  },
  goTopFun: function(e){    
    this.setData({  
      scrollTop: 0  
    });  
  },
  onPostTap: function (event) {
    var that = this;
    var postId = event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
      success: function () {
        that.postsReadingAmount(postId);
      }
    })
  },
  //阅读数量初始化
  postsReadingInit: function () {
    var postsReading = wx.getStorageSync('posts_reading');
    if (postsReading) {
      var len = postsData.postList.length;
      for (var i = 0; i < len; i++) {
        var postReading = postsReading[i];
        if (!postReading) {
          postsReading[i] = 0;
          wx.setStorageSync('posts_reading', postsReading);
        } else {
          postsData.postList[i].reading = postsReading[i];
        }
      }
    } else {
      postsReading = {};
      wx.setStorageSync('posts_reading', postsReading);
    }
  },
  //阅读数量功能
  postsReadingAmount: function (postId) {
    var postsReading = wx.getStorageSync('posts_reading');
    var postReading = postsReading[postId];
    if (!postReading) {
      postsReading[postId] = 1;
    } else {
      postsReading[postId] += 1;
    }
    wx.setStorageSync('posts_reading', postsReading);
    postsData.postList[postId].reading = postsReading[postId];
    this.setData({
      post_key: postsData.postList
    });
  },
  // target 与 currentTarget:target指的是当前点击的组件，currentTarget指的是事件捕获的组件。
  // target这里指的是image组件，currentTarget指的是swiper组件
  // onSwiperItemTap: function (event) {
  //   var postId = event.currentTarget.dataset.postid;
  //   wx.navigateTo({
  //     url: 'post-detail/post-detail?id=' + postId
  //   })
  // },
  onSwiperTap: function (event) {
    var that = this;
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
      success: function () {
        that.postsReadingAmount(postId);
      }
    })
  }
})