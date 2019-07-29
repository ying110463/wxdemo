import {
  request
} from '../../request/index.js'

Page({

  data: {
    leftMenuList: []
  },
  onLoad() {
    
    this.getCategoryList()
  },
  getCategoryList() {
    request({
      url: '/categories'
    }).then(result => {
    
    })
  }
})