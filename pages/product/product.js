// pages/product/product.js
import { Product } from "./product-model.js";
var product = new Product;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    productData: null,
    countsArray: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    productCount: 1,
    currentTabsIndex: 0,
    cartTotalCounts:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.id;
    this.id = id;
    product.getProductById(id, (res) => {
      this.data.productData = res.data;
      //console.log(this.productData);
      var cartTotalCounts = product.getTotal();
      this.setData({ cartTotalCounts: cartTotalCounts });
      this.setData({ productData: this.data.productData });
    })


  },
  //选项卡
  onTabsItemTap: function (event) {
    var index = product.getDataByKey(event, 'index');
    this.data.currentTabsIndex = index;
    this.setData({ currentTabsIndex: this.data.currentTabsIndex });
  },
  //改变商品数量
  bindPickerChange: function (event) {

    var index = event.detail.value;
    this.data.productCount = this.data.countsArray[index];
    this.setData({ productCount: this.data.productCount });
    //console.log(this.data.productCount);
  },
  //加入购物车操作
  onAddingToCartTap() {
    this._addToCart();
    var cartTotalCounts = product.getTotal();
    this.setData({ cartTotalCounts: cartTotalCounts });
  },
  _addToCart(){
    var counts = this.data.productCount;
    var item = this.data.productData;
    product.addToCart(counts, item);
  },
  //跳转购物车
  onCartTap: function (event) {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
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