// pages/cart/cart.js
import { Cart } from "./cart-model.js";
var cart = new Cart;
Page({

  /**
   * 页面的初始数据
   */
  data: {

    cartData:null,
    account:0,

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
 
    var cartData = cart.getCartInfoFromLocal();
    this.data.cartData=cartData;
    if(cartData!=null){
      this._resetData(this.data.cartData);
    }
  },
  toggleSelect: function (event) {
    var status = event.currentTarget.dataset.status;
    var index = event.currentTarget.dataset.index;
    var localData = this.data.cartData;
    localData[index].selectStatus = !status;
    this._resetData(localData);
  },
  toggleSelectAll: function (event) {
    var localData = this.data.cartData;
    //选中标识位
    var flag = 0;
    var len = localData.length;
    for (let i = 0; i < len; i++) {
      if (localData[i].selectStatus) {
        flag += 1;
      }
    }
    //如果全部未选中 则全选
    if (flag == 0) {
      for (let i = 0; i < len; i++) {
        localData[i].selectStatus = true;
      }
    }
    if (flag < len) {
      for (let i = 0; i < len; i++) {
        localData[i].selectStatus = true;
      }
    }
    //如果全部选中 则全部取消选中
    if (flag == len) {
      for (let i = 0; i < len; i++) {
        localData[i].selectStatus = false;
      }
    }
    this._resetData(localData);
  },
  changeCounts: function (event) {
    var type = event.currentTarget.dataset.type;
    var id = event.currentTarget.dataset.id;
    var localData = this.data.cartData;
    if (type == 'add') {
      for (let i = 0; i < localData.length; i++) {
        if (localData[i].id == id) {
          localData[i].counts++;
        }
      }
    }
    if (type == 'cut') {
      for (let i = 0; i < localData.length; i++) {
        if (localData[i].id == id && localData[i].counts > 1) {
          localData[i].counts--;
        }
      }
    }
    this._resetData(localData);

  },
  //下单
  submitOrder:function(){
    wx.navigateTo({
      url: '/pages/order/order?account=' + this.data.account+'&from=cart',
    })
  },
  delete: function (event) {
    var id = event.currentTarget.dataset.id;
    var index = event.currentTarget.dataset.index;
    var localData = this.data.cartData;
    localData.splice(index,1);
    this._resetData(localData);
  },
  //修改缓存数据 
  //优化：放在onhide用户离开页面时 统一修改缓存
  _resetData: function (data) {
    var selectedTypeCounts = 0;
    var selectedCounts = 0;
    var account = 0;
    //选中标识位
    var flag = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i].selectStatus) {
        selectedTypeCounts += 1;
        account += data[i].counts * 100 * data[i].price * 100;
        selectedCounts += data[i].counts;
      }
    }
    this.data.account = account;
    this.setData({
      selectedTypeCounts: selectedTypeCounts,
      cartData: data,
      selectedCounts: selectedCounts,
      account: account / (100 * 100)
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //离开购物车页面时 保存购物车所做的修改
    wx.setStorageSync(cart.cartKey, this.data.cartData);
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