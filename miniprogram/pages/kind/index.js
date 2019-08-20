const weuiminiprogram = require('weui-miniprogram');
Page({
  data: {
    selectedIndex: 0,
    scrollKindId: 'kind0',
    scrollMenuId: 'menu0',
    height: '600px',
    kind: [],
    shopCart: {},
    shopCartNum: 0,
    shopMoney: 0,
    productKind: {},
    background: ['./img/1.jpg', './img/2.jpg', './img/3.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    checkFlag: true,
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
    }
  },
  onLoad: function () {
    this.getScreenHeight();
    this.getProducts();
    this.getProductKind();
  },
  observers: {
    'shopCart': function (shopCart) {
      let shopCartNum = 0;
      // shopCart.each((product)=>{
      //   shopCartNum += product
      // })
      console.log(shopCart)
    }
  },
  getProducts: function () {
    wx.cloud.callFunction({
      name: 'getProducts',
      data: {},
      success: res => {
        this.setData({
          kind: res.result
        })
        console.log('products:', res.result)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  getProductKind: function () {
    wx.cloud.callFunction({
      name: 'getProductKind',
      data: {},
      success: res => {
        this.setData({
          productKind: res.result
        })
        console.log('getProductKind:', res.result)
      },
      fail: err => {
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  getScreenHeight() {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight
        })
      }
    })
  },
  switchKind(e) {
    const data = e.currentTarget.dataset;
    this.checkFlag = true;
    this.setData({
      selectedIndex: data.index,
      scrollKindId: 'good' + data.index
    })
  },
  bindscroll(e) {
    if (this.checkFlag) {
      this.checkFlag = false;
      return
    }
    let currentScroll = e.detail.scrollTop - 150;
    let index = this.getCurrentIndex(currentScroll);
    if (currentScroll < 0) {
      index = 0;
    }
    if (index != this.data.selectedIndex) {
      this.setData({
        selectedIndex: index,
        scrollMenuId: `menu${index}`
      })
    }
  },
  //计算滚动的高度来看当前是哪一个定位的
  getCurrentIndex(currentScroll) {
    let currentKindIndex = 0;
    let kind = this.data.kind;
    let originHeight = 0;
    for (let i = 0; i < kind.length; i++) {
      if (currentScroll >= originHeight && currentScroll <= originHeight + 100 * (kind[i].products.length) + 40) {
        break;
      }
      currentKindIndex++;
      originHeight = originHeight + 100 * (kind[i].products.length) + 40;
    }
    return currentKindIndex;
  },
  addProductToCar(e) {
    let addProductId = e.target.dataset.productid
    let price = e.target.dataset.price
    let shopCartData = this.data.shopCart;
    shopCartData[addProductId] = shopCartData[addProductId] ? shopCartData[addProductId] + 1 : 1
    let num = this.getShopCartNum(shopCartData)
    let money = this.getShopMoney(price, 'add')

    this.setData({
      shopCart: shopCartData,
      shopCartNum: num,
      shopMoney: money
    })

  },
  minusProductToCar(e) {
    let addProductId = e.target.dataset.productid;
    let price = e.target.dataset.price
    let shopCartData = this.data.shopCart;
    shopCartData[addProductId] = shopCartData[addProductId] != 0 ? shopCartData[addProductId] - 1 : 0
    let num = this.getShopCartNum(shopCartData)
    let money = this.getShopMoney(price,'minus')
    this.setData({
      shopCart: shopCartData,
      shopCartNum: num,
      shopMoney: money
    })
  },
  getShopCartNum(shopCartData) {
    let total = 0;
    for (var i in shopCartData) {
      total += shopCartData[i]
    }
    return total
  },
  getShopMoney(price,type) {
    let money = this.data.shopMoney;
    if(type == 'add'){
      money += price
    }else{
      money -= price
    }
    return money
  }
})