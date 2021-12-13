// pages/fruitdetail/fruitdetail.js
// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fruit:{
          id:3,
          itemCode:"110022-334453",
          title:"葡萄",
          detail:"臻选应季鲜橙 鲜甜橙子 2.5kg装 单果140-170g 生鲜自营水果",
          stock:"100",
          type:"1",
          price:"10.00",
          status:"1",
          filePath:"http://139.196.192.222/FruitMall/fruitImage/fruit9.JPG"
        },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getFruitDetail(options.fruitid)
  },
  getFruitDetail:function(fruitid){
    var that = this
    wx.request({
      url: app.globalData.requesturl+'/fruit/selectByfruitid', 
      data: {
        fruitid: fruitid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        //console.log(res)
        that.setData({
          fruit:res.data
        })
      }
    })
  },
  tocart:function(){
    wx.switchTab({
      url: '../cart/cart',
    })
  },
  // 客户服务
  toservice:function(){
    wx.navigateTo({
      url: '../service/service',
    })
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})