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
    vipInfo: {},
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
  onLoad: function() {
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
    this.getOpenid();
    this.getVipInfo();
  },
  getOpenid: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result)
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
  getVipInfo:function() {
    wx.cloud.callFunction({
      name: 'getVipInfo',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result)
        this.setData({
          vipInfo: res.result.data[0].vipInfo
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
  clickMenu: (e) => {
    console.log(e.currentTarget.dataset.menu);
    wx.navigateTo({
      url: '../link/newProduct',
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        // res.eventChannel.emit('acceptDataFromOpenerPage', {
        //   data: 'test'
        // })
      }
    })
  }
})