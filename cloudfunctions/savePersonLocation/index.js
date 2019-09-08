// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let userInfo = event;
  userInfo.OPENID = wxContext.OPENID;
  return await db.collection('userInfo').add({
    // data 字段表示需新增的 JSON 数据
    data: userInfo,
    success: function (res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
      return res
    },
    fail: err => {
      return err
    }
  })
}