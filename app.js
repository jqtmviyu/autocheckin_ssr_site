const schedule = require('node-schedule')
const { request } = require('./js/request')
const { getNowTime, configPaths, getConfig, isExpire } = require('./js/tools')
const { login } = require('./js/login')

const checkin = async () => {
  // 遍历配置文件
  const paths = await configPaths()
  for (const path of paths) {
    // 读取配置文件, 并转成对象
    const config = await getConfig(path)
    // 判断是否过期
    if (isExpire(config)) {
      const newCnfig = await login(config)
      await request(newCnfig.checkinUrl, newCnfig.headers)
    } else {
      await request(config.checkinUrl, config.headers)
    }
  }
  console.log('全部签到完成!')
}

const main = () => {
  // 定时任务
  schedule.scheduleJob('0 0 7 * * *', () => {
    // 随机10分钟
    setTimeout(() => {
      checkin()
    }, Math.random() * 10 * 60 * 1000)
  })
  // .invoke()
}

console.log(`开始执行任务-${getNowTime()}`)
main()
