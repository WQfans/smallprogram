const app = getApp()

Page({
  data: {
    userInfo:[]
  },
  pageLifetimes: {
  },
  onLoad: function (options) {
    this.getUserLocation()
  },
  chooseAddress() {
    console.log(app.globalData.userInfo)
    let saveUserLocation = this.saveUserLocation;
    let addLocationInfo = this.addLocationInfo;
    wx.chooseAddress({
      success(res) {
        let {
          userName,
          postalCode,
          provinceName,
          cityName,
          countyName,
          detailInfo,
          nationalCode,
          telNumber
        } = res;
        let userInfo = {
          userName,
          postalCode,
          provinceName,
          cityName,
          countyName,
          detailInfo,
          nationalCode,
          telNumber
        }
        addLocationInfo(userInfo)
        saveUserLocation(userInfo)
      }
    })
  },
  getUserLocation() {
    wx.cloud.callFunction({
      name: 'getpersonlocation',
      success: res => {
        console.log(res);
        this.setData({
          userInfo: res.result.data
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  saveUserLocation(userInfo) {
    wx.cloud.callFunction({
      name: 'savePersonLocation', 
      data: userInfo,
      success: res => {
        console.log(res);
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  addLocationInfo(userInfo){
    let allInfo = this.data.userInfo;
    allInfo.push(userInfo);
    this.setData({
      userInfo: allInfo
    })
  }
});