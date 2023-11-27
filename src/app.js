const accounts = require('../config/accounts')
const { login } = require('./js/login')
const { checkin } = require('./js/checkin')
const { logger } = require('./js/logger')
const { pushWecomBot } = require('./js/notify')

const superagent = require('superagent')


const main = async () => {
    for (let index = 0; index < accounts.length; index++) {
      const acount = accounts[index]
      const {url, email, password } = acount
      if (url && email && password){
        try {
          const agent = superagent.agent()
          const res = await login({url, email, password, agent})
          if(res){
            const result = await checkin({url, agent})
            pushWecomBot('ssr签到', result)
          }
        } catch (error) {
          logger.error(error.msg)
        }
      }
    }
}

main()

// 随机10分钟
// setTimeout(() => {
//   main()
// }, Math.random() * 10 * 60 * 1000)
