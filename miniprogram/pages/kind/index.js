const weuiminiprogram = require('weui-miniprogram');
Page({
  data: {
    selectedIndex: 0,
    scrollKindId: 'kind0',
    scrollMenuId: 'menu0',
    height: '400px',
    kind: [{
      title: '基础护理',
      goods: [{
        title: '火山岩泥毛孔清洁倍净多效慕斯面膜 火山泥',
        desc: '蕴含更佳*皮脂吸附力的“济州岛火山岩泥球体复合物”，帮助清洁毛孔及细纹内残留的皮脂及微尘的慕斯状面膜。',
        img: './img/good1.png',
        price: 12
      }]
    }, {
      title: '面膜',
      goods: [{
        title: '火山岩泥毛孔清洁去黑头三步曲护理鼻贴 毛孔清洁三部曲',
        desc: '帮助清除堵塞毛孔的皮脂及黑头的毛孔清洁护理鼻贴。',
        img: './img/good3.png',
        price: 80
      }]
    }, {
      title: '洁面',
      goods: [{
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }]
    }, {
      title: '卸妆',
      goods: [{
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }]
    }, {
      title: '防晒',
      goods: [{
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }]
    }, {
      title: '底妆',
      goods: [{
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }]
    }, {
      title: '彩妆',
      goods: [{
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }]
    }, {
      title: '美甲',
      goods: [{
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }]
    }, {
      title: '护理',
      goods: [{
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }]
    }, {
      title: '男士',
      goods: [{
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }]
    }, {
      title: '工具',
      goods: [{
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }]
    }, {
      title: '优惠套装',
      goods: [{
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }]
    }, {
      title: '限量产品',
      goods: [{
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }, {
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }, {
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }, {
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }, {
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }, {
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }, {
        title: '绿茶润唇膏',
        desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
        img: './img/good2.png',
        price: 12
      }]
    }],
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
  onLoad: function() {
    this.getScreenHeight();
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
      console.log(index)
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
      if (currentScroll >= originHeight && currentScroll <= originHeight + 100 * (kind[i].goods.length) + 40) {
        break;
      }
      currentKindIndex++;
      originHeight = originHeight + 100 * (kind[i].goods.length) + 40;
    }
    return currentKindIndex;
  }
})