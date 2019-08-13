// pages/goods_list/index.js
import {
  request
} from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        title: "综合",
        isActive: true
      },
      {
        id: 1,
        title: "销量",
        isActive: false
      },
      {
        id: 2,
        title: "价格",
        isActive: false
      }
    ],
    goodsList: []
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  TotalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.QueryParams.cid = options.cid
    console.log(this.getGoodsList())
    this.getGoodsList()
  },
  getGoodsList() {
    request({
      url: '/goods/search',
      data: this.QueryParams 
    }).then(res => {
      // console.log(res)
      // data=this.QueryParams
      this.TotalPages = Math.ceil(res.total / this.QueryParams.pagesize);
      this.setData({
        goodsList: [...this.data.goodsList, ...res.goods]
      })
      wx.stopPullDownRefresh();
    })
  },
  handleTitleChange(e) {
    const {
      index
    } = e.detail;
    let {
      tabs
    } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.QueryParams.pagenum = 1;
    this.setData({
      goodsList: []
    })
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.TotalPages) {
      wx.showToast({
        title: '没有下一页数据了',
        icon: 'none'
      });
    }else{
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})