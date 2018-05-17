import {Config} from './config.js';
import {Token} from './token.js';
class Base{
  constructor(){
    this.baseUrl=Config.baseUrl;
    //请求次数
    this.requestNum=0;
    //5次
    this.maxRequest=4;
  }
  //封装wx.request方法
  request(params,noRefetch){
    var that = this;
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
        //请求失败 token失效
        if(res.statusCode=='401'){
            that.requestNum+=1;
            if (!noRefetch){
              that._refetch(params, that.requestNum);
            }else{
              params.eCallBack && params.eCallBack(res.data);
            }
        }else{
          params.sCallBack && params.sCallBack(res);
        }
      },
      fail:function(error){
        params.eCallBack && params.eCallBack(error);
      }
    })
  }
  getDataByKey(event,key){
    return event.target.dataset[key];
  }
  _refetch(params,requestNum){
    var token=new Token;
    token.getToken((res)=>{
      //如果请求次数大于规定的次数则不再重新获取
      if(requestNum>this.maxRequest){
        this.request(params, true);
      }else{
        this.request(params);
      }
    });
  }
}
export {Base};