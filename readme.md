## 关于

>  练习 nodejs 的副产品

### 技术栈

`nodejs`

### 必备

有自己的服务器, 安装`pm2`, `node`, `npm`或者`pnpm`

### 怎么用

* 把复制多份`.toml`,去掉后缀`.example`, 照着改
* 到自己的签到站点, 手动签到一次, 打开控制台, 在网络筛选`checkin`, 补全`toml`请求头参数
* 进入目录 `pm2 start app.js --name autocheckin`
* 查看日志 `pm2 logs autocheckin`
* 停止 `pm2 stop autocheckin`
* 重启 `pm2 restart autocheckin`
* 删除 `pm2 delete autocheckin`

### 哪些站点能用?

测试过 `ikkun` 和 `v2free`, 类似站点大同小异, 最多就请求头参数不同

### cookie过期怎么办

`ikkun`和`v2free`测试过能自动登录并更新配置文件, 其他站点不清楚

有其他站点, 建议自己稍微改造下

### 如果有bug

应该有, 建议自己修