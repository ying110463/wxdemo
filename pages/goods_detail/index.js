// pages/goods_detail/index.js
import {
  request
} from "../../request/index.js";
import { getStorageCart,setStorageCart  } from "../../utils/storage.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getGoodsDetail(options.goods_id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  getGoodsDetail(goods_id) {
    request({
      url: "/goods/detail",
      data: {
        goods_id
      }
    }).then(result => {
 
      this.GoodsInfo = result
      this.setData({
        goodsObj: {
          goods_name: result.goods_name,
          goods_price: result.goods_price,
          goods_introduce: result.goods_introduce.replace(/\.webp/g, '.jpg'),
          pics: result.pics
        }
      })
    })
  },
  handlePreviewImage(e) {
    const {
      index
    } = e.currentTarget.dataset;
    const urls = this.data.goodsObj.pics.map(v => v.pics_big);
    const current = urls[index];
    wx.previewImage({
      current,
      urls
    });
  },
  handleCartAdd() {
    let cart = getStorageCart() || {}
   
    if (cart[this.GoodsInfo.goods_id] ) {
      cart[this.GoodsInfo.goods_id].num++;
    } else {
      cart[this.GoodsInfo.goods_id] = this.GoodsInfo;
      cart[this.GoodsInfo.goods_id].num=1;
      cart[this.GoodsInfo.goods_id].checked=true;
    }
    setStorageCart(cart)
    wx.showToast({
      title: '添加成功',
      icon: 'none',
      mask: true,
    });

  }
  
 
})