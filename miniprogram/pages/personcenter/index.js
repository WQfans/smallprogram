
const app = getApp()
Page({
  data: {
    userInfo: {},
    menu: [{
      title: '我的订单',
      icon: './img/copy.png'
    }, {
      title: '收货地址',
      icon: './img/location_fill.png'
    }, {
      title: '我的资料',
      icon: './img/people_fill.png'
    }, {
      title: '送他心意',
      icon: './img/present_fill.png'
    }, {
      title: '我的商城',
      icon: './img/shop_fill.png'
    }, {
      title: '企业采购',
      icon: './img/qi.png'
    }, {
      title: '帮助中心',
      icon: './img/ask.png'
    }, {
      title: '关于',
      icon: './img/about.png'
    }],
    height: '600px',
    hasUserInfo: false,
  },
  onLoad: function () {
    this.getScreenHeight();
    // 获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      console.log(app.globalData.userInfo)
    } else {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(res.userInfo)
      }
    }
  },
  getScreenHeight() {
    wx.getSystemInfo({
      success: res => {
        this.setData({
          height: res.windowHeight
        })
      }
    })
  }
});