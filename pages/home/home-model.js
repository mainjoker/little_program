import {Base} from '../../utils/base.js';
//var base=new Base;
class Home extends Base{


  getBannerData(id,callBack){
    var params = {
      url: 'banner/' + id,
      sCallBack: function (res) {
        callBack && callBack(res.data);
      }
    };
    this.request(params);
  }
  getThemesAll(callBack){
      var params={
        'url':'theme/all',
        sCallBack:function(res){
          callBack&&callBack(res.data);
        }
      }
      this.request(params);
  }
  getRecentProducts(callBack){
    var params={
      'url':'product/recent',
      sCallBack:function(res){
        callBack&&callBack(res);
      }
    }
    this.request(params);
  }

}

export {Home};