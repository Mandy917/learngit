// 引用脚本文件时，只能是相对路径，不能是绝对路径
var util = require('../../utils/util.js');
var app = getApp();
Page({
    //RESTFul API JSON 接口的url是可以自描述的 https://api.douban.com/v2/book/1220562
    //SOAP XML
    data: {
        inTheaters: {},
        comingSoon: {},
        top250: {},
        searchResult: {},
        searchUrl: '',
        containerShow: true,
        searchPanelShow: false,
        searchPage: false,
        isEmpty: true,
        totalCount: 0,
        totalDataCount: 0,
        totalDataComplete: false,
        noneDataTip: false,
        userFeedIn: '',
        requestComplete:true

    },
    onLoad: function (event) {
        var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters' + '?start=0&count=3';
        var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon' + '?start=0&count=3';
        var top250Url = app.globalData.doubanBase + '/v2/movie/top250' + '?start=0&count=3';

        this.getMovieListData(inTheatersUrl, 'inTheaters', '正在热映');//异步
        this.getMovieListData(comingSoonUrl, 'comingSoon', '即将上映');//异步
        this.getMovieListData(top250Url, 'top250', '豆瓣Top250');//异步


    },
    onMoreTap: function (event) {
        var category = event.currentTarget.dataset.category;
        wx.navigateTo({
            url: 'more-movie/more-movie?category=' + category
        })
    },
    onMovieTap: function (event) {
        var movieId = event.currentTarget.dataset.movieid;
        var name = event.currentTarget.dataset.name;
        wx.navigateTo({
            url: 'movie-detail/movie-detail?id=' + movieId + '&name=' + name
        })
    },
    onCancelSearchTap: function (event) {
        this.setData({
            containerShow: true,
            searchPanelShow: false,
            searchResult: {},
            userFeedIn: '',
            totalDataComplete: false,
            searchPage: false
        })

    },
    onBindFocus: function (event) {
        this.setData({
            containerShow: false,
            searchPanelShow: true,
            totalDataComplete: false,
            noneDataTip: false,
        })
    },
    onBindConfirm: function (event) {
        //获取value值
        var text = event.detail.value;
        this.data.searchUrl = app.globalData.doubanBase + '/v2/movie/search?q=' + text;
        var searchUrl = this.data.searchUrl + '&start=0&count=12';
        this.setData({
            searchResult: {},
            isEmpty: true,
            totalDataComplete: false,
            noneDataTip: false,
            userFeedIn: text,
            searchPage: true
        })
        this.getMovieListData(searchUrl, 'searchResult', '');
    },
    //页面上拉触底事件的处理函数
    onReachBottom: function (event) {
        if (this.data.searchPage) {
            if (this.data.totalCount > this.data.totalDataCount) {
                this.setData({
                    totalDataComplete: true
                })
                return;
            } else {
                if (this.data.requestComplete) {
                    this.data.requestComplete = false;
                    var nextUrl = this.data.searchUrl + '&start=' + this.data.totalCount + '&count=12';
                    this.getMovieListData(nextUrl, 'searchResult', '');
                    //设置加载动画
                    wx.showNavigationBarLoading();
                }
            }
        } else {
            return false;
        }

    },
    //监听用户下拉动作事件的处理函数
    onPullDownRefresh: function () {
        if (this.data.searchPage) {
            var refreshUrl = this.data.searchUrl + '&start=0&count=12';
            this.data.searchResult = {};
            this.data.isEmpty = 'true';
            this.getMovieListData(refreshUrl, 'searchResult', '');
            //设置加载动画
            wx.showNavigationBarLoading();
        }
    },

    getMovieListData: function (url, settedKey, categoryTitle) {
        var that = this;
        wx.request({
            url: url,
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: {
                // 设置请求的 header
                "Content-Type": "json"//注意不能加"application/json"一个坑
            },
            success: function (res) {
                that.processDoubanData(res.data, settedKey, categoryTitle);
            },
            fail: function () {
                console.log('fail');
            }
        })
    },
    processDoubanData: function (moviesDouban, settedKey, categoryTitle) {
        var movies = [];
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

        if (settedKey == 'searchResult') {
            var totalMovies = [];
            var readyData = {};
            this.data.totalDataCount = moviesDouban.total;


            if (moviesDouban.total == 0) {
                this.setData({
                    noneDataTip: true
                })
            }
            if (!this.data.isEmpty) {
                totalMovies = this.data.searchResult.movies.concat(movies);
            } else {
                this.data.totalCount = 0;
                totalMovies = movies;
                this.data.isEmpty = false;
            }

            readyData[settedKey] = {
                categoryTitle: categoryTitle,
                movies: totalMovies,
            };
            this.setData(readyData);



            this.data.totalCount += 12;
        } else {
            // 如何绑定多数据（重点***）
            var readyData = {};
            readyData[settedKey] = {
                categoryTitle: categoryTitle,
                movies: movies,
            };
            this.setData(readyData);
        }

        //数据加载完，加载动画隐藏
        wx.hideNavigationBarLoading();
        //停止当前页面下拉刷新
        wx.stopPullDownRefresh();
        
        this.data.requestComplete = true;


    }
})