const { logger } = require('./logger')
const superagent = require('superagent')
const { wecomBot } = require('../../config/notify')

const pushWecomBot = (title, desp) => {
  if (!(wecomBot.key && wecomBot.telphone)) {
    return
  }
  const data = {
    msgtype: 'text',
    text: {
      content: title + '\n\n' + desp,
      mentioned_mobile_list: [wecomBot.telphone],
    },
  }
  superagent
    .post(`https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${wecomBot.key}`)
    .send(data)
    .end((err, res) => {
      if (err) {
        logger.error(`wecomBot推送失败:${JSON.stringify(err)}`)
        return
      }
      const json = JSON.parse(res.text)
      if (json.errcode) {
        logger.error(`wecomBot推送失败:${JSON.stringify(json)}`)
      } else {
        logger.info('wecomBot推送成功')
      }
    })
}

module.exports = { pushWecomBot }
