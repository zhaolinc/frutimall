// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    wx.setStorageSync('logs', logs)
  },
  //全局数据
  globalData: {
    //图片路径
    imageurl:'https://begonia.work/FruitMall',
    //服务器请求路径
    requesturl:'https://begonia.work:9090',
    //本地请求
    //requesturl:'http://localhost:9090',
    //用户信息
    userInfo: null,
    //跳转参数
    currentTab:0
  }
})
