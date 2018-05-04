import {Base} from "../../utils/base.js";
class Cart extends Base{
    constructor(){
      super();
      this.cartKey='cart';
    }
    //判断购物车中是否已经有该商品
    /*
    * 根据购物车信息判断加入的商品是否已经在购物车中 如果存在则直接加上相应的数量  如果不存在则添加入购物车
    */
    ifHasThatOne(id){
      var cartInfo=this.getCartInfoFromLocal();
      var index=-1;
      var result={};
      var data={};
      if(cartInfo){
        for (var i = 0; i < cartInfo.length; i++) {
          //已经在购物车中
          if (id == cartInfo[i].id) {
            index = i;
            data = cartInfo[i];
            break;
          }
        }
      }
      result={index:index,data:data};
      return result;
    }
    //从本地缓存中获取购物车信息
    getCartInfoFromLocal(){
      var cartInfo=wx.getStorageSync(this.cartKey);
      if(cartInfo){
        return cartInfo;
      }else{
        return null;
      }
    }
}

export {Cart};