const fs = require('node:fs/promises')
const path = require('node:path')
const TOML = require('@iarna/toml')

const getNowTime = () => {
  return new Date()['toLocaleDateString']()
}

// 监听文件变化

// 遍历配置文件目录下有多少个配置文件, 返回数组
const configPaths = async () => {
  try {
    let list = []
    const files = await fs.readdir(path.resolve(__dirname, '../config'))
    files.forEach(file => {
      if (file.endsWith('.toml')) {
        list.push(path.join(__dirname, '../config', file))
      }
    })
    return list
  } catch (error) {
    console.log('遍历配置文件失败:\n', error)
  }
}

// 异步读取toml文件并返回对象
const getConfig = async path => {
  try {
    const tomlData = await fs.readFile(path, 'utf8')
    const parsedData = TOML.parse(tomlData)
    return parsedData
  } catch (err) {
    console.log('读取toml失败:\n', err)
  }
}

// 判断是否登录过期
const isExpire = config => {
  const now = Math.floor(Date.now() / 1000)
  if (+config.expire_in < now) {
    return true
  } else {
    return false
  }
}

module.exports= {isExpire, configPaths, getConfig, getNowTime}
