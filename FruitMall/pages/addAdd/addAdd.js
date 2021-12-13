// pages/addAdd/addAdd.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    region: ['北京市', '北京市', '东城区'],
    gender:1,
    switchChecked: false,
  },
  bindFormSubmit: function(e) {
    let name = e.detail.value.name          //收货人
    let phone = e.detail.value.phone        //电话号码
    let gender = this.data.gender           //性别
    let province = this.data.region[0]      //省
    let city = this.data.region[1]          //市
    let county = this.data.region[2]        //县
    let address = e.detail.value.adddetail  //详细地址
    let switchChecked = this.data.switchChecked
    this.tips(name,phone,gender,province,city,county,address,switchChecked)


  },
  switchChange(e){
    console.log(e.detail.value)
  },
  bindRegionChange: function (e) {
    //console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value,
      address: e.detail.value[0]+e.detail.value[1]+e.detail.value[2]
    })
  },
  radioChange(e) {
    //console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      gender:e.detail.value
    })
  },
  tips(name,phone,gender,province,city,county,address,switchChecked){
    let that = this
    if(name==''){
      wx.showToast({
        title: '请填写收货人姓名',
        icon:'none',
        mask:300
      })
    }else if(phone==''){
      wx.showToast({
        title: '请填写联系电话',
        icon:'none',
        mask:300
      })
    }else if(province==''){
      wx.showToast({
        title: '请填写所在地区',
        icon:'none',
        mask:300
      })
    }else if(address==''){
      wx.showToast({
        title: '请填写详细地址',
        icon:'none',
        mask:300
      })
    }else{
      that.saveAddress(name,phone,gender,province,city,county,address,switchChecked);
    }
  },
  saveAddress(name,phone,gender,province,city,county,address,switchChecked){
    let openid = wx.getStorageSync('openid')
    let type = 0;
    if(switchChecked){
      type = 1;
    }
    wx.request({
      url: app.globalData.requesturl+'/address/saveAddress', //本地服务器地址
      data:{
        openid:openid,
        type:type,
        name:name,
        phone:phone,
        province:province,
        city:city,
        county:county,
        address:address,
        gender:gender,
      },
      method:'GET',
      header:{
     'content-type':
     'application/json' //默认值
      },
      success:function(res){
        if(res.data==1){
          wx.showToast({
            title: '保存成功',
            icon:'success',
            duration:1000//时间
          })
        }else{
          wx.showToast({
            title: '保存失败',
            icon:'error',
            duration:1000//时间
          })
        }
      
      }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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