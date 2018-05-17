import {Base} from "../../utils/base.js";
class Order extends Base{
  //下单
  place(productsArr, callback){
    var products=[];
    for(let i=0;i<productsArr.length;i++){
      products.push({ product_id: productsArr[i].id, count:productsArr[i].counts});
    }
    var params={
      url:'order',
      type:'POST',
      data:{products:products},
      sCallBack:function(res){
        callback && callback(res);
      },
      eCallBack:function(error){
        callback && callback(error);
      }
    }
    this.request(params);
  }
  pay(id,callback){
    var params={
      url:'pay/payOrder',
      type:'POST',
      data:{id:id},
      sCallBack: function (res) {
        callback && callback(res);
      },
      eCallBack: function (error) {
        callback && callback(error);
      }
    };
    this.request(params);
  }
  //根据订单id获取订单详情
  getOrderInfoById(id,callback){
    var params={
      url:'order/'+id,
      sCallBack: function (res) {
        callback && callback(res);
      },
      eCallBack: function (error) {
        callback && callback(error);
      }
    };
    this.request(params);
  }
  //获取订单中的商品详情
  //商品id 商品数量
  getproductsInOrder(id,callBack ) {
    var params={
      url:'order/products/'+id,
      sCallBack:function(res){
        callBack && callBack(res);
      }
    };
    this.request(params);
  }
  //获取所有订单列表
  //page 第几页
  getAllOrders(page,callBack){
    var params={
      url:'order/user?page='+page,
      sCallBack:function(res){
        callBack&&callBack(res);
      },
      eCallBack: function (error) {
        callback && callback(error);
      }
    };
    this.request(params);
  }
 
}
Order.newOrderFlay ='hasNewOrders';
export {Order};