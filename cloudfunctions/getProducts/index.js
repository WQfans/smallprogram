// 云函数入口文件
const cloud = require('wx-server-sdk')
const _ = require('lodash');
cloud.init()
const db = cloud.database()
// 云函数入口函数

exports.main = async (event, context) => {
  return await db.collection('product').get().then(res =>{
    let groupdata = _.groupBy(res.data,'productKind')
    return groupdata
  })
}