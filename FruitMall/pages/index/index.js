// index.js
const app = getApp()  // 获取应用实例
var cart = require('../../utils/cart.js') // 获取购物车操作模块
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageurl:app.globalData.imageurl,
    lowfruitList:[],
    indexList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.lowfruitList()
    this.indexList()
  },
  toDetail:function(e){
    let fruitid = e.currentTarget.dataset.fruitid
    //console.log(fruitid)
    wx.navigateTo({
      url: '../fruitdetail/fruitdetail?fruitid='+fruitid,
    })
  },
  toClassify:function(e){
    let currentTab = e.currentTarget.dataset.id
    //console.log(currentTab)
    wx.switchTab({
      url: '../classify/classify',
      success(res){
        //console.log(res)
        getApp().globalData.currentTab = currentTab
      }
    })
  },
  lowfruitList:function(){
    var that = this
    wx.request({
      url: app.globalData.requesturl+"/fruit/lowPrice",
      method:"POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        that.setData({
          lowfruitList:res.data
        })
        //console.log(res.data)
      }
    })
  },
  indexList:function(){
    var that = this
    wx.request({
      url: app.globalData.requesturl+"/fruit/viewnum",
      method:"POST",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        that.setData({
          indexList:res.data
        })
        //console.log(res.data)
      }
    })
  },

  //加入购物车
  addtoCart:function(e){
    let fruit = e.currentTarget.dataset.item
    cart.addCart(fruit)
    //console.log(fruit)
  },
})
