import {
  request
} from '../../request/index.js'

Page({

  data: {
    leftMenuList: [],
    rightGoodsList: [],
    currentIndex: 0,
    scrollTop:0

  },
  Cates: [],
  onLoad() {
    let cates = wx.getStorageSync('cates');
    if (!cates) {
      this.getCategoryList()
    } else {
      if (Date.now() - cates.time >= 1000 * 20) {
        this.getCategoryList()
      } else {
        this.Cates = cates.data;
        const leftMenuList = this.Cates.map((v, i) => ({
          cat_name: v.cat_name,
          cat_id: v.cat_id
        }))
        let rightGoodsList = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightGoodsList,
        
        })
      }
    }



  },
  getCategoryList() {
    request({
      url: '/categories'
    }).then(result => {
      this.Cates = result
      wx.setStorageSync("cates", {
        time: Date.now(),
        data: this.Cates
      });
      const leftMenuList = this.Cates.map((v, i) => ({
        cat_name: v.cat_name,
        cat_id: v.cat_id
      }))
      let rightGoodsList = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightGoodsList,
       
      })
    })
  },

  handIndex(e) {
    const {
      index
    } = e.currentTarget.dataset

    let rightGoodsList = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightGoodsList,
      scrollTop: 0
    })
  }
})