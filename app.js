const express = require('express')
const router = require('./router')
const app = express()

// 配置解析请求：application/json
app.use(express.json())
// 配置解析请求：application/x-www-form-urlencoded
app.use(express.urlencoded())

// 中间件，打印日志
app.use((req, res, next) => {
    console.log(req.method, req.url, Date.now())
    next()
})

// 挂载路由
app.use(router)

// 挂载路由限定访问前缀
// app.use('/abc', router)

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000/')
})