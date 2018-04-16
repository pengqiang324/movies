// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    page: 1,
    size: 6,
    loading: true,
    type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { type } = options

    this.setData({type})
    this.loadMovies()
  },

  loadMovies: function () {
    const { size, page,type} = this.data
    this.setData({ loading: true })
    wx.request({
      url: `https://db.miaov.com/doubanapi/v0/movie/list?type=${type}&page=${page}&size=${size}`,
      success: (res) => {
        const { data } = res.data
        const movies = this.data.movies
        for (let i = 0; i < data.length; i += 2) {
          movies.push([data[i], data[i + 1] ? data[i + 1] : null])
        }
        this.setData({ movies, loading: false})
      }
    })
  },

  scrollHandler: function () {
    const { page } = this.data
    this.setData({
      page: page + 1
    })
    this.loadMovies();
  },
  gotoDetailHandler: function (e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + id
    })
  }
})