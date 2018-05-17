// pay-result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('from'+options.from);
    console.log('id'+options.id);
    this.data.id = options.id;
    this.setData({
      payResult: options.flag,
      id: options.id,
      from: options.from
    });
  },

  viewOrder: function (event) {
    wx.navigateBack({
      delta: 1
    })
  }
})