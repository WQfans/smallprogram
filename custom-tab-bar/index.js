Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/index/index/index",
      iconPath: "/image/icon_component.png",
      selectedIconPath: "/image/icon_component_HL.png",
      text: "首页"
    }, {
        pagePath: "/index/activity/index",
      iconPath: "/image/icon_API.png",
      selectedIconPath: "/image/icon_API_HL.png",
      text: "活动"
      }, {
        pagePath: "/index/shop/index",
        iconPath: "/image/icon_component.png",
        selectedIconPath: "/image/icon_component_HL.png",
        text: "商城"
      }, , {
        pagePath: "/index/personcenter/index",
        iconPath: "/image/icon_component.png",
        selectedIconPath: "/image/icon_component_HL.png",
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