//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    menu: [{
      icon: './img/tags-fill.png',
      title: '人气新品',
    }, {
      icon: './img/pushpin-fill.png',
      title: '本周特惠'
    }, {
      icon: './img/fire-fill.png',
      title: '热卖产品'
    }, {
      icon: './img/money-collect-fill.png',
      title: '组合优惠'
    }],
    advertisement: [{
      img: './img/advertisement1.png'
    }, {
      img: './img/advertisement2.jpg'
    }, {
      img: './img/advertisement3.png'
    }],
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
    this.getOpenid();
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  getOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.navigateTo({
          url: '../personcenter/index',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
})