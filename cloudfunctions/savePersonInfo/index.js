// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const { OPENID } = cloud.getWXContext()

exports.main = async (event, context) => {
  console.log(OPENID,event)
  let userInfo = event;
  userInfo.OPENID = OPENID;
  return await db.collection('userInfo').add({
    // data 字段表示需新增的 JSON 数据
    data: userInfo,
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    },
    fail: err => {
    }
  })
}