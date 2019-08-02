//index.js
//获取应用实例
const app = getApp()

Component({
  data: {
    motto: 'Hello World',
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
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})