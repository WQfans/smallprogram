Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/index/index/index",
      iconPath: "/image/shouye.png",
      selectedIconPath: "/image/shouye-2.png",
      text: "首页"
    }, {
        pagePath: "/index/kind/index",
      iconPath: "/image/fenlei.png",
      selectedIconPath: "/image/fenlei-2.png",
      text: "分类"
      }, {
        pagePath: "/index/shop/index",
        iconPath: "/image/dingdan.png",
        selectedIconPath: "/image/dingdan-2.png",
        text: "商城"
      }, , {
        pagePath: "/index/personcenter/index",
        iconPath: "/image/wode.png",
        selectedIconPath: "/image/wode-2.png",
        text: "个人中心"
      },]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})