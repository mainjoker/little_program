// pages/order/order.js
import { Cart } from "../cart/cart-model.js";
import { Order } from "./order-model.js";
import { Address } from "../../utils/address.js";
var cart = new Cart;
var address = new Address;
var order=new Order;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    basicInfo: null,
    orderStatus: 0,
    productsArr: null,
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function (options) {
    var account = options.account;
    console.log('addressInfo:' + this.data.addressInfo);
    this.setData({
      account: account,
    });
    this._loadData();
    order.checkToken((res)=>{
      wx.setStorageSync('token', res.data.token);
    });
  },
  _loadData: function () {
    var localData = cart.getCartInfoFromLocal();
    //过滤掉未被选中的商品
    var res = [];
    for (let i = 0; i < localData.length; i++) {
      if (localData[i].selectStatus) {
        res.push(localData[i]);
      }
    }
    this.data.productsArr = res;
    this.setData({
      productsArr: this.data.productsArr,
    })
  },
  editAddress: function () {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        var addressInfo = {
          province: res.provinceName,
          city: res.cityName,
          country:res.countyName,
          name: res.userName,
          mobile: res.telNumber,
          detail: res.detailInfo,
        }
        that._getUserAddress(addressInfo);
      }
    })
  },
  _getUserAddress(data) {
    var addressInfo = address.getUserAddress(data);
    this.setData({
      addressInfo: addressInfo
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