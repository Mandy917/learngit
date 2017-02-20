var util = require('../../../utils/util.js');
var app = getApp();

Page({
  data: {
    movies: [],
    requestUrl: '',
    totalCount: 0,
    totalDataCount: 0,
    isEmpty: true,
    totalDataComplete: false,
    requestComplete: true
  },
  onLoad: function (options) {
    var category = options.category;
    var dataUrl = '';
    var dataInitUrl = '';
    //设置导航标题
    wx.setNavigationBarTitle({
      title: category
    })
    //加载数据
    switch (category) {
      case '正在热映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/in_theaters';
        break;
      case '即将上映':
        dataUrl = app.globalData.doubanBase + '/v2/movie/coming_soon';
        break;
      case '豆瓣Top250':
        dataUrl = app.globalData.doubanBase + '/v2/movie/top250';
        break;
    }

    this.data.requestUrl = dataUrl;
    dataInitUrl = dataUrl + '?start=0&count=21';

    util.http(dataInitUrl, this.processDoubanData);

  },
  onMovieTap: function (event) {
    var movieId = event.currentTarget.dataset.movieid;
    var name = event.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + movieId + '&name=' + name
    })
  },
  //页面上拉触底事件的处理函数
  onReachBottom: function () {
    if (this.data.totalCount > this.data.totalDataCount) {
      this.setData({
        totalDataComplete: true
      })
      return;
    } else {
      if (this.data.requestComplete) {
        this.data.requestComplete = false;
        var nextUrl = this.data.requestUrl + '?start=' + this.data.totalCount + '&count=21';
        util.http(nextUrl, this.processDoubanData);
        //设置加载动画
        wx.showNavigationBarLoading();
      }
    }
  },
  //监听用户下拉动作事件的处理函数
  onPullDownRefresh: function () {
    var refreshUrl = this.data.requestUrl + '?start=0&count=21';
    this.data.movies = [];
    this.data.isEmpty = 'true';
    util.http(refreshUrl, this.processDoubanData);
    //设置加载动画
    wx.showNavigationBarLoading();
  },
  processDoubanData: function (moviesDouban) {
    var movies = [];
    var totalMovies = [];
    this.data.totalDataCount = moviesDouban.total;
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + '...';
      }
      var temp = {
        title: title,
        fullName: subject.title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars)
      }
      movies.push(temp);
    }

    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    } else {
      this.data.totalCount = 0;
      totalMovies = movies;
      this.data.isEmpty = false;
    }

    this.setData({
      movies: totalMovies
    });
    //停止当前页面下拉刷新
    wx.stopPullDownRefresh();
    //数据加载完，加载动画隐藏
    wx.hideNavigationBarLoading();

    this.data.totalCount += 21;
    this.data.requestComplete = true;
  }

})