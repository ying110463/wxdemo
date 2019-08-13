// pages/auth/index.js
import {
  request
} from "../../request/index.js";
import {
  wxLogin
} from "../../utils/storage";
Page({

  getUserInfo(e) {
    console.log(e)

    const {
      signature,
      iv,
      rawData,
      encryptedData
    } = e.detail;

    let postParams = {
      signature,
      iv,
      rawData,
      encryptedData,

    };
    wxLogin().then(res => {
      const {
        code
      } = res
      const {
        token
      } = request({
        url: "/users/wxlogin",
        data: {
          postParams,
          code
        },
        method: "post"
      })

      wx.setStorageSync("token", token);
      wx.navigateTo({
        detail: 1
      });
    })
    // console.log(token)




  }
})