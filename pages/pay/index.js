// pages/cart/index.js
Page({
  data: {
    address: {},
    cart: {},
    
    totalNum: 0,
    totalPrice: 0,
   
  },
  
  onShow() {
    const address = wx.getStorageSync("address") || {};
    const cart = wx.getStorageSync("cart") || {};
    this.setData({
      address
    });
    this.setCart(cart);
  },
  setCart(cart) {
    let cartArr = Object.values(cart);
    let totalPrice = 0;
    // 3 计算总数量 
    let totalNum = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
    });
  },
  handleOrderPay(){
    const token = wx.getStorageSync("token");
    if(!token){
    wx.navigateTo({
      url: '/pages/auth/index'
      });
        
    }else{
      console.log(222)
    }
  }
  


})