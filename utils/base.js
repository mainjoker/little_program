import {Config} from './config.js';
class Base{
  constructor(){
    this.baseUrl=Config.baseUrl;
    this.tokenStatus=false;
  }
  //封装wx.request方法
  request(params){
    var url=this.baseUrl+params.url;
    if(!params.type){
      params.type='GET';
    }
    wx.request({
      url: url,
      method:params.type,
      data:params.data,
      header:{
        'token':wx.getStorageSync('token'),
        'content-type':'application/json'
      },
      success:function(res){
        params.sCallBack&&params.sCallBack(res);
      },
      fail:function(error){
        params.eCallBack && params.eCallBack(error);
      }
    })
  }
  getDataByKey(event,key){
    return event.target.dataset[key];
  }
  //验证token
  checkToken(callBack){
    var that=this;
    //是否存在
    var token=wx.getStorageSync('token');
    if (!token) {
      this.getToken(callBack);
    } 
    wx.request({
      url: this.baseUrl+'token/token',
      data:{token:token},
      success:function(res){
        if(res.data.status==true){
          that.tokenStatus=true;
        }
        //异步更新token
        if (that.tokenStatus==false){
          that.getToken(callBack);
        }
      }
    })
  }
  //获取token
  getToken(callBack){
    var that=this;
    wx.login({
      success: function (res) {
        if (res.code) {
          var params = {
            url: 'token/user',
            type: 'POST',
            data: { code: res.code },
            sCallBack: function (res) {
              callBack && callBack(res)
            },
            eCallBack: function (res) {
              callBack && callBack(res)
            }
          };
          that.request(params);
        }
      }
    })
  }

}
export {Base};