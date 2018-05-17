import {Config} from "./config.js";
class Token{
  constructor(){
    this.baseUrl = Config.baseUrl;
  }
  checkToken(callBack) {
    //如果存在 则验证 不存在 则获取
    var token=wx.getStorageSync('token');
    if(!token){
      this.getToken(callBack);
    }else{
      this._checkToken(callBack);
    }
  }
  //验证已经存在的token
  _checkToken(callBack) {
    var that=this;
    //是否存在
    var token = wx.getStorageSync('token');
    wx.request({
      url: this.baseUrl + 'token/token',
      data: { token: token },
      success: function (res) {
        //异步更新token
        if (!res.data.status) {
          that.getToken(callBack);
        }
        callBack && callBack(token);
      }
    })
  }
  //获取token
  getToken(callBack) {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.request({
            url: that.baseUrl+'token/user',
            method:'POST',
            data:{code:res.code},
            success:function(data){
              var token=data.data.token;
              wx.setStorageSync('token', token);
              callBack && callBack(token);
            }
          })
        }
      }
    })
  }
}
export {Token}