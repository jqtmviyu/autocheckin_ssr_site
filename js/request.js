const axios = require('axios')
const { getNowTime } = require('./tools')

const request = async (url, headers) => {
  console.log(`\n\n------${getNowTime()} - ${url}:开始签到------\n`)
  try {
    const res = await axios({
      url,
      method: 'post',
      headers,
      timeout: 10000,
    })
    if (res?.data?.ret === 0) {
      console.log(`------ ${getNowTime()} 签到成功 ------\n`)
      console.log(res.data.msg)
    } else {
      console.log(`------ ${getNowTime()} 签到失败 ------\n`)
      console.log(JSON.stringify(res))
    }
  } catch (error) {
    console.log(error?.message)
  } finally{
    return new Promise(resolve => resolve())
  }
}

module.exports = { request }
