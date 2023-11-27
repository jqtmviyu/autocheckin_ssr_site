const { logger } = require('./logger')

// const checkinHeaders = {
//   ...headers,
//   authority: url.split('//')[1],
//   Accept: '*/*',
//   'Accept-Encoding': 'gzip, deflate, br',
//   Connection: 'keep-alive',
//   Cookie: cookieStr,
//   Origin: url,
//   Referer: url + '/user',
//   'Sec-Fetch-Dest': 'empty',
//   'Sec-Fetch-Mode': 'cors',
//   'Sec-Fetch-Site': 'same-origin',
// }

const checkin = ({ url, agent }) => {
  return new Promise((resolve, reject) => {
    logger.info('开始签到')
    const checkinHeaders = agent.post(url + '/user/checkin').end((err, res) => {
      if (err) {
        console.log('Failed to send POST request', err)
        reject(new Error('Failed to send POST request'))
      } else {
        if (res.status === 200) {
          const text = JSON.parse(res.text)
          logger.info(text.msg)
          resolve(text.msg)
        }
      }
    })
  })
}

module.exports = { checkin }
