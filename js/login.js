const axios = require('axios')
const qs = require('qs')
const cookie = require('cookie')
const fs = require('node:fs/promises')
const path = require('node:path')
const toml = require('@iarna/toml')

// 登录成功后, 更新config文件, 同时返回新的config对象
const login = async oldConfig => {
  console.log('登录过期, 重新登录中...')
  const { loginUrl, email, password } = oldConfig
  const data = qs.stringify({ email, passwd: password, remember_me: 'on' })
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'sec-ch-ua': oldConfig.headers['sec-ch-ua'],
    'sec-ch-ua-platform': oldConfig.headers['sec-ch-ua-platform'],
    'User-Agent': oldConfig.headers['User-Agent'],
  }
  let res
  res = await axios({
    url: loginUrl,
    method: 'post',
    headers,
    data,
    maxRedirects: 0,
    timeout: 10000,
  })
  // console.log('res', res)
  if (res.status == 200) {
    // console.log('res.data.msg', res.data.msg)
    let cookieObj = {}
    const setCookie = res.headers['set-cookie'] // array
    setCookie.forEach(item => {
      cookieObj = Object.assign(cookieObj, cookie.parse(item))
    })
    const cookieStr = qs.stringify(
      cookieObj,
      { delimiter: '; ' }
    )
    const newConfig = JSON.parse(JSON.stringify(oldConfig))
    newConfig.headers.Cookie = cookieStr
    newConfig['expire_in'] = cookieObj['expire_in']
    // 如果 headers里还有expire_in, 也要更新
    if (newConfig.headers.expire_in) {
      newConfig.headers['expire_in'] = cookieObj['expire_in']
    }
    // console.log('newConfig', newConfig)
    updateConfig(newConfig) // 异步更新
    return newConfig
  }
}

// 更新config文件
const updateConfig = async newConfig => {
  const filePath = path.resolve(
    __dirname,
    '../config',
    newConfig.fileName + (newConfig.fileName.endsWith('.toml') ? '' : '.toml')
  )
  console.log('filePath', filePath)
  await fs.writeFile(filePath, toml.stringify(newConfig), 'utf8')
  console.log(`更新 ${newConfig.fileName} 文件成功`)
}

module.exports = { login }
