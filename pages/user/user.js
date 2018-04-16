// page/user/user.js
Page({
  data: {
    avatarUrl: '',
    nickName: '未知',
    movies: []
  },

  onLoad (options) {
    wx.getUserInfo({
      success: (res) => {
        this.setData({
          avatarUrl: res.userInfo.avatarUrl,
          nickName: res.userInfo.nickName
        })
      }
    })
  },

  onShow() {
    let history = wx.getStorageSync('history')

    if (history) {
      this.setData({
        movies: history.slice(0, 2)
      })
    }
  },

  gotoHistory () {
    wx.navigateTo({
      url: '../history-list/history-list',
    })
  },

  gotoDetail(e) {
    const { movieData } = e.currentTarget.dataset
    console.log()
    const { _id } = movieData
    
    wx.navigateTo({
      url: '../movie-detail/movie-detail?id=' + _id
    })
  }
})