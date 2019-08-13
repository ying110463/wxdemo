// pages/cart/index.js
Page({
  data: {
    address: {},
    cart: {},
    isAllChecked: false,
    totalNum: 0,
    totalPrice: 0,
    hasCart: false
  },
  onLoad(options) {},
  handleChooseAddress() {

    wx.getSetting({
      success: (result1) => {
        // console.log(result1)
        const scopeAddress = result1.authSetting['scope.address'];
        if (scopeAddress === true || scopeAddress === undefined) {} else {
          wx.openSetting({
            success: (result3) => {}
          });
        }
        wx.chooseAddress({
          success: (result2) => {
            console.log(result2,22)
            const address = result2
            // 3 把收货地址存入到本地存储中 
            address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo;

            wx.setStorageSync('address', address);

          }

        });
      },
      fail: () => {},
      complete: () => {}
    });

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
    let isAllChecked = cartArr.length ? cartArr.every(v => v.checked) : false;
    let totalPrice = 0;
    // 3 计算总数量 
    let totalNum = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      }
    })
    let hasCart = cartArr.length > 0 ? true : false;
    this.setData({
      cart,
      isAllChecked,
      totalPrice,
      totalNum,
      hasCart
    });
    wx.setStorageSync('cart', cart);
  },
  handleCartCheck(e) {

    const {
      id
    } = e.currentTarget.dataset
    let {
      cart
    } = this.data
    cart[id].checked = !cart[id].checked;
    this.setCart(cart)
  },
  handleAllCheck() {
    let {
      cart,
      isAllChecked
    } = this.data;
    isAllChecked = !isAllChecked
    for (const key in cart) {
      if (cart.hasOwnProperty(key)) {
        cart[key].checked = isAllChecked

      }
    }
    this.setCart(cart)
  },
  handleCartNumEdit(e) {
    console.log(e)
    let {
      id,
      operation
    } = e.currentTarget.dataset
    let {
      cart
    } = this.data
    if (operation === -1 && cart[id].num === 1) {
      wx.showModal({
        title: '提示',
        content: '您确定要删除吗？',
        showCancel: true,
        success: (result) => {
          if (result.confirm) {
            delete cart[id]
            this.setCart(cart)
          }
        }
      })

    } else {
      cart[id].num += operation
      this.setCart(cart)
    }
  },
  handlePay() {
    let {
      address,
      cart
    } = this.data;
    let cartArr = Object.values(cart);
    let hasCheckedCart = cartArr.some(v => v.checked);
    if (!address.userName) {
      wx.showToast({
        title: '您还没有选择收货地址',
        icon: 'none',
        mask: true
      });
    } else if (!hasCheckedCart) {
      wx.showToast({
        title: '您还没有选购商品',
        icon: 'none',
        mask: true
      });
    } else {
      wx.navigateTo({
        url: '/pages/pay/index'
      });

    }

  }


})