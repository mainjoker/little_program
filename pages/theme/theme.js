// pages/theme/theme.js
import {Theme} from './theme-model.js';
var theme=new Theme;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    name:null,
    themeInfo:null
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id=options.id;
    var name=options.name;
    this.data.id=id;
    this.data.name=name;
    this._loadData();
  
  },
  _loadData:function(){
    var id=this.data.id;
    var name=this.data.name;
    theme.getThemeById(id,(res)=>{
      this.data.themeInfo=res.data;
      this.setData({ themeInfo: this.data.themeInfo});
      console.log(this.data.themeInfo);
    })
  },
  //跳转商品详情页
  onProductsItemTap: function (event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/product/product?id=' + id,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})