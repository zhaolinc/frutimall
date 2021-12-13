const app = getApp()
//加入购物车
function addCart(fruit){
  //获取存储中的购物车列表
  let carts = wx.getStorageSync('carts') || [];
  //查找购物车中fruit的itemCode是否存在
  let index = carts.findIndex(v=>v.fruitid===fruit.fruitid)
  if(index ===-1){            //购物车列表中没有此水果
    fruit.num = 1;            //添加一个数量属性
    fruit.selected = true;    //添加一个勾选属性
    carts.unshift(fruit);     //将商品加入购物车
    wx.setStorageSync('carts', carts)//保存到本地缓存
  }else{//购物车列表中有此水果
    carts[index].num++;       //数量加1
    wx.setStorageSync('carts', carts)//保存到本地缓存
  }
  wx.showToast({
    title: '加入成功',
    icon:'success',
    mask:500,
  })
  //console.log(carts)
}
//增加商品数量
function addNum(fruitid){
  //获取存储中的购物车列表
  let carts = wx.getStorageSync('carts') || [];
  //查找购物车中fruit的itemCode是否存在
  let index = carts.findIndex(v=>v.fruitid===fruitid);
  carts[index].num++;
  wx.setStorageSync('carts', carts)//保存到本地缓存
}

//减少商品数量
function subNum(fruitid){
  //获取存储中的购物车列表
  let carts = wx.getStorageSync('carts') || [];
  //查找购物车中fruit的itemCode是否存在
  let index = carts.findIndex(v=>v.fruitid===fruitid);
  if(carts[index].num>1){
    carts[index].num--;
    wx.setStorageSync('carts', carts)//保存到本地缓存
  }else{
    wx.showToast({
      title: '宝贝数量不能再减少了',
      icon:"none",
      mask:500
    })
  }
}

//选中商品
function selected(fruitid){
  //获取存储中的购物车列表
  let carts = wx.getStorageSync('carts') || [];
  let index = carts.findIndex(v=>v.fruitid===fruitid)
  if(carts[index].selected==true){
    carts[index].selected = !(carts[index].selected)
  }else{
    carts[index].selected = !(carts[index].selected)
  }
  wx.setStorageSync('carts', carts)//保存到本地缓存
}

//删除商品
function deleteed(fruitid){
  //获取存储中的购物车列表
  let carts = wx.getStorageSync('carts') || [];
  //查找购物车中fruit的itemCode是否存在
  let index = carts.findIndex(v=>v.fruitid===fruitid);
  carts.splice(index,1);
  wx.setStorageSync('carts', carts)//保存到本地缓存
}

//全选商品
function selectAll(bol){
  //获取存储中的购物车列表
  let carts = wx.getStorageSync('carts') || [];
  if(bol){
    carts.forEach(element => {
      element.selected = true
    });
  }else{
    carts.forEach(element => {
      element.selected = false
    });
  }
  wx.setStorageSync('carts', carts)//保存到本地缓存
}

//清空购物车
function clear(){
  wx.setStorageSync('carts', null);
}

function insert(openid,fruitid,type,filepath,title,detail,num,sumprice,evaluation){
  wx.request({
    url: app.globalData.requesturl+'/order/insert', //本地服务器地址
    data:{
      openid:openid,
      fruitid:fruitid,
      type:type,
      filepath:filepath,
      fruitTitle:title,
      fruitDetail:detail,
      num:num,
      sumprice:sumprice,
      evaluation:evaluation
    },
    method:'GET',
    header:{
   'content-type':
   'application/json' //默认值
    },
    success:function(res){
      if(res.data!=1){
        wx.setStorageSync('flag', false)
      }
    }
    })

}

module.exports = {
  addCart,//加入购物车
  addNum, //增加商品数量
  subNum, //减少商品数量
  selected,//选择取消
  deleteed,//删除商品
  selectAll,//全选商品
  insert,
  clear
}
