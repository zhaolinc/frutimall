// pages/order/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nav_item:0,
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //console.log(options.type)
    this.getOrderList(options.type)
    if(options.type>0&&options.type<5){
      this.setData({
        nav_item:options.type
      })
    }else{
      this.setData({
        nav_item:0
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  changeNav(e){
    let nav = e.currentTarget.dataset.nav
    this.setData({
      nav_item:nav
    })
    if(nav>0&&nav<=4){
      this.getOrderList(nav)
    }else{
      this.getOrderList('')
    }
  },
  getOrderList(type){
    let that = this
    let openid = wx.getStorageSync('openid')
    wx.request({
      url: app.globalData.requesturl+'/order/selectAll', //本地服务器地址
      data:{
        openid:openid,
        type:type||'',
      },
      method:'GET',
      header:{
     'content-type':
     'application/json' //默认值
      },
      success:function(res){
        //console.log(res.data)
        that.setData({
          orderList: res.data
        })
      }

      })
  },
  orderbtn(e){
    let that = this
    let type = e.currentTarget.dataset.type
    let orderid = e.currentTarget.dataset.orderid
    if(type==1){
      wx.showModal({
        title: '提示',
        content: '确认付款？',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.requesturl+'/order/update', //本地服务器地址
              data:{
                orderid:orderid,
                type:type,
              },
              method:'GET',
              header:{
             'content-type':
             'application/json' //默认值
              },
              success:function(res){
                that.getOrderList(type)
              }
        
              })
          }
        }
      })
    }else if(type == 3){
      wx.showModal({
        title: '提示',
        content: '确认收货？',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.requesturl+'/order/update', //本地服务器地址
              data:{
                orderid:orderid,
                type:type,
              },
              method:'GET',
              header:{
             'content-type':
             'application/json' //默认值
              },
              success:function(res){
                that.getOrderList(type)
              }
        
              })
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '确认评价？',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.requesturl+'/order/update', //本地服务器地址
              data:{
                orderid:orderid,
                type:type,
              },
              method:'GET',
              header:{
             'content-type':
             'application/json' //默认值
              },
              success:function(res){
                that.getOrderList(type)
              }
        
              })
          }
        }
      })
    }
  }
})