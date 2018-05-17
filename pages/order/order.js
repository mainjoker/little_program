// pages/order/order.js
import { Cart } from "../cart/cart-model.js";
import {Product} from "../product/product-model.js";
import { Order } from "./order-model.js";
import { Address } from "../../utils/address.js";
import { Token } from "../../utils/token.js";
var cart = new Cart;
var address = new Address;
var order = new Order;
var token=new Token;
var product=new Product;
Page({

  /**
   * 页面的初始数据
   * 
   */
  data: {
    basicInfo: null,
    orderStatus: 0,
    productsArr: null,
    addressInfo:{},
    orderStatus:0,
    //订单id
    id:null,
  },

  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad: function (options) {
    // var account = options.account;
    // this.setData({
    //   account: account,
    // });
    // this._loadData();
    var from = options.from;
    if (from == 'cart') {
      this._fromCart(options.account);
    }
    else {
      var id = options.id;
      this._fromOrder(id);
    }
    //获取用户默认地址
    address.getUserAddress((res) => {
      this.data.addressInfo = res.data;
      this.setData({
        addressInfo: this.data.addressInfo,
      })
    })
  },
  _fromCart: function (account) {
    this.setData({
      account:account
    })

    var localData = cart.getCartInfoFromLocal();
    if(localData){
      //过滤掉未被选中的商品
      var res = [];
      for (let i = 0; i < localData.length; i++) {
        if (localData[i].selectStatus) {
          res.push(localData[i]);
        }
      }
      this.data.productsArr = res;
    }
    //获取订单商品
    this.setData({
      productsArr: this.data.productsArr,
    })
  },
  _fromOrder: function (id) {
    //根据订单获取订单信息
    order.getOrderInfoById(id,(res)=>{
      // console.log(res);
      this.setData({
        orderStatus: res.data.status,
        account: res.data.total_price,
        basicInfo: {
          orderTime: res.data.create_time,
          orderNo: res.data.order_no
        },
      });
      //订单中的商品信息
      order.getproductsInOrder(id,(res)=>{
        this.setData({
          productsArr:res.data
        })
      });
    })
  },
  editAddress: function () {
    var that = this;
    wx.chooseAddress({
      success: function (res) {
        var addressInfo = {
          province: res.provinceName,
          city: res.cityName,
          country: res.countyName,
          name: res.userName,
          mobile: res.telNumber,
          detail: res.detailInfo,
        }        
        //that._getUserAddress(addressInfo);
        //更新用户地址
        address.setUserAddress(addressInfo, (flag,res) => {
          if(flag){
            addressInfo.id=res.data.id;
            that.setData({addressInfo: addressInfo});
          }else{
            wx.showModal({
              title: '提示',
              content: '请添加收货地址',
              success: function (res) {
                // if (res.confirm) {
                //   console.log('用户点击确定')
                // } else if (res.cancel) {
                //   console.log('用户点击取消')
                // }
                return false;
              }
            })  
          }
        });
      }
    })
  },
  _getUserAddress(data) {
    var addressInfo = address.getUserAddress(data);
    this.setData({
      addressInfo: addressInfo
    })
  },

  //去付款
  pay(){
    //var that=this;
    if(!this.data.addressInfo){
      wx.showModal({
        title: '提示',
        content: '请添加收货地址',
        success: function (res) {
          return false;
        }
      })  
    }else{
      if(this.data.orderStatus==0){
        this._firstTimePay();
      }else{
        this._oneMoreTimePay();
      }
    }
  },
  _firstTimePay(){
    //第一次支付
    //先
    //下单完成后 拉起支付
    //下单
    var that=this;
    order.place(this.data.productsArr, (res) => {
      //库存不足等情况
      if (res.data.err_code == 30030) {
        wx.showModal({
          title: '提示',
          content: res.data.msg,
          showCancel: false,
          success: function () {
            return;
          }
        })
      }
      //下单成功
      var order_id = res.data.order_id;
      var order_no = res.data.order_no;
      this.data.orderStatus = 1;
      if (order_id && order_no) {
        //假装支付成功
        //改变订单状态
        that.data.id=order_id;
        that._execPay(order_id);
      }else{
        that._orderFail(res);  // 下单失败
      }
    });
  },
  _oneMoreTimePay(){
    wx.showModal({
      title: '提示',
      content: '您已经支付过了，请勿重复支付',
      showCancel: false,
      success: function () {
        return;
      }
    })
  },

  _orderFail: function (res) {
    wx.showModal({
      title: '提示',
      content: res.data.msg,
      showCancel: false,
      success: function () {
        return;
      }
    })

  },

  _execPay(order_id){
    //下单成功了 执行付款操作
    var that=this;
    order.pay(order_id,(res)=>{
      //更新缓存中的 是否有新订单的标志位
      wx.setStorageSync(Order.newOrderFlay, true);
      var statusCode=res.data.statusCode;
      if(statusCode==2){
        that._deleteProductsFromCart();
        var flag = statusCode == 2;
        wx.navigateTo({
          url: '../pay-result/pay-result?id=' + order_id
          + '&flag=' + flag + '&from=order'
        });
      }
    })
  },

  //订单支付成功后，删除购物车已支付的商品
  _deleteProductsFromCart(){
    var localData = cart.getCartInfoFromLocal();
    var left = [];
    if (localData) {
      //剩下的商品
      for (let i = 0; i < localData.length; i++) {
        if (!localData[i].selectStatus) {
          left.push(localData[i]);
        }
      }
    }
    //更新缓存
    wx.setStorageSync(cart.cartKey, left);
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
    if (this.data.id) {
      this._fromOrder(this.data.id);
    }
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