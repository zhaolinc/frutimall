// pages/address/address.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageurl:app.globalData.imageurl,//图片路径
    addressList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.selectAll()
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

  selectAll: function(){
    let that = this
    let openid = wx.getStorageSync('openid')
    wx.request({
      url: app.globalData.requesturl+'/address/selectAll', //本地服务器地址
      data:{
        openid:openid
      },
      method:'GET',
      header:{'content-type':'application/json'}, //默认值
      success:function(res){
        //console.log(res.data)
        that.setData({
          addressList: res.data
        })
      }
      })
  },
  toAdd: function(){
    wx.navigateTo({
      url: '../addAdd/addAdd',
    })
  },
  toUpdate: function(){
    wx.navigateTo({
      url: '../updateAdd/updateAdd',
    })
  },
})