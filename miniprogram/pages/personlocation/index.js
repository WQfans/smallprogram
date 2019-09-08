const app = getApp()

Page({
  chooseAddress(){
    console.log(app.globalData.userInfo)
    let saveUserInfo = this.saveUserInfo;
    wx.chooseAddress({
      success(res) {
        console.log(res.userName)
        console.log(res.postalCode)
        console.log(res.provinceName)
        console.log(res.cityName)
        console.log(res.countyName)
        console.log(res.detailInfo)
        console.log(res.nationalCode)
        console.log(res.telNumber)
        let { userName, postalCode, provinceName, cityName, countyName, detailInfo, nationalCode, telNumber} = res;
        let userInfo = { userName, postalCode, provinceName, cityName, countyName, detailInfo, nationalCode, telNumber }
        saveUserInfo(userInfo)
      }
    })
  },
  saveUserInfo(userInfo){
    wx.cloud.callFunction({
      name: 'savePersonInfo',
      data: userInfo,
      success: res => {
      },
      fail: err => {
      }
    })
  },
});