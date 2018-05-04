import {Base} from "../../utils/base.js";

class Theme extends Base{
  getThemeById(id,callBack){
    var params={
      'url':'theme/'+id,
      sCallBack:function(res){
        callBack&&callBack(res);
      }
    };
    this.request(params);
  }
}

export {Theme};