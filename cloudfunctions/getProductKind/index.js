// 云函数入口文件
const cloud = require('wx-server-sdk')
const _ = require('lodash');
cloud.init()
const db = cloud.database()
// 云函数入口函数

exports.main = async (event, context) => {
  return await db.collection('productGroup').get().then(res => {
    // let resdata = res.data
    let resdata = [];
    let data = {};
    let orderResult = _.sortBy(res.data,'order')
    _.each(orderResult,kind =>{
      data[kind.kindId] = kind.kindName
      // resdata.push(data)
    })
    return data
  })
}