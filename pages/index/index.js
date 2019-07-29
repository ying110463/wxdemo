//Page Object
import {
  request
} from '../../request/index.js'
Page({
  data: {
    swiperList: [],
    getNavCateList:[],
    getFloorList:[]
  },
  //options(Object)
  onLoad() {
    this.getSwiperList()
    this.getNavCateList()
    this.getFloorList()
  },
  getSwiperList() {
    request({
      url: '/home/swiperdata'

    }).then(result => {
      this.setData({
        swiperList: result
      })
    })


  },
  getNavCateList() {
    request({
      url: '/home/catitems'
    }).then(result => {
      this.setData({
        
        getNavCateList: result
      })
    })


  },
  getFloorList() {
    request({
      url: '/home/floordata'

    }).then(result => {
      this.setData({
        getFloorList: result
      })
    })


  },
  onReady: function () {


  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  },
  onPageScroll: function () {

  },
  //item(index,pagePath,text)
  onTabItemTap: function (item) {

  }
});