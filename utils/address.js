import { Base } from "base.js";
class Address extends Base {
  constructor(){
    super();
  }
  getUserAddress(addressInfo) {
    var res = {};
    res.name = addressInfo.name;
    res.mobile = addressInfo.mobile;
    res.totalDetail = addressInfo.province + addressInfo.city + addressInfo.country;
    return res;
  }
  //是否是直辖市
  _isCenterCity(provinceName) {
    var centerCity = ['北京市', '上海市', '重庆市', '天津市'];
    if (centerCity.indexOf(provinceName) > 0) {
      return true;
    }
    return false;
  }
  //更新用户地址
  setUserAddress(addressInfo,callBack){
      var params={
        url:'address',
        data: addressInfo,
        type:'POST',
        sCallBack:function(res){
          callBack&&callBack(true,res);
        },
        eCallBack: function (res) {
          allBack && callBack(false,res);
        }
      };
      this.request(params);
  }
  getUserAddress(callBack){
    var params = {
      url: 'address/user',
      type: 'POST',
      sCallBack: function (res) {
        callBack && callBack(res);
      },
    };
    this.request(params);
  }

}
export {Address};