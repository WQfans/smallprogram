const app = getApp()

Page({
  data: {
    userInfo:[],
    displayLocation:false,
    height: '500px',
    calcScrollLeft:{},
    delDialogShow:false,
    currentId:'',
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
  delLocation(id){
    wx.cloud.callFunction({
      name: 'delpersonLocation',
      data:{
        id: id
      },
      success: res => {
        console.log(id)
        let newUserInfo = [];
        let userInfo = this.data.userInfo;
        for (let i = 0; i < userInfo.length;i++){
          if (userInfo[i]._id != id){
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
  delDialogOnShow(e) {
    console.log(e)
    this.setData({
      delDialogShow: true,
      currentId: e.currentTarget.dataset.id
    })
  },
  tapDelDialogButton(e){
    console.log(e)
    this.setData({
      delDialogShow:false
    })
    if(e.detail.index==1){
      let id = this.data.currentId
      this.delLocation(id)
    }
  },
  jumpToEditLocation(){
    wx.navigateTo({
      url: './editLocation/editLocation',
    })
  }
});