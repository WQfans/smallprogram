const weuiminiprogram = require('weui-miniprogram');
Component({
  data: {
    selectedIndex:0,
    kind: [{
      title: '基础护理',
    }, {
      title: '面膜',
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
  }
})
