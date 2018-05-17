import {Base} from "../../utils/base.js";
import {Cart} from "../cart/cart-model.js";
var cart = new Cart;

class Product extends Base{
  getProductById(id,callBack){
    var params={
      'url':'product/'+id,
      sCallBack:function(res){
        callBack&&callBack(res);
      }
    };
    this.request(params);
  }
  
  //加入购物车
  /*
  * id 商品id
  * item : 商品信息
  */
  addToCart(counts,item){
    //要加入到缓存中的信息
    var keyName=['id','name','main_img_url','price'];
    var key=cart.cartKey;
    var id=item.id;
    //购物车中是否有该商品的标识
    var flag=cart.ifHasThatOne(id);
    //没有 则直接加入购物车(缓存)
    //要加入购物车的商品信息
    //默认选中状态
    var productInfo = {'selectStatus':1};
    //本地购物车缓存信息
    var localCart=wx.getStorageSync(key);
    if(!localCart){
      localCart=[];
    }
    // console.log(keyName.length);
    // debugger;
    for (let i = 0; i < keyName.length; i++) {
      var name = keyName[i]; 
       productInfo[name] = item[name];
    }
    if(flag.index==-1){
      productInfo.counts = counts;
      localCart.push(productInfo);
    }else{
      //购物车中已经有该商品
      var index=flag.index;
      productInfo.counts = counts+flag.data.counts;
      localCart[index] = productInfo;
      //console.log(localCart);
    }

    wx.setStorageSync(key, localCart);
    // return productInfo.counts;
   }
  //获取缓存中所有商品的数量
  getTotal() {
    var totalRes=cart.getCartInfoFromLocal();
    var total=0;
    if(!totalRes){
      return total;
    }
    for(var i=0;i<totalRes.length;i++){
      total+=totalRes[i].counts;
    }
    return total;
  }
}


export {Product};