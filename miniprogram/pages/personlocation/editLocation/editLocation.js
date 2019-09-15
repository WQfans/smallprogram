Page({
  data: {
    text: "This is page data."
  },
  onLoad: function (options) {
    // 页面创建时执行
    wx.setBackgroundColor({
      backgroundColor: '#000', // 窗口的背景色为白色
    })
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
})