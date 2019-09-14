const app = getApp()

Page({
  data: {
    userInfo:[],
    displayLocation:false,
    height: '500px',
    calcScrollLeft:{},
    delDialogShow:false,
    buttons: [{ text: '取消' }, { text: '确定' }],
  },
  pageLifetimes: {
  },
  onLoad: function (options) {
    this.getUserLocation();
    this.getScreenHeight();
  },
  refreshLocation(e){
    let calcScrollLeft = {...this.data.calcScrollLeft}
    calcScrollLeft[e.currentTarget.dataset.index] = '0'
    this.setData({
      calcScrollLeft: calcScrollLeft
    })
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
  },
  delLocation(e){
    console.log(e)
    wx.cloud.callFunction({
      name: 'delpersonLocation',
      data:{
        id: e.currentTarget.dataset.id
      },
      success: res => {
        console.log(res);
        let newUserInfo = [];
        let userInfo = this.data.userInfo;
        for (let i = 0; i < userInfo.length;i++){
          if (userInfo._id != e.currentTarget.dataset.id){
            newUserInfo.push(userInfo[i])
          }
        }
        this.setData({
          userInfo:newUserInfo
        })
      },
      fail: err => {
        console.log(err)
      }
    })
  },
  delDialogOnShow: function () {
    this.setData({
      delDialogShow: true
    })
  },
  tapDelDialogButton(e){
    this.setData({
      delDialogShow:false
    })
    if(e.detail.index==1){
      this.delLocation(e)
    }
  }
});