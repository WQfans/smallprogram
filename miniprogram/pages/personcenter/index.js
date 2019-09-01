
const app = getApp()
Page({
  data: {
    height: '600px',
  },
  onLoad: function () {
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
  }
});