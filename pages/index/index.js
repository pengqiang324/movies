// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: [],
    page: 1,
    size: 6,
    loading: true
  },
  saveData(data) {
    console.log(data)
    let history = wx.getStorageSync('history') || []

    history = history.filter((item) => {
      return item._id !== data._id
    })

    history.unshift(data)
    wx.setStorageSync('history', history)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMovies()
    /*const value = wx.getStorageSync('id');
    if (value){
      this.setData({
        dataStorage: value
      })
    }*/
  },
  loadMovies: function(){
    const { size, page} = this.data
    this.setData({loading: true})
    wx.request({
      url: `https://db.miaov.com/doubanapi/v0/movie/list?page=${page}&size=${size}`,
      success : (res) => {
        const { data } = res.data
        const movies = this.data.movies
        for(let i=0;i<data.length;i+=2){
          movies.push([ data[i] , data[i+1] ? data[i+1] : null ])
        }
        this.setData({movies, loading: false})
      }
    })
  },
  
  scrollHandler: function(){
    const { page } = this.data
    this.setData({
      page : page + 1
    })
    this.loadMovies();
  },
  gotoDetailHandler: function(e){
    const { movieData } = e.currentTarget.dataset
    const { _id } = movieData

    this.saveData(movieData)
    /*数据缓存于本地*/
    /*var dataStorage = this.data.dataStorage
    
    if(dataStorage.length){
      dataStorage.unshift(id)
      dataStorage = [...new Set(dataStorage)]
    }else{
      dataStorage.push(id)
    }
    this.setData({dataStorage})
    wx.setStorageSync('id', dataStorage)*/

    /*页面跳转*/
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + _id
    })
  }
})