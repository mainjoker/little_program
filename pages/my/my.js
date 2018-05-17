// pages/my/my.js
import {My} from './my-model.js';
import { Address } from '../../utils/address.js';
import {Order} from '../order/order-model.js';
var my=new My;
var address=new Address;
var order=new Order;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressInfo:null,
    pageNo:1,
    //是否全部加载完成 用于订单分页
    isLoadAll:false,
    orderArr:[],//订单列表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getUserAddress();
    this.showOrderList();  
  },
  editAddress:function(){
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
        address.setUserAddress(addressInfo, (flag, res) => {
          if (flag) {
            addressInfo.id = res.data.id;
            that.setData({ addressInfo: addressInfo });
          } else {
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
  //获取用户默认地址
  _getUserAddress() {
    //获取用户默认地址
    address.getUserAddress((res) => {
      // console.log('用户默认地址');
      // console.log(res.data);
      this.data.addressInfo = res.data;
      this.setData({
        addressInfo: this.data.addressInfo,
      })
    })
  },
  //获取订单详情 跳转订单详情页面
  showOrderDetailInfo:function(event){
    var id=event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order/order?id='+id+'&from=order',
    })
  },
  //订单列表
  showOrderList:function(){
    console.log('showlist');
    var that=this;
    var page=this.data.pageNo;
    if(page==1){
      //重新加载订单的时候 初始化
      this.data.orderArr=[];
    }
    order.getAllOrders(page,(res)=>{
      // console.log('page:'+this.data.pageNo);
      // console.log(res);
      if(res.data.length>0){
        this.data.orderArr = this.data.orderArr.concat(res.data);
        that.setData({
          orderArr: this.data.orderArr
        })
      }else{
        this.data.isLoadAll=true;
      }   
    })
  },
  // 每次拉到自动则自动加载更多
  onReachBottom:function(){
    console.log('onbottom');
    console.log('flag:'+wx.getStorageSync(Order.newOrderFlay));
    this.data.pageNo++;
    if(!this.data.isLoadAll){
        this.showOrderList();
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
    //避免每次切换本页面的时候都要重新加载订单
    //当有新订单的时候才重新加载
    var flag = wx.getStorageSync(Order.newOrderFlay) == true;
    if(flag){
      this.data.pageNo=1;
      this.showOrderList();
      wx.setStorageSync(Order.newOrderFlay, false);
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})