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
}
export {Address};