// pages/user/user.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageurl:app.globalData.imageurl,//图片路径
    avatarUrl:"https://begonia.work/FruitMall/userHeadPhoto/default.png", //头像
    nickName:"登录/注册", //昵称
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getUserProfile()
  },
   /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getuser()
  },
  getuser: function(){
    let that = this
    let openid = wx.getStorageSync('openid');
    //console.log(openid)
    if(openid){
      wx.request({
        url: app.globalData.requesturl+'/user/selectByopenid', 
        data: {
          openid: openid,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success (res) {
          if(res.data){
            that.setData({
              avatarUrl:res.data.avatarurl,
              nickName:res.data.nickname
            })
          }
        }
      })
    }else{
      that.setData({
        avatarUrl:"https://begonia.work/FruitMall/userHeadPhoto/default.png", //头像
        nickName:"登录/注册", //昵称
      })
    }
    

  },
  // 获取用户信息
  getUserProfile: function(){
    let openid = wx.getStorageSync('openid')
    let that = this;
    //console.log("openid1-->"+openid)
    if(!openid){
      that.getLogin();//获取openid
      wx.getUserProfile({
        desc: '用于完善用户资料',
        success: (res) => {//用户授权登录
          openid = wx.getStorageSync('openid');
          //console.log("openid2-->"+openid)
          let nickname = res.userInfo.nickName
          let avatarurl = res.userInfo.avatarUrl
          let gender = res.userInfo.gender 
          let country = res.userInfo.country
          let province = res.userInfo.province
          let city = res.userInfo.city
          that.saveuser(openid,nickname,gender,avatarurl,country,province,city);
        }
      })
    }
  },
  // 保存用户信息
  saveuser:function(openid,nickname,gender,avatarurl,country,province,city){
    let that = this
    wx.request({
      url: app.globalData.requesturl+'/user/saveuser', 
      data: {
        openid: openid,
        nickname: nickname,
        gender: gender,
        avatarurl: avatarurl,
        country: country,
        province: province,
        city :city
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success (res) {
        //console.log(res.data)
        if(res.data == 1){
          wx.showToast({
            title: '登陆成功！',
            icon:"success",
            mask:1000
          })
          that.setData({
            avatarUrl:avatarurl,
            nickName:nickname
          })
        }else{
          wx.showToast({
            title: '登陆失败！',
            icon:"none",
            mask:1000
          })
        }
      }
    })
  },
  // 获取登录信息并保存openid
  getLogin: function(){
    wx.login({//获取用户code
      success: function (res) {
        let appid = 'wx5e684bab16b39796';
        let secret = 'bdae182739632b21406d2c11e4abd5a3';
        let code = res.code;
        //console.log(code)
        wx.request({
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code',
          success (res) {
            //console.log(res.data.openid)
            wx.setStorageSync('openid', res.data.openid)
          }
        })
      }
    })//获取用户code 
  },
  // 跳转地址页面
  toAddress:function(){
    if(wx.getStorageSync('openid')){
      wx.navigateTo({
        url: '../address/address',
      })
    }else{
      wx.navigateTo({
        url: '../address/address',
      })
    }
    
  },
  // 跳转订单页面
  toOrder:function(e){
    if(wx.getStorageSync('openid')){
      let type = e.currentTarget.dataset.type
      wx.navigateTo({
        url: '../order/order?type=' + type,
      })
    }else{
      wx.showToast({
        title: '您尚未登录',
        icon:"error",
        mask:1000
      })
    }
    
    
  },
  // 跳转客户服务
  toservice:function(){
    wx.navigateTo({
      url: '../service/service',
    })
  },
  // 退出登录
  logout:function(){
    let that = this
    if(wx.getStorageSync('openid')){
      wx.showModal({
        title: '提示',
        content: '退出登录？',
        success: function (res) {
          if (res.confirm) {//这里是点击了确定以后
            //console.log('用户点击确定')
            wx.setStorageSync('openid', null)
            that.setData({
              avatarUrl:"https://begonia.work/FruitMall/userHeadPhoto/default.png", //头像
              nickName:"登录/注册", //昵称
            })
          }
        }
      })
    }else{
      wx.showToast({
        title: '您尚未登录',
        icon:"error",
        mask:1000
      })
    }
  },
})