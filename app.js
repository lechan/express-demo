const express = require('express')
const router = require('./router')
const morgan = require('morgan')
const app = express()

// 配置解析请求：application/json
app.use(express.json())
// 配置解析请求：application/x-www-form-urlencoded
app.use(express.urlencoded())

// 中间件morgan，打印日志
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
// app.use((req, res, next) => {
//     console.log(req.method, req.url, Date.now())
//     next()
// })

// 挂载路由
app.use(router)

// 挂载路由限定访问前缀
// app.use('/abc', router)

// 在所有中间件之后处理404，顺序很重要
app.use((req, res, next) => {
    res.status(404).json({
        code: 404,
        msg: '404 not found'
    })
})

app.listen(3300, () => {
    console.log('Server is running at http://localhost:3300/')
})