const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
exports.main = async (event, context) => {
  return await db.collection('todos').where({
    _id: 'todo1' // 填入当前用户 openid
  }).get()
}
