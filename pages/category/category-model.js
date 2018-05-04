import {Base} from "../../utils/base.js";
class Category extends Base{
  //获取所有分类哦
  getAllCategory(callBack){
    var params={
       url:'category/all',
       sCallBack:function(res){
         callBack&&callBack(res);
       }
      }
    this.request(params); 
    }
  //获取某个分类
  getProducts(id,callBack) {
    var params = {
      url: 'category/'+id,
      sCallBack: function (res) {
        callBack && callBack(res);
      }
    }
    this.request(params);
  }
  
}
export {Category};
