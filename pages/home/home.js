// pages/home/home.js
import {Home} from './home-model.js';
var home=new Home;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._onloadData();
  },
  //跳转商品详情页
  onProductsItemTap: function (event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/product/product?id=' + id,
    })
  },
  //跳转对应主题页面
  onThemesItemTap:function(event){
  
    var id = event.currentTarget.dataset['id'];
    var name = event.currentTarget.dataset['name'];
    wx.navigateTo({
      url: '/pages/theme/theme?id='+id+'&name='+name,
    })
  },
  /**
   * 加载页面所需要的数据 
   */

  _onloadData:function (){
    //获取banner
    var id=1;
    home.getBannerData(id,(data)=>{
      var bannerArr = data.items;
      //console.log(bannerArr);
      this.setData({
        'bannerArr': bannerArr,
      })
    });
    //获取themes
    home.getThemesAll((data)=>{
      this.setData({
        'themesAll':data
      })
    });
    //获取最近新品
    home.getRecentProducts((data)=>{
        console.log(data);
        this.setData({
          'recentProduct': data.data
        })
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