// pages/category/category.js
import { Category } from "./category-model.js";
var category = new Category;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // productData:null
    currentMenuIndex: 0,
    //已加载过的数据
    loadedData:{}

  },
  isLoadedData:function(index){
    if(this.data.loadedData[index]){
      return true;
    }else{
      return false;
    }
    
  },
  //跳转商品详情页
  onProductsItemTap: function (event) {
    var id = event.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/product/product?id=' + id,
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._loadData();
  },

  //加载页面需要的数据
  _loadData: function () {
    category.getAllCategory((res) => {
      //console.log(res);
      var categories = res.data;
      this.setData({ 'categoryArr': categories });
      //默认显示的分类页的产品为返回的分类列表的第一类产品
      //在回调里面加载商品可以保证成功
      //判断是否加载过了
      if (this.isLoadedData(0)) {
        this.setData({ productData: this.data.loadedData[0] });
      }else{
        category.getProducts(categories[0]['id'], (productData) => {
          //console.log(productData.data);
          this.setData({ productData: productData.data });
          this.data.loadedData[0] = productData.data;
          //console.log(this.data.loadedData);
        })
      }
    })
  },

  changeCategory: function (event) {
    var id = category.getDataByKey(event, 'id');
    var index = category.getDataByKey(event, 'index');
   
    if(this.isLoadedData(index)){
      this.setData({
        productData: this.data.loadedData[index],
        currentMenuIndex: index})
    }else{
      category.getProducts(id, (productData) => {
        //console.log(productData.data);
        this.data.loadedData[index] = productData.data;
        this.setData(
          {
            productData: this.data.loadedData[index],
            currentMenuIndex: index
          }
        )
      }
      )
    }
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