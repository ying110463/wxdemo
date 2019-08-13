
export const setStorageCart = (obj) => {
  wx.setStorageSync("cart", obj);
}
/**
 * 获取购物车数据
 */
export const getStorageCart = () => {
  return wx.getStorageSync("cart");
}

export const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 10000,
      success: (result) => {
        resolve(result);
      
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
}
