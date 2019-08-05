const weuiminiprogram = require('weui-miniprogram');
Page({
  data: {
    selectedIndex: 0,
    height: '400px',
    kind: [{
      title: '基础护理',
    }, {
      title: '面膜',
    }, {
      title: '洁面',
    }, {
      title: '卸妆',
    }, {
      title: '防晒',
    }, {
      title: '底妆',
    }, {
      title: '彩妆',
    }, {
      title: '美甲',
    }, {
      title: '护理',
    }, {
      title: '男士',
    }, {
      title: '工具',
    }, {
      title: '优惠套装',
    }, {
      title: '限量产品',
    }]
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
  },
  getScreenHeight() {
    wx.getSystemInfo({
      success: res => {
        console.log(res.windowHeight)
        this.setData({
          height: res.windowHeight -48 + 'px'
        })
      }
    })
  },

  switchKind(e) {
    const data = e.currentTarget.dataset
    this.setData({
      selectedIndex: data.index
    })
  }
})
