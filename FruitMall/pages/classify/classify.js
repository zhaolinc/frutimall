// pages/classify/classify.js
const app = getApp()
var cart = require('../../utils/cart.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageurl:app.globalData.imageurl,//图片地址
    flag:0,
    currentTab: 0,//导航栏切换
    fruitList:[],//水果列表
    // fruit:{
    //   id:3,
    //   itemCode:"110022-334453",
    //   title:"葡萄",
    //   detail:"臻选应季鲜橙 鲜甜橙子 2.5kg装 单果140-170g 生鲜自营水果",
    //   stock:"100",
    //   type:"1",
    //   price:"10.00",
    //   status:"1",
    //   filePath:"http://139.196.192.222/FruitMall/fruitImage/fruit9.JPG"
    // }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let id = app.globalData.currentTab
    //console.log(id)
    this.setData({
      currentTab:id
    })
    this.getFruitList(this.data.currentTab)
  },
  //分类切换
  switchNav: function(e) {
    //console.log(e.target.id) 
    if (this.data.currentTab != e.target.id) {
      this.setData({
        currentTab: e.target.id
      });
      this.getFruitList(this.data.currentTab)
    }
  },
  //获取水果列表
  getFruitList:function(id){
    var that = this
    let url = app.globalData.requesturl + "/fruit/fruitClassify"
    wx.request({
      url: url,
      data: {
        type: id,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        that.setData({
          fruitList:res.data
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
  //跳转详情页
  toDetail:function(e){
    var fruitid = e.currentTarget.dataset.fruitid
    //console.log(itemCode)
    wx.navigateTo({
      url: '../fruitdetail/fruitdetail?fruitid='+fruitid,
    })
  }
})