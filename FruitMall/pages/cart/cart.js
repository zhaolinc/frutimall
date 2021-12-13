// pages/cart/cart.js
const app = getApp()
var cart = require('../../utils/cart.js') // 获取购物车操作模块
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageurl:app.globalData.imageurl,
    login:false,
    cartList:[],
    sumPrice:0,
    select:true,
    address:"暂无地址，请点击选择地址",
    addressList:[]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  onShow: function(){
    let openid = wx.getStorageSync('openid')
    if(openid){//用户信息存在
      this.selectDefault(openid)
      this.getAddressList(openid)
      this.setData({
        login:true
      })
      this.getcartList()
    }else{//用户信息不存在
      this.setData({
        login:false
      })
    }
  },
  //跳转登录页面
  tologin: function(){
    wx.switchTab({
      url: '../user/user',
    })
  },
  // 选择地址
  selectAddress: function(){
    let that = this
    let List = new Array()
    let addressList = that.data.addressList
    addressList.forEach(e => {
      List.push(e.province+e.city+e.county+e.address)
    });
    //console.log(itemList)
    wx.showActionSheet({
      itemList: List,
      success (res) {
        //console.log(res)
        //console.log(addressList[res.tapIndex])
        that.setData({
          address:List[res.tapIndex]
        })
      },
      fail (res) {
        console.log(res)
      }
    })
  },
  // 获取地址列表
  getAddressList(openid){
    let that = this
    wx.request({
      url: app.globalData.requesturl+'/address/selectAll', 
      data: {
        openid: openid,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        //console.log(res.data)
        that.setData({
          addressList:res.data
        })
      }
    })
  },
  //获取购物车列表
  getcartList: function(){
    let carts = wx.getStorageSync('carts'||[])
    let flag = true
    let that = this
    //console.log(carts)
    let sum = 0
    if(carts){
      carts.forEach(element => {
        if(element.selected){
          sum = sum + (element.price * element.num)
        }
        if(element.selected==false){
          flag = false
        }
      });
      that.setData({
        cartList: carts,
        sumPrice: sum,
        select:flag
      })
    }else{
      that.setData({
        cartList: [],
        sumPrice: 0,
        select:flag
      })
    }
  },
  // 选择取消
  selected: function(e){
    let fruitid = e.currentTarget.dataset.fruitid
    //console.log(e.currentTarget.dataset.itemcode)
    cart.selected(fruitid)
    this.getcartList()
  },
  // 减少数量
  subNum: function(e){
    let fruitid = e.currentTarget.dataset.fruitid
    cart.subNum(fruitid);
    
    this.getcartList()
  },
  // 增加数量
  addNum: function(e){
    let fruitid = e.currentTarget.dataset.fruitid
    cart.addNum(fruitid);
    this.getcartList();
  },
  // 删除商品
  deleteed: function(e){
    let fruitid = e.currentTarget.dataset.fruitid;
    let that = this;
    wx.showModal({
      title: '提示',
      content: '确认删除商品？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          cart.deleteed(fruitid)
          that.getcartList()
        }
      }
    })
  },
  //获取默认地址
  selectDefault: function(openid){
    let that = this
    wx.request({
      url: app.globalData.requesturl+"/address/selectDefault",
      data: {
        openid: openid,
      },
      method:"GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        that.setData({
          address:res.data.province + res.data.city + res.data.county + res.data.address
        })
      }
    })
  },
  //全选商品
  selectAll: function(){
    //console.log(this.data.select);
    cart.selectAll(this.data.select)
    this.getcartList()
  },
  // 立即结算
  account: function(){
    let that = this
    wx.setStorageSync('flag', true)
    let carts = wx.getStorageSync('carts')
    let openid = wx.getStorageSync('openid')
    wx.showModal({
      title: '确认订单',
      content: '确认付款？',
      success: function (res) {
        if (res.confirm) {//这里是点击了确定以后
          wx.showLoading();
          carts.forEach(e => {
            cart.insert(openid,e.fruitid,2,e.filepath,e.title,e.detail,e.num,e.num*e.price,"暂无评价")
          });
          if(wx.getStorageSync('flag')){
            wx.hideLoading({
              success: (res) => {
                cart.clear()
                //that.getcartList()
                wx.showToast({
                  title: '支付成功',
                  icon:"success",
                  mask:500
                })
              },
            })
          }else{
            wx.hideLoading({
              success: (res) => {
                wx.showToast({
                  title: '支付失败',
                  icon:"error",
                  mask:500
                })
              },
            })
          }
          
        }
      }
    })
  },

})