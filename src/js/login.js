const { logger } = require('./logger')
const headers = require('../../config/headers')

// 登录
const login = ({ url, email, password, agent }) => {
  return new Promise((resolve, reject) => {
    const domin = url.split('//')[1]
    logger.info(`正在登录${domin}账号: ${email}`)
    const loginHeaders = { ...headers, Referer: url + '/auth/login' }
    agent
      .post(`${url}/auth/login`)
      .set(loginHeaders)
      .send({ email, passwd: password })
      .end((err, res) => {
        if (err) {
          logger.error('Failed to send POST request', err)
          reject(new Error('Failed to send POST request'))
        } else {
          if (res.status === 200) {
            const text = JSON.parse(res.text)
            console.log('text', text)
            logger.info(text.msg)
            resolve(!!text.ret)
          }
        }
      })
  })
}

module.exports = { login }
