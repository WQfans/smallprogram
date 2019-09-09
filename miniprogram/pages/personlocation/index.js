const app = getApp()

Page({
  data: {
    userInfo:[],
    displayLocation:false,
    height: '500px'
  },
  pageLifetimes: {
  },
  onLoad: function (options) {
    this.getUserLocation();
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
          userInfo: res.result.data,
          displayLocation:true
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
        wx.showToast({
          title: '导入成功',
          icon: 'success',
          duration: 500
        })
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