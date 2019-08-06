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
    }],
    goods: [{
      title: '火山岩泥毛孔清洁倍净多效慕斯面膜 火山泥',
      desc: '蕴含更佳*皮脂吸附力的“济州岛火山岩泥球体复合物”，帮助清洁毛孔及细纹内残留的皮脂及微尘的慕斯状面膜。',
      img: './img/good1.png',
      price: 12
    }, {
      title: '火山岩泥毛孔清洁去黑头三步曲护理鼻贴 毛孔清洁三部曲',
      desc: '帮助清除堵塞毛孔的皮脂及黑头的毛孔清洁护理鼻贴。',
      img: './img/good3.png',
      price: 80
    }, {
      title: '绿茶润唇膏',
      desc: '蕴含济州绿茶成分，呵护滋养双唇的润唇膏膜。',
      img: './img/good2.png',
      price: 12
    }],
    background: ['./img/1.jpg', './img/2.jpg', './img/3.jpg'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: false,
    interval: 2000,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0
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
    this.getGoods();

  },
  getGoods: function() {
    let goods = []
    for(let i=0;i<5;i++){
      goods = goods.concat(this.data.goods)
    }
    this.setData({
      goods: goods
    })
  },
  getScreenHeight() {
    wx.getSystemInfo({
      success: res => {
        console.log(res.windowHeight)
        this.setData({
          height: res.windowHeight - 48 + 'px'
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